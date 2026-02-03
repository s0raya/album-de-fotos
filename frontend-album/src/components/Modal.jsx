import { IoMdClose } from "react-icons/io";
import '../styles/Modal.css';

function Modal({children, isOpen, closeModal}) {
    const handleBackdropClick = (e) => {
        // Cerrar el modal solo si se hace clic en el backdrop (no en el contenido)
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <article className={`modal ${isOpen && 'is-open'}`} onClick={handleBackdropClick}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><IoMdClose /></button>
            {children}
            </div>
        </article>
    )
}

export default Modal;