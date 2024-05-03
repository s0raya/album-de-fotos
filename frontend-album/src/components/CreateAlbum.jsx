import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../styles/CreateAlbum.css'

// Crear album

function CreateAlbum({onUploadSuccess, closeModal }) {
    const [ nameAlbum, setNameAlbum ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const params = useParams();
    const { _id: albumId } = params;
    const urlApi = import.meta.env.VITE_APP_API_URL+'/createalbum'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        const formData = new FormData();
        formData.append('name', nameAlbum)
        formData.append('parent', albumId)
        try {
            const response = await fetch(urlApi, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameAlbum,
                    parent: albumId
                })
            });
            closeModal();
            onUploadSuccess();
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
        setLoading(false);
    }
    return (
        <>
            <form className='album-form' onSubmit={handleSubmit}>
                <label>Nombre del album:</label>
                <input type="text" className='input-form' name="name" onChange={(e) => setNameAlbum(e.target.value)}/>
                <button>Crear album</button>
            </form>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default CreateAlbum;