import { setProducts } from "../redux/productSlice"
import { setUser } from "../redux/userSlice"
import axios from "axios"
import { PostLocalStorage, PostLocalStorageCommercesByOwner } from "../localStorage/PostLocalStorage"
import { errorHandler } from "./errorHandler"
import { setAllProducts } from "../redux/allProductsSlice"

const BASE_URL = "https://moruapp-back.up.railway.app"

export const getProducts = () => {
  return async (dispatch) => {
    // Usa async para permitir operaciones asincrónicas
    try {
      const response = await axios.get(`${BASE_URL}/products/`)
      const data = response.data
      dispatch(setAllProducts(data))
      dispatch(setProducts(data))
    } catch (error) {
      errorHandler(error)
    }
  }
}

export const getProductsByCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/?generalCategory=${categoryId}`
      )
      const data = response.data
      dispatch(setProducts(data))
    } catch (error) {
      errorHandler(error)
    }
  }
}

export const getCategorias = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/allcategories`);
    const data = response.data;
    return (data);
  } catch (error) {
    errorHandler(error)
  }
};

export const getSpecificCategories = async(id) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/allspecificcategories/${id}`);
    const data = response.data;
    return (data);
  } catch (error) {
    errorHandler(error)
  }
};

export const getProductsByName = async (name) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/searchbyname?name=${name}`);
      return data
    } 
    catch (error) {
      errorHandler(error)
    }
  }

export const getCommercesByOwner = async(idBrand) =>{
  try {
    const { data } = await axios.get(`${BASE_URL}/branchforcommerce/${idBrand}`);
    PostLocalStorageCommercesByOwner(data);
  } 
  catch (error) {
    errorHandler(error)
  }
}


export const uploadImageClaudinary = async (event) => {
  try {
    const files = event.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "storeImages")
  
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsgvvje7v/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json()
    //console.log(res)
  
    //console.log(file.secure_url)
    return file.secure_url
    
  } catch (error) {
    errorHandler(error)
  }
}

export const postClientRegister = async (dataClient) => {
  try {
    //console.log(dataClient);

    await axios.post(`${BASE_URL}/client/register`, dataClient)
  } catch (error) {
    errorHandler(error)
  }
}

export const postAdmincommerceRegister = async (dataAdminCommerce) => {
  try {
    //console.log(dataAdminCommerce);
    await axios.post(`${BASE_URL}/admincommerce/register`, dataAdminCommerce);
  } catch (error) {
    errorHandler(error)
  }
}

export const postProduct = async (productData) => {
  try {
    await axios.post(`${BASE_URL}/products/create`, productData)
  } catch (error) {
    errorHandler(error)
  }
}

export const getUser = async (emailUser) => {
  try {
    // const peticion = [axios.post(`${BASE_URL}/users/findforemail`, {email: emailUser})]
    // const response = await Promise.all(peticion) ;
    //console.log(emailUser);
    const response = await axios.post(`${BASE_URL}/users/findforemail`, {
      email: emailUser,
    })
    const data = response.data //deberia mandar los datos de la marca asociada
    PostLocalStorage(data)
  } catch (error) {
    errorHandler(error);
  }
}

export const postCommerceRegister = async(dataCommerce) => {
  try {
    await axios.post(`${BASE_URL}/commerce/register`, dataCommerce);
  } catch (error) {
    errorHandler(error);
  }
};

