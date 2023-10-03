import image from '../images/image.png';
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux';
import { postAdmincommerceRegister, postClientRegister } from "../services/services";
import GetLocalStorage from '../localStorage/GetLocalStorage';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    //const currentUser = useSelector(state => state.user);
    const dataComplete = {...GetLocalStorage(), ...user};
    const navigate = useNavigate();
    
    if (Object.keys(GetLocalStorage()).length > 0) {
        if (dataComplete.userRole && dataComplete.email) {
            if (dataComplete.useRole === "buyer") {
                postClientRegister(dataComplete);
            }else{
                postAdmincommerceRegister(dataComplete);
            }
            
            //navigate("/support");
        }
    }else {
        //getUser();
        if (Object.keys(GetLocalStorage()).length > 0) {
            //navigate("/");
        }else{
            //navigate("/tienda");
        }
        //peticion de verificacion si existe el usuario o no---->acceso
        //localStorage ---home  ---no existe

    }

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