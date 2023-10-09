import { setProducts } from "../redux/productSlice"
import { setUser } from "../redux/userSlice"
import axios from "axios"
import { PostLocalStorage,PostLocalStorageCommercesByOwner } from "../localStorage/PostLocalStorage"
import { errorHandler } from "./errorHandler"
import { setAllProducts } from "../redux/allProductsSlice"
import { addFav, removeFav } from "../redux/favoritesSlice"

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

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/allcategories`)
    const data = response.data
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const getSpecificCategories = async (generalcategoryId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/categories/allspecificcategories/${generalcategoryId}`
    )
    const data = response.data
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const getProductsByName = async (name) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/products/searchbyname?name=${name}`
    )
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const getBrandByOwner = async(idBrand) =>{
  try {
    const { data } = await axios.get(`${BASE_URL}/commerce/branchforcommerce/${idBrand}`);
    PostLocalStorageCommercesByOwner(data);
  } 
  catch (error) {
    errorHandler(error)
  }
}

/* export const getCommercesByOwner = async(idBrand) =>{
  try {
    const { data } = await axios.get(`${BASE_URL}/branchforcommerce/${idBrand}`);
    PostLocalStorageCommercesByOwner(data);
  } 
  catch (error) {
    errorHandler(error)
  }
}  */

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
    await axios.post(`${BASE_URL}/admincommerce/register`, dataAdminCommerce)
  } catch (error) {
    errorHandler(error)
  }
}

export const postProduct = async (productData) => {
  try {    
    console.log('pre axios: ', productData);
    const product = (await axios.post(`${BASE_URL}/products/create`, productData)).data
    console.log(product);
  } catch (error) {
    errorHandler(error)
  }
}

export const getUser =  (emailUser) => async (dispatch) => {
  try {
    // const peticion = [axios.post(`${BASE_URL}/users/findforemail`, {email: emailUser})]
    // const response = await Promise.all(peticion) ;
    //console.log(emailUser);
    const response = await axios.post(`${BASE_URL}/users/findforemail`, {
      email: emailUser,
    })
    const data = response.data //deberia mandar los datos de la marca asociada
    PostLocalStorage(data)
    dispatch(setUser(true))
  } catch (error) {
    errorHandler(error)
  }
}


export const postCommerceRegister = async (dataCommerce) => {
  try {
    const resp = (await axios.post(`${BASE_URL}/commerce/register`, dataCommerce)).data
    console.log(resp);
  } catch (error) {
    errorHandler(error)
  }
}

export const postFavorites = (clientId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/client/favorites`, { clientId, productId })
    dispatch(addFav(data))
    console.log(data);
  } catch (error) {
    errorHandler(error)
  }
}

export const getFavorites = async (clientId) =>{
  try {
    const { data } = await axios.get(`${BASE_URL}/client/favorites?clientId=${clientId}`)
    console.log(data);
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const deleteFavorite = (clientId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/client/favorites?clientId=${clientId}&&productId=${productId}`)
    console.log(data);
    dispatch(removeFav(productId))
  } catch (error) {
    errorHandler(error)
  }
}

export const postSucursal = async(dataSucursal) => {
  try {
    console.log('data: ', dataSucursal);
    const sede = (await axios.post(`${BASE_URL}/commerce/createbranch`, dataSucursal)).data
    console.log('sede: ', sede);
  } catch (error) {
    errorHandler(error);
  }
}



export const postChart = async (clientId, productId, quantity) => {
  //ssh
  try {
    const { data } = await axios.post(`${BASE_URL}/client/chart`, {clientId, productId, quantity })
    console.log('agregado chart',data);
  } catch (error) {
    errorHandler(error)
  }
}

export const getChart = async (clientId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/client/chartforclient/${clientId}`)
    console.log(data);
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const removeChart = async (clientId, productId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/client/deleteoneinchart?clientId=${clientId}&&productId=${productId}`)
    console.log('remove',data);

  } catch (error) {
    errorHandler(error)
  }
}

export const postRegisterAddress = async (dataUbication) => {
  try {
    const resp = (await axios.post(`${BASE_URL}/user/location`, dataUbication)).data
    console.log(resp);
  } catch (error) {
    errorHandler(error)
  }
}


