import { useState } from "react";
import { Link } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { useAuth0 } from '@auth0/auth0-react'


const RegisterUser = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const [shopData, setShopData] = useState({
        name: "",
        lastname: "",
        nitNumber: "",
        country: "",
        department: "",
        municipality: "",
        address: "",
    })

    const changeHandler = (event) => {
        const property = event.target.name;  //nombre de la propiedad que disparo el evento
        const value = event.target.value;   //valor 
        setShopData({ ...shopData, [property]: value })  //asignamos el valor a la propiedad que disparo el evento
    }

    return (
        <div className="">
            <form>
                <div className="min-h-screen flex justify-center mr-7 mt-10">
                    <div>
                        <div className="flex items-center ml-10">
                            <img
                                src={imagen}
                                alt="Imagen"
                                className="w-32" />
                            <h1 className="text-xs ml-2 mt-4 font-roboto-slab">Creando Cuenta Personal</h1>
                        </div>

                        <div className="mb-8 mt-4" >
                            <input
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                value={shopData.name}
                                name="name"
                                placeholder="Nombre"
                                onChange={changeHandler} />
                        </div>

                        <div className="mb-8 mt-4" >
                            <input
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                value={shopData.lastname}
                                name="name"
                                placeholder="Apellido"
                                onChange={changeHandler} />
                        </div>

                        <div className="mb-8">
                            <select className="relative top-4 left-5 w-60 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab">
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-8 flex items-center">
                            <input
                                className="relative top-4 left-5 w-32 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                value={shopData.country}
                                name="country"
                                placeholder="Pais"
                                onChange={changeHandler} />
                            <input
                                className="relative left-14 w-40 top-4 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                value={shopData.department}
                                name="department"
                                placeholder="Departamento"
                                onChange={changeHandler} />
                        </div>

                        <div className="mb-8">
                            <input
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                value={shopData.municipality}
                                name="municipality"
                                placeholder="Municipio"
                                onChange={changeHandler} />
                        </div>

                        <div className="mb-8 mt-4" >
                            <input
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                value={shopData.address}
                                name="address"
                                placeholder="Dirección"
                                onChange={changeHandler} />
                        </div>

                        <div>
                            <button
                                className="relative top-5 left-7 w-36 h-14 px-2 border-2 border-purple-moru rounded-lg bg-gray-200 text-xs font-roboto-slab">
                                <Link to="/registration">Atras</Link>
                            </button>
                            <button
                                className="relative top-5 left-14 w-36 h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-xs font-roboto-slab">
                                <button onClick={() => loginWithRedirect()}>Siguiente</button>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser