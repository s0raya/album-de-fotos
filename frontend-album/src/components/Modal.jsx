import { IoMdClose } from "react-icons/io";
import '../styles/Modal.css';

function Modal({children, isOpen, closeModal}) {
    return (
        <article className={`modal ${isOpen && 'is-open'}`}>
            <div className="modal-container">
            <button className="modal-close" onClick={closeModal}><IoMdClose /></button>
            {children}
            </div>
        </article>
    )
}

export default Modal;