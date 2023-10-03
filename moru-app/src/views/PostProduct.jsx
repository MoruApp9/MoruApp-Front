import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import imagen from "../images/Moru.jpeg";
import { getCategorias, uploadImageClaudinary } from "../services/services"
import { Formik, Form, ErrorMessage, Field } from 'formik';
import axios from "axios";
import { useDispatch } from "react-redux";



const PostProduct = () => {

  const handleOnChange = async (event) => {
    await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
    console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
  }

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {  //hace la funcion asincrona para poder esperar a que se resuelva la promesa de Categorias
      try {
        const data = await getCategorias()
        setCategories(data)
        console.log(data);
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
            commerceId: "",
            category: "",
            generalCategoryId: "",
          }}

          validate={(values) => {
              let error = {};

              if (!values.name) {
                  error.name = 'Por favor, ingresa el nombre de una tienda'
              }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                  error.name = 'El nombre solo puede contener letras y espacios'
              }

              if (!values.price) {
                error.price = 'Por favor, ingresa un precio'
            }else if (!/^\d+$/.test(values.price)) {
                error.price = 'El precio debe contener solo números'
            }

              if (!values.description) {
                  error.description = 'Por favor, ingresa una descripción'
              }else if (values.description.length > 300) {
                  error.description = 'La descripción no debe superar los 300 carácteres'
              }

              if (!values.event) {
                error.event = 'Por favor, ingresa un evento'
            }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.event)) {
                error.event = 'El nombre solo puede contener letras y espacios'
            }
              return error
            
          }}



          onSubmit={(valores) => {
            PostLocalStorage(valores);
            loginWithRedirect();
          }}
        >
          {({ errors }) => (
            <Form autoComplete="off" className="flex flex-col gap-6 ">
              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="text"
                  name="name"
                  placeholder="Nombre"
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
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="file"
                  name="file"
                  placeholder="Sube tu imagen aquí"
                  onChange={handleOnChange}
                />
                {/* <ErrorMessage name="phone" component={() => (
                                    <div className="text-xs text-red-600">{errors.phone}</div>
                                )}/> */}
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
                  name="commerceId" >
                  <option value="" disabled>
                    Selecciona un Id de comercio
                  </option>
                  <option key="Id1" value="Id1">Categoria</option>
                </Field>
                <ErrorMessage name="commerceId" component={() => (
                  <div className="text-xs text-red-600">{errors.commerceId}</div>
                )} />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  as="select"
                  name="category" >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.name}</option>))}
                </Field>
                <ErrorMessage name="category" component={() => (
                  <div className="text-xs text-red-600">{errors.category}</div>
                )} />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  as="select"
                  name="generalCategoryId" >
                  <option value="" disabled>
                    Selecciona un Id de categoría
                  </option>
                  {categories.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.id}</option>))}
                </Field>
                <ErrorMessage name="category" component={() => (
                  <div className="text-xs text-red-600">{errors.category}</div>
                )} />
              </div>

              <div className="flex sm:justify-between flex-col sm:flex-row gap-2 justify-center items-center">
                <Link to="/">
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

export default PostProduct;
