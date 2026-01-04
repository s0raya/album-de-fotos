import { useState, useEffect } from 'react';
import NavbarPhoto from './NavbarPhoto.jsx';
import i18n from '../i18n.js'
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import '../styles/ItemDetailPhoto.css'
import '../styles/Home.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosCloudDownload } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import useModal from '../hooks/useModal.js'
import Modal from './Modal'

function ItemDetailPhoto() {
    const location = useLocation();
    const { _id, name: initialName, path, date, weather, lat, lng} = location.state;
    const { temp: initialTemp, description, icon } = weather;
    const [name, setName] = useState(initialName || '');
    const [formattedDate, setFormattedDate] = useState('');
    const [newDateModal, setNewDateModal] = useState('');
    const [temp, setTemp] = useState(initialTemp ?? '');
    const [nameModal, setNameModal] = useState(initialName || '');
    const [tempModal, setTempModal] = useState(initialTemp ?? '');
    const [isOpenEditPhoto, openModalEdit ,closeModalEditPhoto] = useModal(false);
    const urlApi = import.meta.env.VITE_APP_API_URL+'/home'
    const navigate = useNavigate();

    const deletePhoto = async () => {
        try {
            await fetch((`${urlApi}/${_id}`), {
                method: 'DELETE'
            })
            alert('Foto eliminada')
            navigate('/home')        
        } catch (error) {
            alert('Hubo un problema al eliminar la foto')
        }
    }

    const editPhoto = () => {
        setNameModal(name);
        setTempModal(temp);
        setNewDateModal(moment(formattedDate, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm'));
        openModalEdit();
        openModalEdit();
    }

    const uploadPhotoEdited = async(e) => {
        e.preventDefault();
        try {
            await fetch((`${urlApi}/${_id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameModal,
                    date: newDateModal,
                    temp: tempModal
                })
            })
            alert('Foto actualizada');
            setName(nameModal);
            setFormattedDate(moment(newDateModal).format('DD-MM-YYYY HH:mm'));
            setTemp(tempModal);
            closeModalEditPhoto();
        } catch (error) {
            console.log(error)
            alert('Hubo un problema al actualizar la foto')
        }
    }

    useEffect(() => {
        const dateFormatted = moment(date).format('DD-MM-YYYY HH:mm');
        setFormattedDate(dateFormatted);
    }, [date]);

    const downloadImage = async (e, imagePath, name) => {
        e.preventDefault();
        try {
            // imagePath ya es una URL completa de Cloudinary
            const response = await fetch(imagePath);
            if (!response.ok) {
                throw new Error('Error al descargar la imagen');
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar la foto:', error);
            alert('Error al descargar la foto');
        }
    }

    const handleNameChange = (e) => setNameModal(e.target.value);
    const handleDateChange = (e) => setNewDateModal(e.target.value);
    const handleTempChange = (e) => {
        const value = e.target.value === '' ? '' : e.target.value;
        setTempModal(value);
    };

    return (
        <>
        <NavbarPhoto />
        <div className="photo-detail-wrapper">
            <h3>{name}</h3>
            <div className="container-photo">
                <section>
                    <img src={path} alt={name} />
                </section>
                <section>
                    <p className="photo-date">{formattedDate}</p>
                    <div className="weather-info">
                        <p>Temperatura: {temp ?? 'N/A'} {temp != null && 'ºC'}</p>
                    </div>
                    <div className="weather-description-container">
                        <WeatherDescription description={description} />
                        {icon && <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={description} className="weather-icon" />}
                    </div>
                    {lat && lng && (
                        <div className="location-section">
                            <h4>Ubicación</h4>
                            <div className="map-container">
                                <iframe
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`}
                                    className="map-iframe"
                                    title="Ubicación de la foto"
                                />
                            </div>
                            <small>
                                <a 
                                    href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=14`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="map-link"
                                >
                                    Ver mapa más grande
                                </a>
                            </small>
                        </div>
                    )}
                </section>
            </div>
            <div className='options-buttons'>
                <span onClick={deletePhoto} className='btn-delete'><RiDeleteBin5Line /></span>
                <span onClick={editPhoto} className='btn-edit'><CiEdit /></span>
                <a href='#' onClick={(e) => downloadImage(e, path, name)} download className='btn-download'><IoIosCloudDownload /></a>
            </div>
            <Modal isOpen={isOpenEditPhoto} closeModal={closeModalEditPhoto}>
                <h2>Editar Foto</h2>
                <form onSubmit={uploadPhotoEdited} encType='multipart/form-data'>
                    <label>Nombre:</label>
                    <input type="text" value={nameModal} onChange={handleNameChange} />
                    <label>Fecha</label>
                    <input type="datetime-local" value={newDateModal} onChange={handleDateChange} />
                    <label>Temperatura:</label>
                    <input type="number" value={tempModal ?? ''} onChange={handleTempChange} />
                    <button type="submit">Guardar</button>
                </form>
            </Modal>
        </div>
        </>
    )
}

function WeatherDescription({description}) {
    const { t } = useTranslation();
    const translatedDescription = t(description) !== description ? t(description) : description;
    return (
        <p>{t(translatedDescription)}</p>
    )
}

export default ItemDetailPhoto;