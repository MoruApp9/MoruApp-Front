import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import imagen from "../../images/Moru.jpeg";
//import { getBrandByOwner, getSpecificCategories, postProduct, uploadImageClaudinary } from "../../services/services"
import { getBrandByOwner } from "../../services/sucursalStoreServices";
import { getSpecificCategories } from "../../services/categoriesServices";
import { postProduct } from "../../services/productServices";
import { uploadImageClaudinary } from "../../services/cloudinaryServices"
import { Formik, Form, ErrorMessage, Field } from 'formik';
import axios from "axios";
import { useDispatch } from "react-redux";
import { BsImageFill } from "react-icons/bs"
import { GetLocalStorage, GetLocalStorageCommercesByOwner } from '../../localStorage/GetLocalStorage';
import Swal from 'sweetalert2';

const PostProduct = () => {
  const sedes = GetLocalStorageCommercesByOwner()
  const location = useLocation();
  const id = location.search.slice(1)
  const [imageUpload, setImageUpload] = useState("")
  const [specificCategories, setSpecificCategories] = useState([]);
  const dispatch = useDispatch();
  const dataUser = GetLocalStorage();
  const navigate = useNavigate()



  const handleOnChange = async (event) => {
    const imagen = await uploadImageClaudinary(event)
    setImageUpload(imagen)
    // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
    //console.log(await uploadImageClaudinary(event)); //url creada mostrada en consola
  }


  useEffect(() => {
    const fetchData = async () => {  //hace la funcion asincrona para poder esperar a que se resuelva la promesa de Categorias
      try {
        const categoriaId = dataUser.brand.generalcategoryId
        const data = await getSpecificCategories(categoriaId)
        setSpecificCategories(data)
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
            image: imageUpload,
            stock: "",
            commerceId: dataUser.brand.id,
            generalcategoryId: dataUser.brand.generalcategoryId,
            specificCategory: "",
            extraCategory: "",
            commercebranchId: id
          }}

          validate={(values) => {
            let error = {};

            if (!values.name) {
              error.name = 'Por favor, ingresa el nombre de una tienda'
            }

            if (!values.price) {
              error.price = 'Por favor, ingresa un precio'
            } else if (!/^[0-9,.]+$/.test(values.price)) {
              error.price = 'El precio debe contener solo números'
            }

            if (!values.description) {
              error.description = 'Por favor, ingresa una descripción'
            } else if (values.description.length > 300) {
              error.description = 'La descripción no debe superar los 300 carácteres'
            }

            if (!values.stock) {
              error.event = 'Por favor, ingresa un evento'
            }

            if (values.specificCategory === "") {
              error.specificCategory = 'Por favor, ingresa una categoria especifica'
            }
            return error

          }}

          onSubmit={async (values) => {
            values.specificCategory === "otra" 
              ? values.specificCategory = values.extraCategory
              : values.specificCategory = values.specificCategory
            values.image = imageUpload;
            try {
              await postProduct(values);
              Swal.fire('Éxito', 'Petición creada correctamente, en breve será aceptada', 'success');
              navigate('/');
              //window.location.reload()
            } catch (error) {
              Swal.fire('Oops...', 'Error al crear el producto', 'error');
            }
          }}

        >

          {({ values, errors, handleChange }) => (
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
                  type="text"
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

                <label htmlFor="fileInput" className={` w-80 h-12 px-2 border-2 rounded-lg border-purple-moru ${!imageUpload.length ? 'text-purple-moru' : 'border-lime-600 text-lime-600'} bg-gray-100 text-m font-roboto-slab flex items-center justify-center cursor-pointer`}>
                  <span>{!imageUpload.length ? 'Subir imagen' : 'Imagen subida'}</span>
                  <BsImageFill className="text-xl ml-2"></BsImageFill>
                </label>
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  type="number"
                  name="stock"
                  placeholder="Cantidad de productos en stock"
                />
                <ErrorMessage name="stock" component={() => (
                  <div className="text-xs text-red-600">{errors.stock}</div>
                )} />
              </div>

              <div>
                <Field
                  className="w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                  as="select"
                  name="specificCategory"
                  defaultValue="">

                  <option value="" disabled>
                    Selecciona una categoría específica
                  </option>
                  
                  {specificCategories.map((categoria) => (
                    <option key={categoria.id} value={categoria.name}>{categoria.name}</option>))}
                  <option value="otra">Otra</option>
                </Field>
                <ErrorMessage name="specificCategory" component={() => (
                  <div className="text-xs text-red-600">{errors.specificCategory}</div>
                )} />
                {values.specificCategory === "otra" ?
                  <div>
                    <Field
                      className="mt-6 w-80 h-12 px-2 border-2 border-purple-moru rounded-lg bg-gray-100 text-sm font-roboto-slab"
                      type="text"
                      name="extraCategory"
                      placeholder="Ingresa tu categoría personal"
                      onChange={handleChange}
                      value={values.extraCategory}
                    />
                  </div> : null}

              </div>

              <div className="flex justify-between flex-row gap-2 items-center">
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
