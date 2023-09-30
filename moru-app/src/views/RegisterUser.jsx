import { useState } from "react";
import { Link } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage, Field } from 'formik';


const RegisterUser = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const [ submittedForm, setSubmittedForm ] = useState (false);

    return (
        <div className="">
            <div className="flex items-center ml-10">
                <img
                    src={imagen}
                    alt="Imagen"
                    className="w-32" />
                <h1 className="text-xs ml-2 mt-4 font-roboto-slab">Creando Cuenta Personal</h1>
            </div>
            <Formik
                initialValues={{
                    name: '',
                    lastname: '',
                    country: '',
                    department: '',
                    municipality: '',
                    address: ''
                }}

                validate={(values) => {
                    let errors = {};

                    if (!values.name) {
                        errors.name = 'Por favor ingresa un nombre'
                    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                        errors.name = 'El nombre solo puede contener letras y espacios'
                    }

                    if (!values.lastname) {
                        errors.lastname = 'Por favor ingresa un apellido'
                    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
                        errors.lastname = 'El apellido solo puede contener letras y espacios'
                    }

                    if (!values.country) {
                        errors.country = 'Por favor ingresa un país'
                    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.country)) {
                        errors.country = 'El país solo puede contener letras y espacios'
                    }

                    if (!values.department) {
                        errors.department = 'Por favor ingresa un departamento'
                    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.department)) {
                        errors.department = 'El departamento solo puede contener letras y espacios'
                    }

                    if (!values.municipality) {
                        errors.municipality = 'Por favor ingresa un municipio'
                    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.municipality)) {
                        errors.municipality = 'El municipio solo puede contener letras y espacios'
                    }

                    if (!values.address) {
                        errors.address = 'Por favor ingresa una dirección'
                    }
                }}

                onSubmit={({resetForm}) => {
                    resetForm();
                    setSubmittedForm(true);
                }}
            >
                {({errors}) => (
                    <Form >
                        <div className="mb-8 mt-4" >
                            <label htmlFor="name">Nombre</label>
                            <Field
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                name="name"
                            />
                            <ErrorMessage name="name" component={() => (
                                <div>{errors.name}</div>
                            )}/>
                        </div>

                        <div className="mb-8 mt-4" >
                            <label htmlFor="lastname">Apellido</label>
                            <Field
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                name="lastname"
                            />
                            <ErrorMessage name="lastname" component={() => (
                                <div>{errors.lastname}</div>
                            )}/>
                        </div>

                        <div className="mb-8 flex items-center">
                            <label htmlFor="contry">País</label>
                            <Field
                                className="relative top-4 left-5 w-32 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                name="country"
                                placeholder="Pais"
                            />
                            <ErrorMessage name="country" component={() => (
                                <div>{errors.country}</div>
                            )}/>
                            <label htmlFor="department">Departamento</label>
                            <Field
                                className="relative left-14 w-40 top-4 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                name="department"
                                placeholder="Departamento"
                            />
                            <ErrorMessage name="department" component={() => (
                                <div>{errors.department}</div>
                            )}/>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="municipality">Municipio</label>
                            <Field
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                name="municipality"
                                placeholder="Municipio"
                            />
                            <ErrorMessage name="municipality" component={() => (
                                <div>{errors.municipality}</div>
                            )}/>
                        </div>

                        <div className="mb-8 mt-4" >
                            <label htmlFor="address">Dirección</label>
                            <Field
                                className="relative top-4 left-5 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-xs font-roboto-slab"
                                type="text"
                                name="address"
                                placeholder="Dirección"
                            />
                            <ErrorMessage name="address" component={() => (
                                <div>{errors.address}</div>
                            )}/>
                        </div>

                        <div>
                            <button
                                className="relative top-5 left-7 w-36 h-14 px-2 border-2 border-purple-moru rounded-lg bg-gray-200 text-xs font-roboto-slab">
                                <Link to="/registration">Atras</Link>
                            </button>
                            <button
                                className="relative top-5 left-14 w-36 h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-xs font-roboto-slab">
                                <button type="submit">Siguiente</button>
                            </button>
                        </div>
                    </Form>
                )}
                
            </Formik>
            
        </div>
    )
}

export default RegisterUser