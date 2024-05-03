import { NavLink } from "react-router-dom";
import { useAuth } from '../auth/AuthContext'

function NavbarPhoto() {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout();
    }
    
    return(
        <div className="navbar">
            <NavLink to="/home">Home</NavLink>
            <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
    )
}

export default NavbarPhoto;