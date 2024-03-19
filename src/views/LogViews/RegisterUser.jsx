import { Link } from "react-router-dom";
import imagen from "../../images/Moru.jpeg";
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import {PostLocalStorage} from "../../localStorage/PostLocalStorage";

const RegisterUser = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                <div className="flex items-center justify-between">
                    <img
                        src={imagen}
                        alt="Imagen"
                        className="w-32" />
                    <h1 className="text-xs ml-2 mt-4 font-roboto-slab">Creando Cuenta Personal</h1>
                </div>
                <Formik
                    initialValues={{
                        userRole:'buyer',
                        nameClient: '',
                        lastname: '',
                        country: '',
                        department: '',
                        municipality: '',
                        address: ''
                    }}

                    validate={(values) => {
                        let error = {};

                        if (!values.nameClient) {
                            error.nameClient = 'Por favor, ingresa un nombre'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nameClient)) {
                            error.nameClient = 'El nombre solo puede contener letras y espacios'
                        }

                        if (!values.lastname) {
                            error.lastname = 'Por favor, ingresa un apellido'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
                            error.lastname = 'El apellido solo puede contener letras y espacios'
                        }

                        if (!values.country) {
                            error.country = 'Por favor, ingresa un país'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.country)) {
                            error.country = 'El país solo puede contener letras y espacios'
                        }

                        if (!values.department) {
                            error.department = 'Por favor, ingresa un departamento'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.department)) {
                            error.department = 'El departamento solo puede contener letras y espacios'
                        }

                        if (!values.municipality) {
                            error.municipality = 'Por favor, ingresa un municipio'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.municipality)) {
                            error.municipality = 'El municipio solo puede contener letras y espacios'
                        }

                        if (!values.address) {
                            error.address = 'Por favor, ingresa una dirección'
                        }

                        return error
                    }}

                    onSubmit={(valores) => {
                        PostLocalStorage(valores);
                        loginWithRedirect();
                    }}
                >
                    {({errors, isSubmitting}) => (
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
                                    name="nameClient"
                                    placeholder="Nombres"
                                />
                                <ErrorMessage name="nameClient" component={() => (
                                    <div className="text-xs text-red-600">{errors.nameClient}</div>
                                )}/>
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="lastname"
                                    placeholder="Apellidos"
                                />
                                <ErrorMessage name="lastname" component={() => (
                                    <div className="text-xs text-red-600">{errors.lastname}</div>
                                )}/>
                            </div>

                            <div className="flex items-center justify-between flex-col md:flex-row gap-6">
                                <div>
                                    <Field
                                        className="w-80 md:w-32 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                        type="text"
                                        name="country"
                                        placeholder="Pais"
                                    />
                                    <ErrorMessage name="country" component={() => (
                                        <div className="text-xs text-red-600">{errors.country}</div>
                                    )}/>
                                </div>
                                
                                <div>
                                    <Field
                                        className="w-80 md:w-40 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                        type="text"
                                        name="department"
                                        placeholder="Departamento"
                                    />
                                    <ErrorMessage name="department" component={() => (
                                        <div className="text-xs text-red-600">{errors.department}</div>
                                    )}/>
                                </div>
                                
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="municipality"
                                    placeholder="Municipio"
                                />
                                <ErrorMessage name="municipality" component={() => (
                                    <div className="text-xs text-red-600">{errors.municipality}</div>
                                )}/>
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="address"
                                    placeholder="Dirección"
                                />
                                <ErrorMessage name="address" component={() => (
                                    <div className="text-xs text-red-600">{errors.address}</div>
                                )}/>
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

export default RegisterUser