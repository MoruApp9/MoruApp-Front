import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import GetLocalStorage from '../localStorage/GetLocalStorage';
import { useSelector } from 'react-redux';
import { postCommerceRegister } from "../services/services";
import { useEffect } from "react";

const RegisterTypeOfShop = () => {
    const dataUser = GetLocalStorage();
    const categories = useSelector((state) => state.categories.categorias);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl ml-2 mt-4 font-roboto-slab">Creación de una tienda</h1>
                </div>
                <Formik
                    initialValues={{
                        admincommerceId: dataUser.id,
                        name: '',
                        rut: '',
                        phone: '',
                        generalcategoryId: '',
                        schedule: '',
                        address: '',
                    }}

                    validate={(values) => {
                        let error = {};

                        if (!values.name) {
                            error.name = 'Por favor, ingresa un nombre'
                        }

                        if (!values.rut) {
                            error.rut = 'Por favor, ingresa un número de RUT'
                        }else if (!/^\d+(?:-\d+)?$/.test(values.rut)) {
                            error.rut = 'El celular debe contener solo números y "-"'
                        }else if (values.rut.length !== 10) {
                            error.rut = 'El RUT debe contener 9 dígitos, el último separado por un "-"'
                        }

                        if (!values.phone) {
                            error.phone = 'Por favor, ingresa un número de celular'
                        }else if (!/^\d+$/.test(values.phone)) {
                            error.phone = 'El celular debe contener solo números'
                        }else if (values.phone.length !== 10) {
                            error.phone = 'El celular debe contener 10 dígitos'
                        }

                        if (!values.generalcategoryId) {
                            error.generalcategoryId = 'Por favor, seleccione una categoría'
                        }

                        if (!values.schedule) {
                            error.schedule = 'Por favor, ingresa un horario'
                        }

                        if (!values.address) {
                            error.address = 'Por favor, ingresa una dirección'
                        }

                        return error
                    }}

                    onSubmit={(valores) => {
                        postCommerceRegister(valores);
                        //obtener tiendas
                        navigate('/tienda');
                    }}
                >
                    {({errors, isSubmitting}) => (
                        <Form  autoComplete="off" className="flex flex-col gap-6">
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
                                    name="rut"
                                    placeholder="RUT ejm. 12345678-9"
                                />
                                <ErrorMessage name="rut" component={() => (
                                    <div className="text-xs text-red-600">{errors.rut}</div>
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

                            <div>
                                <Field name="generalcategoryId" as="select" className="w-60 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab">
                                    <option value="" disabled hidden>Selecciona categoría</option>
                                    {categories.map((category)=>(<option key={category.id} value={category.id}>{category.name}</option>))}
                                </Field>
                                <ErrorMessage name="generalcategoryId" component={() => (
                                    <div className="text-xs text-red-600">{errors.generalcategoryId}</div>
                                )}/>
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    type="text"
                                    name="schedule"
                                    placeholder="Horario ejm. 10am - 18pm"
                                />
                                <ErrorMessage name="schedule" component={() => (
                                    <div className="text-xs text-red-600">{errors.schedule}</div>
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

export default RegisterTypeOfShop