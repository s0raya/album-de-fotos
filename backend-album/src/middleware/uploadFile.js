const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFile(fileBuffer, file) {
    try {
        return new Promise((resolve, reject) => {
            // Usar file.filename que ya tiene el timestamp de multer (Date.now() + '-' + originalname)
            // No necesitamos añadir otro timestamp aquí
            const publicId = file.filename ? file.filename.replace(/\.[^/.]+$/, '') : file.originalname.replace(/\.[^/.]+$/, '');
            
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'files',
                    public_id: publicId,
                    resource_type: 'auto',
                    quality: 'auto:good'
                },
                (error, result) => {
                    if (error) {
                        console.error('Error al subir archivo:', error);
                        reject(error);
                    } else {
                        resolve({
                            downloadURL: result.secure_url
                        });
                    }
                }
            );
            
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    } catch (error) {
        console.error('Error al procesar y cargar el archivo:', error);
        throw error;
    }
}

/**
 * Genera una URL transformada de Cloudinary para la versión comprimida/redimensionada
 * @param {string} originalURL - URL original de Cloudinary
 * @param {object} options - Opciones de transformación
 * @param {number} options.height - Altura máxima (default: 200)
 * @param {string} options.fit - Modo de ajuste (default: 'contain')
 * @param {string} options.quality - Calidad (default: 'auto:low')
 * @returns {string} URL transformada
 */
function getTransformedURL(originalURL, options = {}) {
    const { height = 200, fit = 'contain', quality = 'auto:low' } = options;
    
    try {
        // Limpiar la URL: quitar parámetros de query si existen
        const cleanURL = originalURL.split('?')[0];
        
        // Extraer el path después de /upload/
        // Las URLs tienen formato: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{ext}
        // o: https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{public_id}.{ext}
        
        const uploadIndex = cleanURL.indexOf('/upload/');
        if (uploadIndex === -1) {
            console.error('URL de Cloudinary inválida (no contiene /upload/):', originalURL);
            return originalURL;
        }
        
        // Extraer la parte base (hasta /upload/)
        const baseURL = cleanURL.substring(0, uploadIndex + '/upload/'.length);
        
        // Extraer el path después de /upload/ (puede incluir versión v1234567/)
        const pathAfterUpload = cleanURL.substring(uploadIndex + '/upload/'.length);
        
        // Remover la versión si existe (v1234567/)
        const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
        
        // Para mantener aspect ratio con altura máxima, usamos solo h_200
        // Cloudinary automáticamente mantiene el aspect ratio cuando solo se especifica height
        // Alternativamente, podríamos usar c_scale, pero h_200 es más simple y eficiente
        const transformations = `h_${height},q_${quality}`;
        
        // Construir la URL transformada
        const transformedURL = `${baseURL}${transformations}/${pathWithoutVersion}`;
        
        return transformedURL;
    } catch (error) {
        console.error('Error generando URL transformada:', error);
        return originalURL;
    }
}

/**
 * Extrae el public_id de una URL de Cloudinary
 * @param {string} url - URL de Cloudinary
 * @returns {string|null} public_id o null si no se puede extraer
 */
function extractPublicId(url) {
    try {
        // Limpiar la URL: quitar parámetros de query si existen
        const cleanURL = url.split('?')[0];
        
        // Extraer el path después de /upload/
        const uploadIndex = cleanURL.indexOf('/upload/');
        if (uploadIndex === -1) {
            console.error('URL de Cloudinary inválida (no contiene /upload/):', url);
            return null;
        }
        
        // Extraer el path después de /upload/
        const pathAfterUpload = cleanURL.substring(uploadIndex + '/upload/'.length);
        
        // Remover la versión si existe (v1234567/)
        let pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
        
        // Remover transformaciones si existen (h_200,q_auto:low/ o cualquier combinación de transformaciones)
        // Las transformaciones están antes de la carpeta/public_id
        // Ejemplo: h_200,q_auto:low/files/IMG_123.jpg -> files/IMG_123.jpg
        // Patrón: cualquier cosa con comas, guiones bajos seguidos de números, o letras seguidas de guiones bajos
        if (pathWithoutVersion.match(/^[^\/]+,[^\/]+\//) || 
            pathWithoutVersion.match(/^[a-z]_[^\/]+\//) ||
            pathWithoutVersion.match(/^[a-z]_\d+,[^\/]+\//)) {
            pathWithoutVersion = pathWithoutVersion.replace(/^[^\/]+\//, '');
        }
        
        // Remover la extensión del archivo
        // El public_id debe incluir la carpeta si existe (ej: "files/1234567890-foto")
        const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, '');
        
        console.log('URL original:', url);
        console.log('Path después de /upload/:', pathAfterUpload);
        console.log('Path sin versión:', pathWithoutVersion);
        console.log('Public ID extraído:', publicId);
        
        return publicId;
    } catch (error) {
        console.error('Error extrayendo public_id:', error);
        return null;
    }
}

/**
 * Elimina una imagen de Cloudinary
 * @param {string} url - URL de Cloudinary de la imagen a eliminar
 * @returns {Promise<boolean>} true si se eliminó correctamente, false en caso contrario
 */
async function deleteFromCloudinary(url) {
    try {
        const publicId = extractPublicId(url);
        
        if (!publicId) {
            console.error('No se pudo extraer el public_id de la URL:', url);
            return false;
        }
        
        console.log('Intentando eliminar de Cloudinary con public_id:', publicId);
        
        return new Promise((resolve) => {
            cloudinary.uploader.destroy(publicId, { 
                resource_type: 'image',
                invalidate: true // Invalidar la caché de CDN
            }, (error, result) => {
                if (error) {
                    console.error('Error eliminando de Cloudinary:', error);
                    console.error('Detalles del error:', JSON.stringify(error, null, 2));
                    resolve(false);
                } else {
                    console.log('Resultado de Cloudinary destroy:', JSON.stringify(result, null, 2));
                    if (result.result === 'ok' || result.result === 'not found') {
                        // 'not found' también es aceptable (ya estaba eliminado)
                        console.log(`Imagen eliminada de Cloudinary: ${publicId}`);
                        resolve(true);
                    } else {
                        console.warn('Resultado inesperado al eliminar de Cloudinary:', result);
                        resolve(false);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error en deleteFromCloudinary:', error);
        return false;
    }
}

module.exports = { uploadFile, getTransformedURL, deleteFromCloudinary };