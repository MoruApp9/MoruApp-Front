import { useState } from 'react';
import logo from "../images/logo.jpeg";
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <img className="w-64 h-32 rounded-lg bg-cover bg-center" src={logo} alt="Moru App" />

                <h1 className="font-roboto-slab text-gray-800 text-xl font-light mt-4">Iniciar Sesión</h1>
                
                <div className="mt-4">
                    <input className="w-72 md:w-96 h-10 px-2 py-1 border border-purple-800 rounded bg-white text-gray-600 text-base outline-none" type="text" placeholder="Escribe tu correo" />
                </div>

                <div className="relative mt-4">
                    <input className="w-72 md:w-96 h-10 px-2 py-1 border border-purple-800 rounded bg-white text-gray-600 text-base outline-none pr-10" type={showPassword ? 'text' : 'password'} placeholder="Escribe tu contraseña" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (<BsEyeSlash className="text-gray-600" />) : (<BsEye />)}
                    </div>
                </div>

                <div className="mt-4 md:mt-8">
                    <button className="w-48 md:w-72 h-10 px-2 border border-purple-800 rounded-lg shadow-md bg-purple-900 text-white text-xs outline-none">Empezar</button>
                </div>

                <div className="mt-2">
                    <button className="text-gray-700 text-xs font-roboto-slab">Crear cuenta</button>
                </div>
            </div>
        </div>
    )
}

export default Login