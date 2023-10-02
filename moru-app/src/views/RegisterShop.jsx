import { useState } from "react";
import { Link } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const RegisterShop = () => {

    const {loginWithRedirect, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();

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
                        name: "",
                        rutNumber: "",
                        category: "",
                        country: "",
                        department: "",
                        municipality: "",
                        address: "",
                    }}

                    validate={(values) => {
                        let error = {};

                        if (!values.name) {
                            error.name = 'Por favor, ingresa el nombre de una tienda'
                        }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                            error.name = 'El nombre solo puede contener letras y espacios'
                        }

                        if (!values.rutNumber) {
                            error.rutNumber = 'Por favor, ingresa el RUT'
                        }else if (!/^\d+$/.test(values.rutNumber)) {
                            error.rutNumber = 'El RUT debe contener solo números'
                        }else if (values.rutNumber.length !== 9) {
                            error.rutNumber = 'El RUT debe contener 9 dígitos'
                        }

                        if (!values.category) {
                            error.category = 'Por favor, selecciona una categoría'
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

                    onSubmit={ (valores) => {
                        dispatch(setUser(valores));
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
                                    name="name"
                                    placeholder="Nombre de la tienda"
                                />
                                <ErrorMessage name="name" component={() => (
                                    <div className="text-xs text-red-600">{errors.name}</div>
                                )}/>
                            </div>
                            
                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="rutNumber"
                                    placeholder="Numero RUT"
                                />
                                <ErrorMessage name="rutNumber" component={() => (
                                    <div className="text-xs text-red-600">{errors.rutNumber}</div>
                                )}/>
                            </div>

                            <div>
                                <Field name="category" as="select" className="w-60 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab">
                                    <option value="" disabled hidden>Selecciona categoría</option>
                                    <option value="category1">Categoria 1</option>
                                    <option value="category2">Categoria 2</option>
                                    <option value="category3">Categoria 3</option>
                                </Field>
                                <ErrorMessage name="category" component={() => (
                                    <div className="text-xs text-red-600">{errors.category}</div>
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
                                        className="w-80 md:w-40 top-4 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
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