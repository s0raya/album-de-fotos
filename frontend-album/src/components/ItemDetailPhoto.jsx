import { useState, useEffect } from 'react';
import NavbarPhoto from './NavbarPhoto.jsx';
import i18n from '../i18n.js'
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import '../styles/ItemDetailPhoto.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosCloudDownload } from "react-icons/io";
import { getStorage, getDownloadURL, ref} from 'firebase/storage'

function ItemDetailPhoto() {
    const location = useLocation();
    const { _id, name, path, date, weather} = location.state;
    const { temp, description, icon } = weather;
    const [ newDate, setNewDate ] = useState('');
    const urlApi = import.meta.env.VITE_APP_API_URL+'/home'
    const navigate = useNavigate();

    const handleDate = () => {
        const dateFormatted = moment(date).format('DD-MM-YYYY HH:mm');
        setNewDate(dateFormatted);
    }

    const handleClick = async () => {
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

    useEffect(() => {
        handleDate();
    }, [])

    const downloadImage = async (e, imagePath, name) => {
        e.preventDefault();
        const storage = getStorage();
        getDownloadURL(ref(storage, imagePath))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.click();
            };
            xhr.open('GET', url);
            xhr.send();
        })
        .catch((error) => {
            console.log(error)
            alert('Error al descargar la foto')
        })
    }

    return (
        <>
        <NavbarPhoto />
        <div>
            <h3>{name}</h3>
            <div className="container_photo">
                <section>
                    <img src={path} alt={name} />
                </section>
                <section>
                    <p>{newDate}</p>
                    <p>Temperatura: {temp}</p>
                    <WeatherDescription description={description} />
                    <img src={`https://cdn.weatherbit.io/static/img/icons/${icon}.png`} />
                </section>
            </div>
            <div>
                <span onClick={handleClick} className='btn-delete'><RiDeleteBin5Line /></span>
                <a href='#' onClick={(e) => downloadImage(e, path, name)} download className='btn-download'><IoIosCloudDownload /></a>
            </div>
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