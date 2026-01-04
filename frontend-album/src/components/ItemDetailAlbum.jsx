import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { RiDeleteBin5Line } from "react-icons/ri";
import { useLocation, useNavigate, Link } from 'react-router-dom'
import '../styles/ItemDetailAlbum.css'
import '../styles/Home.css'

function ItemDetailAlbum() {
    const location = useLocation();
    const [ photos, setPhotos ] = useState(null);
    const [ album, setAlbum ] = useState(null);
    const [ loading, setLoading] = useState();
    const [ error, setError ] = useState();
    const [ albumUploaded, setAlbumUploaded ] = useState(false);
    const { _id } = location.state
    const navigate = useNavigate();
    const urlApi = import.meta.env.VITE_APP_API_URL+`/home/album/${_id}`


    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(urlApi);
            const data = await response.json();
            setPhotos(data.photos);
            setAlbum(data.album);
            setLoading(false);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [_id])

    const handleUploadAlbumSuccess = () => {
        setAlbumUploaded(true);
    };

    useEffect(() => {
        if (albumUploaded) {
            fetchData();
            setAlbumUploaded(false);
        }
    })


    const handleClick = async () => {
        try {
            const response = await fetch((urlApi), {
                method: 'DELETE'
            })
            alert('Album eliminado')
            navigate('/home')        
        } catch (error) {
            console.log(error)
            alert('Hubo un problema al eliminar el album')
        }
    }

    // Calcular el centro y límites del mapa basado en las coordenadas de las fotos
    const getMapBounds = () => {
        if (!photos || photos.length === 0) return null;
        
        const photosWithCoords = photos.filter(p => p.lat && p.lng);
        if (photosWithCoords.length === 0) return null;
        
        const lats = photosWithCoords.map(p => p.lat);
        const lngs = photosWithCoords.map(p => p.lng);
        
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;
        
        // Añadir un poco de padding
        const latPadding = (maxLat - minLat) * 0.1 || 0.01;
        const lngPadding = (maxLng - minLng) * 0.1 || 0.01;
        
        return {
            center: { lat: centerLat, lng: centerLng },
            bounds: {
                minLat: minLat - latPadding,
                maxLat: maxLat + latPadding,
                minLng: minLng - lngPadding,
                maxLng: maxLng + lngPadding
            }
        };
    };

    const mapBounds = getMapBounds();
    
    // Generar URL de mapa con todos los marcadores
    const getMapUrl = () => {
        if (!mapBounds) return null;
        
        const photosWithCoords = photos.filter(p => p.lat && p.lng);
        if (photosWithCoords.length === 0) return null;
        
        const bbox = `${mapBounds.bounds.minLng},${mapBounds.bounds.minLat},${mapBounds.bounds.maxLng},${mapBounds.bounds.maxLat}`;
        
        // Si hay una sola foto, mostrar su marcador
        if (photosWithCoords.length === 1) {
            return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${photosWithCoords[0].lat},${photosWithCoords[0].lng}`;
        }
        
        // Para múltiples fotos, mostrar el área completa con el centro
        return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${mapBounds.center.lat},${mapBounds.center.lng}`;
    };

    return (
        <div className="album-wrapper">
        <Navbar onUploadSuccess={handleUploadAlbumSuccess} />
        <div className="album-content">
            {loading && <p className="loading-message">Cargando...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className='container-photos album-photos-container'>
        {photos && photos.length > 0 ? (
            photos.map(photo => (
                <div key={photo._id}>
                    <Link to={`/home/${photo._id}`} state={photo}>
                        <figure>
                            <img src={photo.cover_path} alt={photo.name}/>
                            <figcaption>{photo.name}</figcaption>
                        </figure>
                    </Link>
                </div>
            ))
        ) : (
            !loading && photos && photos.length === 0 && (
                <p className="empty-album-message">
                    No hay fotos subidas en este álbum
                </p>
            )
        )}
            {album && album.map(item => (
                <div key={item._id}>
                    <Link to={`/home/album/${item._id}`} state ={item}>
                        <figure>
                            <img src={item.cover_path} alt={item.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src='/no-image.webp'; }}/>
                            <figcaption>{item.name}</figcaption>
                        </figure>
                    </Link>
                </div>
            ))}
        </div>
        {mapBounds && (
            <div className="map-section">
                <h3>Ubicaciones de las fotos</h3>
                <p className="map-info">
                    {photos.filter(p => p.lat && p.lng).length} {photos.filter(p => p.lat && p.lng).length === 1 ? 'foto tiene' : 'fotos tienen'} ubicación registrada
                </p>
                <div className="map-wrapper">
                    <iframe
                        src={getMapUrl()}
                        className="map-iframe"
                        title="Mapa de ubicaciones"
                    />
                </div>
                <small>
                    <a 
                        href={`https://www.openstreetmap.org/?mlat=${mapBounds.center.lat}&mlon=${mapBounds.center.lng}&zoom=12`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        Ver mapa más grande
                    </a>
                </small>
            </div>
        )}
        <div className='footer-album'>
            <span onClick={handleClick} className='btn-delete'><RiDeleteBin5Line /></span>
        </div>
        </div>
        </div>
    )
}

export default ItemDetailAlbum