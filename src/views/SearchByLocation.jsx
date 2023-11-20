import 'leaflet/dist/leaflet.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { postUbicationUser, postUbicationSucursales } from '../services/services';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const SearchByLocation = () => {

    const categories = useSelector((state) => state.categories.categorias);
    const [location, setLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [dataLocationUser, setDataLocationUser] = useState(null);
    const [municipality, setMunicipality] = useState(null);
    const [locationsArray, setLocationsArray] = useState(null);

    const dataDepartment = ['Choco', 'Antioquia'];
    const dataMunicipality = {Choco: ['Acandí', 'Riosucio', 'Unguía'],
    Antioquia: ['Apartadó', 'Carepa', 'Chigorodó', 'Mutatá', 'Necoclí', 'San Juan de Urabá', 'Turbo', 'Arboletes', 'Murindó', 'San Pedro de Urabá', 'Vigia del Fuerte']};

    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation([ latitude, longitude ]);
            },
            (error) => {
              console.error('Error obteniendo ubicación:', error);
            }
          );
        } else {
          console.error('Geolocalización no está disponible en este navegador.');
        }

        if (dataLocationUser && location !== dataLocationUser.coords) {
            setLocation(dataLocationUser.coords);
        }
        window.scrollTo(0, 0);
    }, [dataLocationUser, locationsArray, location]);

    const mapCenter = locationsArray ? currentLocation ? currentLocation : location : location;

    const blueIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return(
        <div className="flex flex-col lg:flex-row justify-center items-center gap-28 my-16">
            <div className="flex flex-col justify-center items-center font-roboto-slab">
                <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                    <div className="flex items-center">
                        <h1 className="text-2xl ml-2 mt-4">Ingresa tu ubicación</h1>
                    </div>
                    <Formik
                        initialValues={{
                            country: 'colombia',
                            department: '',
                            municipality: '',
                        }}

                        validate={(values) => {
                            let error = {};

                            if (!values.department) {
                                error.department = 'Por favor, seleccione un departamento'
                            }
    
                            if (!values.municipality) {
                                error.municipality = 'Por favor, seleccione un municipio'
                            }

                            return error
                        }}

                        onSubmit={ async (valores) => {
                            try {
                                setLocationsArray(null)
                                setMunicipality(valores.municipality);
                                setDataLocationUser(await postUbicationUser(valores));
                                if (location) {
                                    setLocation(null);
                                }
                            } catch (error) {
                                Swal.fire('Oops...', 'Error al realizar la operación', 'error');
                            } 
                        }}
                    >
                        {({values, errors, isSubmitting, setFieldValue }) => (
                            <Form  autoComplete="off" className="flex flex-col gap-6">
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
                                        onChange={(e) => {
                                            setFieldValue('department', e.target.value);
                                            setFieldValue('municipality', '');  
                                        }}
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
                                
                                <div className="flex gap-2 justify-center items-center">
                                    <button
                                        className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm"
                                        type="submit"
                                        disabled={isSubmitting}>
                                        Ver en mapa
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                
                {location ?
                    <div className="flex flex-col justify-center items-center font-roboto-slab">
                        <div className="flex flex-col items-center gap-8 my-8 md:my-0">
                            <div className="flex items-center">
                                <h1 className="text-2xl ml-2 mt-4">Utiliza un filtro</h1>
                            </div>
                            <Formik
                                initialValues={{
                                    municipality: municipality,
                                    generalcategoryId: ''
                                }}

                                validate={(values) => {
                                    let error = {};

                                    if (!values.generalcategoryId) {
                                        error.generalcategoryId = 'Por favor, seleccione una categoría'
                                    }

                                    return error
                                }}

                                onSubmit={ async ( valores ) => {
                                    try {
                                        setLocationsArray(await postUbicationSucursales(valores));
                                    } catch (error) {
                                        Swal.fire('Oops...', "Ocurrio un problema en el proceso", 'error');
                                    }
                                }}
                            >
                                {({values,errors, isSubmitting}) => (
                                    <Form  autoComplete="off" className="flex flex-col gap-6">
                                        <div>
                                            <Field name="generalcategoryId" as="select" className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab">
                                                <option value="" disabled hidden>Selecciona categoría</option>
                                                {categories?.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
                                            </Field>
                                            <ErrorMessage name="generalcategoryId" component={() => (
                                                <div className="text-xs text-red-600">{errors.generalcategoryId}</div>
                                            )} />
                                        </div>
                                        
                                        <div className="flex gap-2 justify-center items-center">
                                            <button
                                                className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm"
                                                type="submit"
                                                disabled={isSubmitting}>
                                                Filtrar
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                : null
                }

            </div>

            <div className='h-100 w-full sm:w-105 border-2 border-black relative z-10'>
                {location ?
                    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className='w-full h-full'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapCenter} icon={blueIcon}>
                            <Popup>
                                <span className='text-center'>Usted esta <br /> aquí</span>
                            </Popup>
                        </Marker>

                        {locationsArray && locationsArray.map((locationData, index) => (
                            <Marker
                                key={index}
                                position={locationData.coords}
                                icon={redIcon}
                            >
                                <Popup>
                                <Link to={`/tienda/${locationData.id}`}><span>{locationData.branchName}</span></Link>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                : (<p>Esperando datos para mostrar ubicación...</p>)
                }
            </div>
        </div>
    )
}

export default SearchByLocation;