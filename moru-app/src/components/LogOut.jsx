import { useAuth0 } from '@auth0/auth0-react'
import { MdLogout } from 'react-icons/md'
import {DeleteLocalStorage} from '../localStorage/DeleteLocalStorage';

export const LogOutButton = () => {
    const { logout } = useAuth0();

    const handleLogOut = () => {
        DeleteLocalStorage();
        logout({ returnTo: window.location.origin});
    }
    return <button className=" mt-9 flex items-center space-x-4" onClick={handleLogOut}><MdLogout className="text-4xl text-purple-moru"/><span>Cerrar sesión</span></button>
}