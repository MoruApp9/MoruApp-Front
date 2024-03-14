import { Link } from "react-router-dom";
import imagen from "../../images/logo-moruApp.png";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { GetLocalStorage } from "../../localStorage/GetLocalStorage";
import { putAdminCommerce } from "../../services/services";
import { useNavigate } from "react-router-dom";
import { putLocalStorageAdminCommerce } from "../../localStorage/PutLocalStorage";
import Swal from "sweetalert2";

const FormEditUser = ({ openModal }) => {
  const user = GetLocalStorage();
  const navigate = useNavigate();

  return (
    <div
      className={`p-10 rounded-lg flex flex-col justify-center items-center bg-white border-2 border-purple-moru-dark`}
    >
      <div className="flex flex-col items-center gap-8 my-8 md:my-0">
        <div className="flex items-center justify-between">
          <img src={imagen} alt="Imagen" className="w-32" />
          <h1 className="text-xs ml-2 mt-4 font-roboto-slab">
            Actualizar Cuenta
          </h1>
        </div>

        <div>
          <button
            className="absolute top-0 right-0 p-4 text-gray-500 cursor-pointer"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Formik
          initialValues={{
            nameClient: user.nameAdminCommerce,
            lastname: user.lastname,
            phone: user.phone,
            address: user.address,
          }}
          validate={(values) => {
            let error = {};

            if (!values.nameClient) {
              error.nameClient = "Por favor, ingresa un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nameClient)) {
              error.nameClient =
                "El nombre solo puede contener letras y espacios";
            }

            if (!values.lastname) {
              error.lastname = "Por favor, ingresa un apellido";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
              error.lastname =
                "El apellido solo puede contener letras y espacios";
            }

            if (!values.phone) {
              error.phone = "Por favor, ingresa un número de teléfono";
            } else if (!/^\d+$/.test(values.phone)) {
              error.phone = "El número de teléfono solo puede contener números";
            }

            // if (!values.municipality) {
            //   error.municipality = "Por favor, ingresa un municipio";
            // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.municipality)) {
            //   error.municipality =
            //     "El municipio solo puede contener letras y espacios";
            // }

            if (!values.address) {
              error.address = "Por favor, ingresa una dirección";
            }

            return error;
          }}
          onSubmit={async (valores) => {
            const object = {
              nameAdminCommerce: valores.nameClient,
              lastname: valores.lastname,
              phone: valores.phone,
              address: valores.address,
            };
            const actualizad = await putAdminCommerce(user.id, object);

            if (actualizad) {
              putLocalStorageAdminCommerce(actualizad);
              Swal.fire(
                "Éxito",
                "Usuario actualizado correctamente",
                "success"
              );
            } else {
              Swal.fire(
                "Error",
                "Ocurrio un error al intentar actaulizar el usuario, intente nuevamente",
                "error"
              );
            }

            navigate(-1);
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form autoComplete="off" className="flex flex-col gap-6">
              <div className="hidden">
                <Field type="text" name="userRole" />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="nameClient"
                  placeholder="Nombres"
                />
                <ErrorMessage
                  name="nameClient"
                  component={() => (
                    <div className="text-xs text-red-600">
                      {errors.nameClient}
                    </div>
                  )}
                />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="lastname"
                  placeholder="Apellidos"
                />
                <ErrorMessage
                  name="lastname"
                  component={() => (
                    <div className="text-xs text-red-600">
                      {errors.lastname}
                    </div>
                  )}
                />
              </div>

              <div className="flex items-center justify-between flex-col md:flex-row gap-6">
                <div>
                  <Field
                    className="w-80 md:w-32 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                    type="text"
                    name="phone"
                    placeholder="Telefono"
                  />
                  <ErrorMessage
                    name="phone"
                    component={() => (
                      <div className="text-xs text-red-600">{errors.phone}</div>
                    )}
                  />
                </div>
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="address"
                  placeholder="Dirección"
                />
                <ErrorMessage
                  name="address"
                  component={() => (
                    <div className="text-xs text-red-600">{errors.address}</div>
                  )}
                />
              </div>

              <div className="flex justify-between flex-row gap-2 items-center">
                <button
                  className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Actualizar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormEditUser;
