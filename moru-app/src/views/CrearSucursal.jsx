import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { PostLocalStorage, PostLocalStorageCommercesByOwner } from '../localStorage/PostLocalStorage';
import { GetLocalStorage } from '../localStorage/GetLocalStorage'
import { getBrandByOwner, postSucursal } from '../services/services';

const CrearSede = () => {
    const navigate = useNavigate()
    const dataUser = GetLocalStorage()

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                <div className="flex items-center justify-between">
                    <img
                        src={imagen}
                        alt="Imagen"
                        className="w-32"
                    />
                    <h1 className="text-xs ml-2 mt-4 font-roboto-slab">Creando Sede</h1>
                </div>
                <Formik
                    initialValues={{
                        alias: "",
                        address: "",//departamento-municipio
                        schedule: "",
                        phone: "",
                        commerceId: dataUser.brand.id,
                    }}

                    validate={(values) => {
                        let errors = {};

                        if (!values.alias) {
                            errors.alias = 'Por favor, ingresa un alias característico de esa sede'
                        }

                        if (!values.address) {
                            errors.address = 'Por favor, ingresa la dirección de la sede';
                        }

                        if (!values.schedule) {
                            errors.schedule = 'Por favor, ingresa el horario de atención de la sede';
                        }

                        if (!values.phone) {
                            errors.phone = 'Por favor, ingresa el teléfono de atención de la sede';
                        }

                        if (values.phone.length !== 10) {
                            errors.phone = 'El número de teléfono debe tener 10 caracteres';
                        }

                        if (values.phone.length !== 10) {
                            errors.phone = 'El número de teléfono debe tener 10 dígitos';
                        }

                        if (!/^\d+$/.test(values.phone)) {
                            errors.phone = 'El número de teléfono solo debe contener letras.';
                        }

                        return errors;
                    }}

                    onSubmit={async (values) => {
                        try {
                            console.log(values);
                            const response = await postSucursal(values);
                            console.log(response);
                            // if (response.message === 'Ya existe la sucursal con esa direccion') {
                            //     window.alert('Ya existe la sucursal con esa dirección');
                            // } else 
                            {
                                window.alert('Sucursal creada correctamente');
                                navigate('/');
                            }
                        } catch (error) {
                            console.error('Error al realizar la operación:', error);
                        }
                    }}
                >
                    {({ errors }) => (
                        <Form autoComplete="off" className="flex flex-col gap-6">
                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="alias"
                                    placeholder="Alias de esta sede"
                                />
                                <ErrorMessage name="alias" component={() => (
                                    <div className="text-xs text-red-600">{errors.alias}</div>
                                )} />
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="address"
                                    placeholder="Dirección de la Sede"
                                />
                                <ErrorMessage name="address" component={() => (
                                    <div className="text-xs text-red-600">{errors.address}</div>
                                )} />
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="schedule"
                                    placeholder="Horario de Atención"
                                />
                                <ErrorMessage name="schedule" component={() => (
                                    <div className="text-xs text-red-600">{errors.schedule}</div>
                                )} />
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="phone"
                                    placeholder="Teléfono"
                                />
                                <ErrorMessage name="phone" component={() => (
                                    <div className="text-xs text-red-600">{errors.phone}</div>
                                )} />
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

export default CrearSede;
