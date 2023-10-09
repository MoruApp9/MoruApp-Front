import backgroundDefault from '../images/background-perfil-shop.jpeg';
import { BsFillCameraFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import slide1 from '../images/slide.jpeg';
import { HiPencil } from "react-icons/hi";
import { GetLocalStorage, GetLocalStorageCommercesByOwner } from '../localStorage/GetLocalStorage';
import { useEffect, useState } from "react";
import { getBrandByOwner } from '../services/services';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import Product from '../components/Product';
import { useAuth0 } from '@auth0/auth0-react';

const MiTienda = () => {
    const { id } = useParams();
    const sedes = GetLocalStorageCommercesByOwner()
    const sucursal = sedes.find((product) => product.id === id);
    const productsSede = useSelector((state) => state.allProducts.allProducts.filter((p) => p.commercebranchId === id)) //VA A FUNCIONAR CUANDO CREEN PROP EN EL BACK
    const { isAuthenticated } = useAuth0();
    const currentUser = GetLocalStorage();

    const handleOnChange = async (event) => {
        await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
        console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
    }

    const [loadingData, setLoadingData] = useState(true)

    const image = backgroundDefault;


    /*
    if (loadingData) {
        return <h1>Cargando...</h1>;
    }

    useEffect(() => {
        //getBrandByOwner(id);
        //const {id} = GetLocalStorage();
        const {id} = GetLocalStorageCommercesByOwner();
        if (id) {
            setLoadingData(false);
        }
    },[]) */


    return (
        <div className='grid gap-4 max-w-7xl mx-auto font-roboto-slab'>
            <div className='mx-auto w-full md:w-3/4 lg:w-1/2'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl pt-4 px-8'>
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-bold text-purple-moru'>{sucursal.alias}</h1>
                    </div>
                    {/* Agregar botón de editar nombre */}
                    {/* <div className='flex justify-end'>
            <button className='inline-flex rounded-md border-2 bg-slate-200 p-1'>
            <HiPencil className='text-2xl' />
            <span className='ml-1'>Editar nombre</span>
            </button>
        </div> */}
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl text-gray-800 mt-4'>Dirección: {sucursal.address}</h1>
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl text-gray-800'>Horario: {sucursal.schedule}</h1>
                </div>
                <div>
                    <h1 className='text-xl md:text-2xl text-gray-800'>Teléfono: {sucursal.phone}</h1>
                </div>
                {isAuthenticated && GetLocalStorage() && currentUser.userRole === 'adminCommerce' && (
                    <ul className="order-2 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 space-x-4">
                        <BiSolidCloudUpload className="w-7 text-purple-moru text-3xl" />
                        <Link
                            to={{
                                pathname: "/publicar-producto",
                                search: id,
                            }}
                        >
                            Publicar
                        </Link>
                    </ul>
                )}
            </div>

            {/* Centrar el contenido de Productos de esta sede */}
            {productsSede.length ? 
                <div className="p-6 lg:px-28 mx-auto">
                <h1 className="text-purple-moru py-4 font-bold">
                    Productos de esta sede
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {productsSede.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div> : 
            <div>
                <div className="p-6 lg:px-28 mx-auto">
                <h1 className="text-purple-moru py-4 font-bold">
                    No hay productos en esta sede
                </h1>
                </div>
            </div>
            }
        </div>
    );


}

export default MiTienda;