import backgroundDefault from '../images/background-perfil-shop.jpeg';
import { BsFillCameraFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import slide1 from '../images/slide.jpeg';
import { HiPencil } from "react-icons/hi";
import { GetLocalStorage, GetLocalStorageCommercesByOwner } from '../localStorage/GetLocalStorage';
import { useEffect, useState } from "react";
import { getCommercesByOwner } from '../services/services';

const MiTienda = () => {

    const handleOnChange = async (event) => {
        await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
        console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
    }

    const [loadingData, setLoadingData] = useState(true);

    const image = backgroundDefault;

    if (loadingData) {
        return <h1>Cargando...</h1>;
    }

    useEffect(() => {
        //getCommercesByOwner(id);
        //const {id} = GetLocalStorage();
        const {id} = GetLocalStorageCommercesByOwner();
        if (id) {
            setLoadingData(false);
        }
    },[])

    return(
        <div className='grid gap-4 max-w-7xl mx-auto'>
            <div className=''>
                <div className='relative'>
                    <div className='aspect-w-16 xl:h-100'>
                        <img src={image} className='object-cover w-full h-full rounded-b-xl'/>
                    </div>
                    
                    <div className='inline-flex border-2 bg-black bg-opacity-50 rounded-md absolute bottom-0 right-0 mb-4 mr-7'>
                        <form className=''>
                            <div className=''>
                                <label role='button' htmlFor="fileInput" >
                                    <input
                                        type="file"
                                        id='fileInput'
                                        name="file"
                                        style={{display: "none"}}
                                        onChange={handleOnChange}
                                    />
                                    <div className='inline-flex pt-1'>
                                        <div className='text-2xl pl-2 pr-2 md:pr-0 text-white'>
                                            <BsFillCameraFill/>
                                        </div>
                                        <span className='md:inline-flex px-2 hidden text-white'>Agregar foto</span>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl pt-4 px-8'>{/*nombre-boton editar nombre*/}
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-roboto-slab'>Nombre de la tienda</h1>
                    </div>

                    <div className='flex justify-end '>
                        <button className='inline-flex rounded-md border-2 bg-slate-200 p-1'>
                            <HiPencil className='text-2xl'/>
                            <span>Editar nombre</span>
                        </button>
                    </div>
                </div>
            </div>

            <div>{/*publicaciones- informacion-productos*/}
                <h1>barra de opciones</h1>
            </div>

            <div>{/*detalle de publicaciones*/}
                <h1>Publicaciones</h1>
            </div>
        </div> 
    )
}

export default MiTienda;