import { useAuth0 } from '@auth0/auth0-react'
import { MdLogout } from 'react-icons/md'
import {DeleteLocalStorage} from '../localStorage/DeleteLocalStorage';

export const LogOutButton = () => {
    const { logout } = useAuth0();

    const handleLogOut = () => {
        DeleteLocalStorage();
        logout({ returnTo: window.location.origin});
    }
    return <button className="flex items-center space-x-4 w-52 py-2" onClick={handleLogOut}><MdLogout className="w-7 text-3xl text-purple-moru"/><span>Cerrar sesión</span></button>
}