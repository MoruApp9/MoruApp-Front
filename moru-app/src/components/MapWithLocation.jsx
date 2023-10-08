import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapWithLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Solicitar permisos de ubicación
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
      } catch (error) {
        console.error('Error obteniendo ubicación:', error);
        // Puedes manejar el error o dejar la ubicación por defecto
      }
    };

    getLocation();

  }, []); // Nota: Agregué la dependencia vacía para que useEffect solo se ejecute al montar el componente

  return (
    <div className='h-100 w-full border-2 border-black'>
      {location ? (
        <MapContainer center={location} zoom={13} scrollWheelZoom={false} className='w-full h-full'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && (
            <Marker position={location}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default MapWithLocation;