import slide1 from '../images/slide.jpeg';
import { BsFillCameraFill } from 'react-icons/bs';

const MiTienda = () => {

    //si existe una tienda que me muestre la tienda sino el formulario

    const handleOnChange = async (event) => {
        await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
        console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
    }

    return(
        <div>
            <div>{/*foto-nombre boton editar */}
                <div>{/*foto -boton agregar foto*/}
                    <div>
                        <img src={slide1} alt="Imagen de la tienda" />
                    </div>
                    
                    <div>
                        <form>
                            <label role='button' htmlFor="fileInput" className=''>
                                <input
                                    type="file"
                                    id='fileInput'
                                    name="file"
                                    style={{display: "none"}}
                                    onChange={handleOnChange}
                                />
                                <div>
                                    <div className='text-2xl'>
                                        <BsFillCameraFill/>
                                    </div>
                                    <span>Agregar foto</span>
                                </div>
                            </label>
                        </form>
                    </div>
                </div>

                <div>{/*nombre-boton editar nombre*/}

                </div>
            </div>

            <div>{/*publicaciones- informacion-productos */}

            </div>

            <div>{/*detalle de publicaciones */}

            </div>
        </div>
    )
}

export default MiTienda;