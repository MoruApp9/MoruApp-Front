import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { getCommercesByOwner, getSpecificCategories, postProduct, uploadImageClaudinary } from "../services/services"
import { Formik, Form, ErrorMessage, Field } from 'formik';
import axios from "axios";
import { useDispatch } from "react-redux";
import { BsImageFill } from "react-icons/bs"
import { GetLocalStorage } from '../localStorage/GetLocalStorage';

const PostProduct = () => {

  const handleOnChange = async (event) => {
    await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
    console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
  }

  const [specificCategories, setSpecificCategories] = useState([]);
  const dispatch = useDispatch();
  const dataUser = GetLocalStorage(); //data del usuario logueado



  useEffect(() => {
    const fetchData = async () => {  //hace la funcion asincrona para poder esperar a que se resuelva la promesa de Categorias
      try {
        const dataCommercesByOwner = await getCommercesByOwner(dataUser.id) //devuelve un array de objetos con todas las tiendas asociadas
        // const data = await getSpecificCategories(tienda.generalcategoryId)
        // setSpecificCategories(data)
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch])


  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-8 my-8 md:my-0">
        <div className="flex items-center justify-between">
          <img
            src={imagen}
            alt="Imagen"
            className="w-32" />
          <h1 className="text-xs ml-2 mt-4 font-roboto-slab">Vamos a crear tu publicación!</h1>
        </div>
        <Formik
          initialValues={{
            name: "",
            price: "",
            description: "",
            image: "",
            event: "",
            commerceId: "", //por defecto 
            category: "", //por defecto
            specificCategory: "",
            extraCategory: ""

          }}

          validate={(values) => {
            let error = {};

            if (!values.name) {
              error.name = 'Por favor, ingresa el nombre de una tienda'
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
              error.name = 'El nombre solo puede contener letras y espacios'
            }

            if (!values.price) {
              error.price = 'Por favor, ingresa un precio'
            } else if (!/^\d+$/.test(values.price)) {
              error.price = 'El precio debe contener solo números'
            }

            if (!values.description) {
              error.description = 'Por favor, ingresa una descripción'
            } else if (values.description.length > 300) {
              error.description = 'La descripción no debe superar los 300 carácteres'
            }

            if (!values.event) {
              error.event = 'Por favor, ingresa un evento'
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.event)) {
              error.event = 'El nombre solo puede contener letras y espacios'
            }
            return error

          }}

          onSubmit={(valores) => {
            postProduct(valores)
          }}
        >
          {({ values, errors }) => (
            console.log(values),
            <Form autoComplete="off" className="flex flex-col gap-6 ">
              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="name"
                  placeholder="Nombre del producto"
                />
                <ErrorMessage name="name" component={() => (
                  <div className="text-xs text-red-600">{errors.name}</div>
                )} />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="number"
                  name="price"
                  placeholder="Precio"
                />
                <ErrorMessage name="price" component={() => (
                  <div className="text-xs text-red-600">{errors.price}</div>
                )} />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="description"
                  placeholder="Descripción"
                />
                <ErrorMessage name="description" component={() => (
                  <div className="text-xs text-red-600">{errors.description}</div>
                )} />
              </div>

              <div>
                <Field
                  type="file"
                  name="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleOnChange}
                />

                <label htmlFor="fileInput" className="text-purple-moru w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-m font-roboto-slab flex items-center justify-center cursor-pointer">
                  <span>Upload image</span>
                  <BsImageFill className="text-xl ml-2"></BsImageFill>
                </label>
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="event"
                  placeholder="Evento"
                />
                <ErrorMessage name="event" component={() => (
                  <div className="text-xs text-red-600">{errors.event}</div>
                )} />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  as="select"
                  name="category" >
                  <option value="" disabled>
                    Selecciona una categoría específica
                  </option>
                  {specificCategories.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.name}</option>))}
                    <option value="otra">Otra</option>
                </Field>
                { values.category === "otra" ?
                <div>
                  <Field
                  className="mt-6 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="extraCategory"
                  placeholder="Ingresa tu categoría personal"
                  >
                  </Field>
                </div>: null}
                

                {/* <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="extraCategory"
                  placeholder="Categoría extra (opcional)">

                </Field> */}
              </div>

              <div className="flex sm:justify-between sm:flex-row gap-8 justify-center ">
                <Link to="/">
                  <button
                    className="w-36 md:h-14 h-10 px-2 border-2 border-purple-moru rounded-lg bg-gray-200 text-sm font-roboto-slab">
                    Atrás
                  </button>
                </Link>
                <Link to="/tienda">
                  <button
                    className="w-36 h-10 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-sm font-roboto-slab"
                    type="submit">
                    Siguiente
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>

  )
}

export default PostProduct;
