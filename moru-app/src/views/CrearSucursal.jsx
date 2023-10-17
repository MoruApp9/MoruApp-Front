import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { GetLocalStorage } from '../localStorage/GetLocalStorage'
import { postSucursal, putSucursal } from '../services/services';
import Swal from 'sweetalert2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';

const CrearSede = () => {
    const navigate = useNavigate()
    const dataUser = GetLocalStorage()
    const dataDepartment = ['Choco', 'Antioquia'];
    const dataMunicipality = {Choco: ['Arcadi', 'Riosucio', 'Unguia'],
    Antioquia: ['Apartado', 'Carepa', 'Chigorodo', 'Mutata', 'Necocli', 'San juan de Uraba', 'Turbo']};
    const [location, setLocation] = useState(null);
    const [dataSucursal, setDataSucursal] = useState(null);

    useEffect(() => {
        dataSucursal && setLocation(dataSucursal.coords);
        if (dataSucursal && dataSucursal.message) {
            Swal.fire('Oops...', dataSucursal.message, 'error');
        }
    }, [dataSucursal]);

    const handleMarkerDragend = (e) => {
        const marker = e.target;
        const position = marker.getLatLng(); 
        setLocation([position.lat, position.lng]);
    };

    const handleUpdata = async(e) => {
        e.preventDefault();
        await putSucursal({branchId: dataSucursal.branchId, coords: location});
        navigate('/');
    }

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
                        schedule: "",
                        phone: "",
                        commerceId: dataUser.brand.id,
                        country: 'colombia',
                        department: '',
                        municipality: '',
                        address: "",
                    }}

                    validate={(values) => {
                        let errors = {};

                        if (!values.alias) {
                            errors.alias = 'Por favor, ingresa un alias característico de esa sede'
                        }

                        if (!values.schedule) {
                            errors.schedule = 'Por favor, ingresa el horario de atención de la sede';
                        }

                        if (!values.phone) {
                            errors.phone = 'Por favor, ingresa el teléfono de atención de la sede';
                        }else if (values.phone.length !== 10) {
                            errors.phone = 'El número de teléfono debe tener 10 dígitos';
                        }else if (!/^\d+$/.test(values.phone)) {
                            errors.phone = 'El número de teléfono solo debe contener números.';
                        }

                        if (!values.department) {
                            errors.department = 'Por favor, seleccione un departamento'
                        }

                        if (!values.municipality) {
                            errors.municipality = 'Por favor, seleccione un municipio'
                        }

                        if (!values.address) {
                            errors.address = 'Por favor, ingresa la dirección de la sede';
                        }

                        return errors;
                    }}

                    onSubmit={async (values) => {
                        try {
                            setDataSucursal(await postSucursal(values))
                        } catch (error) {
                            Swal.fire('Oops...', "Ocurrio un problema en el proceso", 'error');
                        }
                    }}
                >
                    {({ values, errors, isSubmitting }) => (
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

                            <div className="hidden">
                                <Field
                                    type="text"
                                    name="country"
                                />
                            </div>
                            
                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    as="select"
                                    name="department"
                                >
                                    <option value="" disabled hidden>Selecciona un departamento</option>
                                    {dataDepartment.map((department)=>(<option key={department} value={department}>{department}</option>))}
                                </Field>
                                <ErrorMessage name="department" component={() => (
                                    <div className="text-xs text-red-600">{errors.department}</div>
                                )}/>
                            </div>

                            <div>
                                <Field
                                    className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                                    name="municipality"
                                    as="select"
                                    disabled={!values.department}
                                >
                                    <option value="" disabled hidden>Selecciona un Municipio</option>
                                    {values.department && dataMunicipality[values.department].map((municipality)=>(
                                    <option key={municipality} value={municipality}>{municipality}</option>))}
                                </Field>
                                <ErrorMessage name="municipality" component={() => (
                                    <div className="text-xs text-red-600">{errors.municipality}</div>
                                )}/>
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

                            <div className="flex justify-center items-center">
                                <button
                                    className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
                                    type="submit"
                                    disabled={isSubmitting}>
                                    Ver en mapa
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className='h-100 w-full sm:w-105 border-2 border-black relative z-10 my-10'>
                {location ? 
                    <MapContainer  center={location} zoom={13} scrollWheelZoom={false} className='w-full h-full'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={location} draggable={true} eventHandlers={{ dragend: handleMarkerDragend }}>
                            <Popup>
                                <span className='text-center'>Usted esta <br /> aquí</span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                : (<p>Esperando datos para mostrar ubicación...</p>)
                }
                
            </div>

            <div className="flex justify-between flex-row gap-2 items-center mb-2">
                <Link to="/">
                    <button
                        className="w-36 md:h-14 h-10 px-2 border-2 border-purple-moru rounded-lg bg-gray-200 text-sm font-roboto-slab">
                        Atrás
                    </button>
                </Link>
                <button
                    className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
                    onClick={e=>handleUpdata(e)}>
                    Siguiente
                </button>
            </div>
        </div>
    )
}

export default CrearSede;
