import image from '../images/image.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux';
import { postAdmincommerceRegister } from "../services/services";
import { useEffect } from 'react';

const Landing = () => {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    const currentUser = useSelector(state => state.user);

    useEffect(()=>{
        console.log({...currentUser,...user});
        postAdmincommerceRegister({...currentUser,...user});
    },[])
    return (
        <div>
            Cargando
            {/* peticion al back si existe el usuario --home --no existe cuenta
            //postAdmincommerceRegister({...valores,...user})*/}
            
        </div>
    )
}

export default Landing;
        //<div className="fixed inset-0 overflow-hidden bg-cover bg-center h-screen" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
        //     <div className="h-screen flex flex-col justify-start items-center">
        //         <div className="mt-auto flex flex-col items-center">
        //             <button
        //                 className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg ">
        //                 <Link to="/">Ingreso (solo vista)</Link>
        //             </button>
        //             <button
        //                 className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg " >
        //                 <Link to="/registeruser">Cuenta Usuario</Link>
        //             </button>
        //             <button
        //                 className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg ">
        //                 <Link to="/registershop">Cuenta Empresarial</Link>
        //             </button>
        //         </div>
        //     </div>
        // </div>