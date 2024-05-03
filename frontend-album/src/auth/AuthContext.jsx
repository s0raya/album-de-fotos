import { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import auth from '../config/FirebaseConfig.js'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [ currentUser, setCurrentUser ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user);
                setLoading(true);
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        });

        return unsubscribe;
    }, [])
    
    const login = async (email, password) => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log('hubo un error al iniciar sesion', error)
        }
    }

    const logout = () => {
        signOut(auth);
    }

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}