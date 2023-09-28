import { useAuth0 } from '@auth0/auth0-react'
import { BiLogOutCircle } from 'react-icons/bi'

export const LogOutButton = () => {
    const { logout } = useAuth0();

    return <button className=" mt-9 flex items-center space-x-4" onClick={() => logout({ returnTo: window.location.origin})}><BiLogOutCircle className="text-4xl text-purple-moru"/><span>Cerrar sesión</span></button>
}