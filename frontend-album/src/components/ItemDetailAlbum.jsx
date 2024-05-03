import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { RiDeleteBin5Line } from "react-icons/ri";
import { useLocation, useNavigate, Link } from 'react-router-dom'

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

    return (
        <>
        <Navbar onUploadSuccess={handleUploadAlbumSuccess} />
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <div className='container-photos'>
        {photos && photos.map(photo => (
                <div key={photo._id} style={{width: 'auto'}}>
                    <Link to={`/home/${photo._id}`} state={photo}>
                            <img src={photo.cover_path} alt={photo.name}/>
                    </Link>
                </div>
            ))}
            {album && album.map(item => (
                <div key={item._id} style={{width: 'auto'}}>
                    <Link to={`/home/album/${item._id}`} state ={item}>
                        <figure>
                            <img src={item.cover_path} alt={item.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src='/no-image.webp'; }}/>
                            <figcaption>{item.name}</figcaption>
                        </figure>
                    </Link>
                </div>
            ))}
        </div>
        <div>
            <span onClick={handleClick} className='btn-delete'><RiDeleteBin5Line /></span>
        </div>
        </>
    )
}

export default ItemDetailAlbum