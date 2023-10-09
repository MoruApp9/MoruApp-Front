import 'leaflet/dist/leaflet.css';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { postRegisterAddress } from '../services/services';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SearchByLocation = () => {

    const categories = useSelector((state) => state.categories.categorias);
    const locationsArray = useSelector((state) => state.ubication.ubiety);
    const [location, setLocation] = useState(null);

    const initialValues = !location
    ? {
        department: '',
        municipality: '',
        generalcategoryId: '',
        }
    : {
        generalcategoryId: '',
        };

    // const locationsArray = [
    //     { name: 'niji', location: [-11.99415645, -77.0611521221075] },
    //     { name: 'suji', location: [-11.988889, -77.062778] },
    //     // Otros puntos de ubicación
    // ];

    useEffect(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation([ latitude, longitude ]);
            },
            (error) => {
              console.error('Error obteniendo ubicación:', error);
            }
          );
        } else {
          console.error('Geolocalización no está disponible en este navegador.');
        }
      }, []);

      console.log(!location);
    
      const mapCenter = location || [7.88333, -76.6333];

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
                        initialValues={initialValues}

                        validate={(values) => {
                            let error = {};

                            if (!location) {
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
                            }

                            if (!values.generalcategoryId) {
                                error.generalcategoryId = 'Por favor, seleccione una categoría'
                            }
                            return error
                        }}

                        onSubmit={(valores, { resetForm }) => {
                            if (location) {
                                console.log({ generalcategoryId: valores.generalcategoryId});
                                postRegisterAddress(valores.generalcategoryId);
                            } else {
                                console.log({
                                    department: valores.department,
                                    municipality: valores.municipality,
                                    generalcategoryId: valores.generalcategoryId,
                                });
                            }
                            resetForm();
                        }}
                    >
                        {({errors, isSubmitting}) => (
                            <Form  autoComplete="off" className="flex flex-col gap-6">
                                {!location && (
                                    <div>
                                        <Field
                                            className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm"
                                            type="text"
                                            name="department"
                                            placeholder="Departamento"
                                        />
                                        <ErrorMessage name="department" component={() => (
                                            <div className="text-xs text-red-600">{errors.department}</div>
                                        )}/>
                                    </div>
                                )}
                                
                                {!location && (
                                    <div>
                                        <Field
                                            className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm"
                                            type="text"
                                            name="municipality"
                                            placeholder="Municipio"
                                        />
                                        <ErrorMessage name="municipality" component={() => (
                                            <div className="text-xs text-red-600">{errors.municipality}</div>
                                        )}/>
                                    </div>
                                )}
                                
                                <div>
                                    <Field name="generalcategoryId" as="select" className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab">
                                        <option value="" disabled hidden>Selecciona categoría</option>
                                        {categories.map((category)=>(<option key={category.id} value={category.id}>{category.name}</option>))}
                                    </Field>
                                    <ErrorMessage name="generalcategoryId" component={() => (
                                        <div className="text-xs text-red-600">{errors.generalcategoryId}</div>
                                    )}/>
                                </div>

                                <div className="flex gap-2 justify-center items-center">
                                    <button
                                        className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm"
                                        type="submit"
                                        disabled={isSubmitting}>
                                        Buscar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className='h-100 w-full sm:w-105 border-2 border-black relative z-10'>
                <MapContainer key={mapCenter.join(",")} center={mapCenter} zoom={13} scrollWheelZoom={false} className='w-full h-full'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapCenter}>
                        <Popup>
                            <span className='text-center'>Usted esta <br /> aquí</span>
                        </Popup>
                    </Marker>

                    {locationsArray && locationsArray.map((locationData, index) => (
                        <Marker
                            key={index}
                            position={locationData.location}
                            icon={redIcon}
                        >
                            <Popup>
                            <span>{locationData.name}</span>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    )
}

export default SearchByLocation;