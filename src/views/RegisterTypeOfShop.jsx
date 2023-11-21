import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { GetLocalStorage } from '../localStorage/GetLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, postCommerceRegister, uploadImageClaudinary } from "../services/services";
import { useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs"
import { PostLocalStorage } from "../localStorage/PostLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';

const RegisterTypeOfShop = () => {
    //const { user, isAuthenticated } = useAuth0();
    //const dataUser = { ...GetLocalStorage(), ...user };
    const dataUser = GetLocalStorage();
    const categories = useSelector((state) => state.categories.categorias);
    const navigate = useNavigate();
    //const dispatch = useDispatch();
    const [estadoSubmit, setEstadoSubmit] = useState(false)

    // useEffect(() => {
    //     const obtengoUsuario = async () => {
    //         try {
    //             await getUser(dataUser.email)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     obtengoUsuario()
    // }, [])

    /*     useEffect(() => {
            if (estadoSubmit) {
                PostLocalStorage(dispatch(getUser(dataUser.email)))
                console.log(GetLocalStorage());
                setEstadoSubmit(false)
            }
        }, [estadoSubmit]) */


    const handleOnChange = async (event) => {
        await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl ml-2 mt-4 font-roboto-slab">Creación de una marca</h1>
                </div>
                <Formik
                    initialValues={{
                        admincommerceId: dataUser.id,
                        name: '',
                        rut: '',
                        description: "",
                        image: '',
                        generalcategoryId: '',
                    }}

                    validate={(values) => {
                        let error = {};

                        if (!values.name) {
                            error.name = 'Por favor, ingresa un nombre'
                        }

                        if (!values.rut) {
                            error.rut = 'Por favor, ingresa un número de RUT'
                        } else if (values.rut.length === 10 && !/^\d{8}-\d$/.test(values.rut)) {
                            error.rut = 'El RUT debe contener 9 dígitos, el último separado por un "-"'
                        } else if (!/^[0-9-]+$/.test(values.rut)) {
                            error.rut = 'El RUT debe contener solo dígitos y/o guiones';
                        } else if (values.rut.length > 10 || values.rut.length < 10) {
                            error.rut = 'El RUT debe tener 10 caracteres';
                        }

                        if (!values.description) {
                            error.description = 'Por favor, ingresa una descripción'
                        } else if (values.description.length > 300) {
                            error.description = 'La descripción no debe superar los 300 carácteres'
                        }

                        if (!values.generalcategoryId) {
                            error.generalcategoryId = 'Por favor, seleccione una categoría'
                        }
                        return error
                    }}

                    onSubmit={async (valores) => {
                        try {
                            await postCommerceRegister(valores);
                            Swal.fire('Éxito', 'Petición creada correctamente, en breve será aceptada', 'success');
                            navigate('/');
                        } catch (error) {
                            Swal.fire('Oops...', 'Error al registrar el comercio', 'error');
                        }
                    }}
                >
                    {({ errors, isSubmitting }) => (
                        <Form autoComplete="off" className="flex flex-col gap-6">
                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="name"
                                    placeholder="Nombre de la marca"
                                />
                                <ErrorMessage name="name" component={() => (
                                    <div className="text-xs text-red-600">{errors.name}</div>
                                )} />
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="rut"
                                    placeholder="RUT ejm. 12345678-9"
                                />
                                <ErrorMessage name="rut" component={() => (
                                    <div className="text-xs text-red-600">{errors.rut}</div>
                                )} />
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="description"
                                    placeholder="Descripción de tu marca"
                                />
                                <ErrorMessage name="description" component={() => (
                                    <div className="text-xs text-red-600">{errors.description}</div>
                                )} />
                            </div>

                            <div>
                                <Field
                                    type="file"
                                    name="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleOnChange}
                                />

                                <label htmlFor="fileInput" className="text-purple-moru w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-m font-roboto-slab flex items-center justify-center cursor-pointer">
                                    <span>Upload image</span>
                                    <BsImageFill className="text-xl ml-2"></BsImageFill>
                                </label>
                            </div>
                            {/* Div con el field de tipo file para agregar el pdf del Rut (Cloudinary)*/}

                            <div>
                                <Field name="generalcategoryId" as="select" className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab">
                                    <option value="" disabled hidden>Selecciona categoría</option>
                                    {categories?.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
                                </Field>
                                <ErrorMessage name="generalcategoryId" component={() => (
                                    <div className="text-xs text-red-600">{errors.generalcategoryId}</div>
                                )} />
                            </div>

                            <div className="flex justify-between flex-row gap-2 items-center">
                                <Link to="/registration">
                                    <button
                                        className="w-36 md:h-14 h-10 px-2 border-2 border-purple-moru rounded-lg bg-gray-200 text-sm font-roboto-slab">
                                        Atras
                                    </button>
                                </Link>
                                <button
                                    className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
                                    type="submit"
                                    disabled={isSubmitting}>
                                    Siguiente
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegisterTypeOfShop