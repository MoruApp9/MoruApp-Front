import { GetLocalStorage } from '../localStorage/GetLocalStorage';
import { AiFillMail } from "react-icons/ai"
import { BsFillPersonVcardFill } from "react-icons/bs"
import { MdPlace } from "react-icons/md"
import { BsTelephoneFill, BsPinMapFill } from "react-icons/bs"
import { FaGlobe, FaCity } from 'react-icons/fa';
import { useEffect } from 'react';


const Account = () => {
  const dataComplete = { ...GetLocalStorage() };
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-4xl text-center text-purple-moru mb-8">Datos de usuario</h1>
      <div className='shadow-md rounded-lg'>
        <div className="mb-4 flex items-center text-2xl">
          <BsFillPersonVcardFill className="mr-2 text-purple-moru ml-2" />
          <span className="text-gray-500 mr-2">Nombre:</span> {dataComplete.nameClient || dataComplete.nameAdminCommerce}
        </div>
        <div className="mb-4 flex items-center text-2xl">
          <BsFillPersonVcardFill className="mr-2 text-purple-moru ml-2" />
          <span className="text-gray-500 mr-2">Apellido:</span> {dataComplete.lastname}
        </div>
        <div className="mb-4 flex items-center text-2xl">
          <AiFillMail className="mr-2 text-purple-moru ml-2" />
          <span className="text-gray-500 mr-2">Email:</span> {dataComplete.email}
        </div>
        {dataComplete.country && (
          <div className="mb-4 flex items-center text-2xl">
            <FaGlobe className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2 ">País:</span> {dataComplete.country}
          </div>
        )}
        {dataComplete.phone && (
          <div className="mb-4 flex items-center text-2xl">
            <BsTelephoneFill className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Teléfono:</span> {dataComplete.phone}
          </div>
        )}
        {dataComplete.department && (
          <div className="mb-4 flex items-center text-2xl">
            <BsPinMapFill className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Departamento:</span> {dataComplete.department}
          </div>
        )}
        {dataComplete.municipality && (
          <div className="mb-4 flex items-center text-2xl">
            <FaCity className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Municipio:</span> {dataComplete.municipality}
          </div>
        )}
        {dataComplete.address && (
          <div className="mb-4 flex items-center text-2xl">
            <MdPlace className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Dirección:</span> {dataComplete.address}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
