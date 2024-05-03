import { useState } from 'react';
import '../styles/UploadFile.css'
import { useParams } from 'react-router-dom';


function UploadFile({onUploadSuccess, closeModal }) {
    const [selectedFiles, setSelectedFiles ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const params = useParams();
    const { _id: albumId } = params;
    const urlApi = albumId ? `${import.meta.env.VITE_APP_API_URL}/home/album/${albumId}` : `${import.meta.env.VITE_APP_API_URL}/home`;

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        const formData = new FormData();
        for(const file of selectedFiles) {
            formData.append('photos', file);
        }
        try {
            const response = await fetch(urlApi, {
                method:'POST',
                body: formData
            });
            closeModal();
            onUploadSuccess();
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='form-uploadPhoto'>
                <label>Selecciona archivos</label>
                <input type="file" name="photos" onChange={handleFileChange} multiple />
                <button type="submit">Subir archivos</button>
            </form>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
        </>
    )
}

export default UploadFile;