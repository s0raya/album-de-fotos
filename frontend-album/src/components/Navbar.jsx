import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";
import useModal from '../hooks/useModal.js'
import Modal from './Modal'
import UploadFile from "./UploadFile";
import CreateAlbum from "./CreateAlbum";
import Select from 'react-select'
import '../styles/Navbar.css'

const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 0 2px #007bff' : 'none',
      '&:hover': {
        border: '1px solid #007bff'
      }
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'grey',
      }
    }),
  };

const options = [
  { value: `uploadfile`, label: 'Subir foto'},
  { value: `createalbum`, label: 'Crear album'}
]

function Navbar({ onUploadSuccess }) {
  const [ isOpenModalUpload, openModalUpload, closeModalUpload ] = useModal(false);
  const [ isOpenModalCreate, openModalCreate, closeModalCreate ] = useModal(false);

  const { logout } = useAuth();
  
  const handleChange = (selectedOption) => {
    const { value } = selectedOption;
    if(value === 'uploadfile') {
      openModalUpload();
    } else if (value === 'createalbum') {
      openModalCreate();
    }
  }

  const handleLogout = async () => {
      await logout();
  }

  return(
      <div className="navbar">
          <NavLink to="/home">Home</NavLink>
          <Select 
              options={options}
              onChange={handleChange}
              placeholder="Upload"
              styles={customStyles}
          />
          <button onClick={handleLogout}>Cerrar sesion</button>
          <Modal isOpen={isOpenModalUpload} closeModal={closeModalUpload}>
            <UploadFile onUploadSuccess={onUploadSuccess} closeModal={closeModalUpload} />
          </Modal>
          <Modal isOpen={isOpenModalCreate} closeModal={closeModalCreate}> 
            <CreateAlbum onUploadSuccess={onUploadSuccess} closeModal={closeModalCreate}/>
          </Modal>
      </div>
  )
}

export default Navbar