import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import '../styles/Home.css'

function Home() {
    const [ photos, setPhotos ] = useState(null);
    const [ album, setAlbum ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ filesUploaded, setFilesUploaded ] = useState(false);
    const urlApi = import.meta.env.VITE_APP_API_URL


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

    const handleUploadSuccess = () => {
        setFilesUploaded(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(filesUploaded) {
            fetchData();
            setFilesUploaded(false);
        }
    },[filesUploaded])

    return(
        <>
            <Navbar onUploadSuccess={handleUploadSuccess} />
            {loading && <p>Loading...</p>}
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
        </>
    )
}

export default Home;