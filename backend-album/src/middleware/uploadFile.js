const {ref, getDownloadURL, uploadBytes} = require('firebase/storage');
const {storage} = require('../config/firebase.js')


async function uploadFile(fileBuffer, file, isCompressed = false) {
    try {
        
        // Sube el archivo procesado a Firebase Storage
        const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`)
        const fileMetaData = {
            contentType: file.mimetype
        };

        const fileUploadPromise = uploadBytes(
            fileRef,
            fileBuffer,
            fileMetaData
        );

        await fileUploadPromise;
        const fileDownloadURL = await getDownloadURL(fileRef)
        return { 
            downloadURL: fileDownloadURL,
            isCompressed: isCompressed
        }

    } catch (error) {
        console.error('Error al procesar y cargar el archivo:', error);
    }
}

module.exports = uploadFile;