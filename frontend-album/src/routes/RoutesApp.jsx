import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Login from '../components/Login'
import Home from '../components/Home'
import Auth from '../components/Auth'
import UploadFile from '../components/UploadFile'
import CreateAlbum from '../components/CreateAlbum'
import ItemDetailPhoto from '../components/ItemDetailPhoto'
import ItemDetailAlbum from '../components/ItemDetailAlbum'


export default function RoutesApp() {
    const { currentUser } = useAuth();

    return (
        <Router>
            <Routes>
                {currentUser ? (
                    <>
                        <Route path='/' element={<Navigate to="/home" />} />
                        <Route path='/login' element={<Navigate to="/home" />} />
                    </>
                ) : (
                    <Route path='/' element={<Navigate to="/login" />} />
                )}
                <Route path='/login' element={<Login />} />
                <Route 
                        path='/home' 
                        element={
                            <Auth>
                                <Home />
                            </Auth>
                        } />
                    <Route 
                        path='/home/:_id'
                        element= {
                            <Auth>
                                <ItemDetailPhoto />
                            </Auth>
                        }
                    />
                    <Route 
                        path='/home/album/:_id'
                        element= {
                            <Auth>
                                <ItemDetailAlbum />
                            </Auth>
                        }
                    />
                <Route path="*" element= {<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    )
}