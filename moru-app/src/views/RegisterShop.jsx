import { Link } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import PostLocalStorage from "../localStorage/PostLocalStorage";

const RegisterShop = () => {

    const {loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                <div className="flex items-center justify-between">
                    <img
                        src={imagen}
                        alt="Imagen"
                        className="w-32" />
                    <h1 className="text-xs ml-2 mt-4 font-roboto-slab">Creando Cuenta Empresarial</h1>
                </div>
                <Formik
                    initialValues={{
                        userRole:"adminCommerce",
                        nameAdminCommerce: "",
                        lastname: "",
                        phone: "",
                    }}

                    validate={(values) => {
                        let error = {};

                        if (!values.nameAdminCommerce) {
                            error.nameAdminCommerce = 'Por favor, ingresa el nombre de una tienda'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nameAdminCommerce)) {
                            error.nameAdminCommerce = 'El nombre solo puede contener letras y espacios'
                        }

                        if (!values.lastname) {
                            error.lastname = 'Por favor, ingresa un apellido'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
                            error.lastname = 'El apellido solo puede contener letras y espacios'
                        }

                        if (!values.phone) {
                            error.phone = 'Por favor, ingresa un número de celular'
                        }else if (!/^\d+$/.test(values.phone)) {
                            error.phone = 'El celular debe contener solo números'
                        }else if (values.phone.length !== 10) {
                            error.phone = 'El celular debe contener 10 dígitos'
                        }

                        return error
                    }}

                    onSubmit={ (valores) => {
                        PostLocalStorage(valores);
                        loginWithRedirect();
                    }}
                >
                    {({errors}) => (
                        <Form  autoComplete="off" className="flex flex-col gap-6">
                            <div className="hidden">
                                <Field
                                    type="text"
                                    name="userRole"
                                />
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="nameAdminCommerce"
                                    placeholder="Nombre"
                                />
                                <ErrorMessage name="nameAdminCommerce" component={() => (
                                    <div className="text-xs text-red-600">{errors.nameAdminCommerce}</div>
                                )}/>
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="lastname"
                                    placeholder="Apellido"
                                />
                                <ErrorMessage name="lastname" component={() => (
                                    <div className="text-xs text-red-600">{errors.lastname}</div>
                                )}/>
                            </div>
                            
                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="phone"
                                    placeholder="Celular"
                                />
                                <ErrorMessage name="phone" component={() => (
                                    <div className="text-xs text-red-600">{errors.phone}</div>
                                )}/>
                            </div>

                            <div className="flex sm:justify-between flex-col sm:flex-row gap-2 justify-center items-center">
                                <Link to="/registration">
                                    <button
                                        className="w-36 md:h-14 h-10 px-2 border-2 border-purple-moru rounded-lg bg-gray-200 text-sm font-roboto-slab">
                                        Atrás
                                    </button>
                                </Link>
                                <button
                                    className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
                                    type="submit">
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

export default RegisterShop