import useBreadcrumbs from "use-react-router-breadcrumbs"
import '../styles/Footer.css'
import { useAuth } from '../auth/AuthContext'
import { useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Footer() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const params = useParams();
    const [photoName, setPhotoName] = useState(null);
    const [albumName, setAlbumName] = useState(null);

    // Obtener nombres desde location.state
    useEffect(() => {
        if (location.state && location.state.name) {
            if (location.pathname.includes('/album/')) {
                setAlbumName(location.state.name);
                setPhotoName(null);
            } else if (location.pathname.match(/\/home\/[^/]+$/) && !location.pathname.includes('/album/')) {
                setPhotoName(location.state.name);
                setAlbumName(null);
            }
        } else {
            // Limpiar nombres si no hay state
            setPhotoName(null);
            setAlbumName(null);
        }
    }, [location]);

    // Función para obtener el breadcrumb de una foto
    const PhotoBreadcrumb = ({ match }) => {
        return photoName || 'Foto';
    };

    // Función para obtener el breadcrumb de un álbum
    const AlbumBreadcrumb = ({ match }) => {
        return albumName || 'Álbum';
    };

    // Define las rutas y etiquetas personalizadas para cada breadcrumb
    // IMPORTANTE: Ordenar de más específica a menos específica
    const routes = [
        { path: '/home', breadcrumb: 'Home' },
        { path: '/home/album/:_id', breadcrumb: AlbumBreadcrumb },
        { path: '/home/:_id', breadcrumb: PhotoBreadcrumb },
    ];

    // Usa el hook para generar los breadcrumbs
    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <>
            {currentUser ? (
                <div className="footer">
                    {breadcrumbs
                        .filter(({ match }) => {
                            // Si estamos en un álbum (/home/album/:_id), solo mostrar Home y el álbum
                            if (location.pathname.includes('/album/')) {
                                return match.pathname === '/home' || match.pathname.includes('/album/');
                            }
                            // Si estamos en una foto (/home/:_id), solo mostrar Home y la foto
                            if (location.pathname.match(/\/home\/[^/]+$/) && !location.pathname.includes('/album/')) {
                                return match.pathname === '/home' || (match.pathname.match(/\/home\/[^/]+$/) && !match.pathname.includes('/album/'));
                            }
                            return true;
                        })
                        .map(({ breadcrumb, match }, index, filteredBreadcrumbs) => {
                            // Condicional para que solo muestre una vez Home en el breadcrumb,
                            // ya que react por defecto se renderiza dos veces por el Strictmode.
                            if(index > 0 && breadcrumb.key === '/home') return null;

                            // Si breadcrumb es una función, ejecutarla
                            const breadcrumbText = typeof breadcrumb === 'function' 
                                ? breadcrumb({ match }) 
                                : breadcrumb;

                            return (
                                <span key={match.pathname}>
                                    <a href={match.pathname}>{breadcrumbText}</a>
                                    {index < filteredBreadcrumbs.length - 1 && ' -> '}
                                </span>
                            );
                        })}
                </div>
            ) : ('')
            }

        </>
    )
}