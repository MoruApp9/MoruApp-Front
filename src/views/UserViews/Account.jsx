import { GetLocalStorage } from "../../localStorage/GetLocalStorage";
import { AiFillMail } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdPlace } from "react-icons/md";
import { BsTelephoneFill, BsPinMapFill } from "react-icons/bs";
import { FaGlobe, FaCity } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormEditUser from "../../components/LogComponents/FormEditUser";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dataComplete = { ...GetLocalStorage() };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg ${isOpen ? 'bg-gray-500 bg-opacity-80' : ''}`}>
      <h1 className="text-4xl text-center text-purple-moru mb-8">
        Datos de usuario
      </h1>
      <div className="shadow-md rounded-lg">
        <div className="mb-4 flex items-center text-2xl">
          <BsFillPersonVcardFill className="mr-2 text-purple-moru ml-2" />
          <span className="text-gray-500 mr-2">Nombre:</span>{" "}
          {dataComplete.nameClient || dataComplete.nameAdminCommerce}
        </div>
        <div className="mb-4 flex items-center text-2xl">
          <BsFillPersonVcardFill className="mr-2 text-purple-moru ml-2" />
          <span className="text-gray-500 mr-2">Apellido:</span>{" "}
          {dataComplete.lastname}
        </div>
        <div className="mb-4 flex items-center text-2xl">
          <AiFillMail className="mr-2 text-purple-moru ml-2" />
          <span className="text-gray-500 mr-2">Email:</span>{" "}
          {dataComplete.email}
        </div>
        {dataComplete.country && (
          <div className="mb-4 flex items-center text-2xl">
            <FaGlobe className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2 ">País:</span>{" "}
            {dataComplete.country}
          </div>
        )}
        {dataComplete.phone && (
          <div className="mb-4 flex items-center text-2xl">
            <BsTelephoneFill className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Teléfono:</span>{" "}
            {dataComplete.phone}
          </div>
        )}
        {dataComplete.department && (
          <div className="mb-4 flex items-center text-2xl">
            <BsPinMapFill className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Departamento:</span>{" "}
            {dataComplete.department}
          </div>
        )}
        {dataComplete.municipality && (
          <div className="mb-4 flex items-center text-2xl">
            <FaCity className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Municipio:</span>{" "}
            {dataComplete.municipality}
          </div>
        )}
        {dataComplete.address && (
          <div className="mb-4 flex items-center text-2xl">
            <MdPlace className="mr-2 text-purple-moru ml-2" />
            <span className="text-gray-500 mr-2">Dirección:</span>{" "}
            {dataComplete.address}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
          onClick={openModal}
        >
          Actualizar Datos
        </button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <FormEditUser openModal={openModal}/>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
