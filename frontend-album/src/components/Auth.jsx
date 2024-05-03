import { useAuth } from "../auth/AuthContext";
import { Navigate } from 'react-router-dom'

function Auth({children}) {
    const { currentUser, loading } = useAuth();
    if(!currentUser) return <Navigate to='/login' />
    if(loading) return <p>Loading...</p>

    return (
        <>
        {children}
        </>
    )
}

export default Auth;