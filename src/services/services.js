import axios from "axios"
import { setProducts } from "../redux/productSlice"
import { setUserIsLoaded } from "../redux/userIsLoadedSlice"
import {
  PostLocalStorage,
  PostLocalStorageCommercesByOwner,
} from "../localStorage/PostLocalStorage"
import { errorHandler } from "./errorHandler"
import { setAllProducts } from "../redux/allProductsSlice"
import { addFav, removeFav } from "../redux/favoritesSlice"
import { setUbication } from "../redux/ubicationSlice"
import { GetLocalStorageCommercesByOwner } from "../localStorage/GetLocalStorage"
import { addToCart } from "../redux/cartSlice"
import Swal from 'sweetalert2';

const BASE_URL = "https://moruapp-back.up.railway.app"


// ! Peticiones Productos

export const getProducts = () => {
  return async (dispatch) => {
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

export const getProductsByName = async (name) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/products/searchbyname?name=${name}`
    )
    return data
  } catch (error) {
    Swal.fire('Oops...', error.response.data, 'info');
    errorHandler(error)
  }
}

export const postProduct = async (productData) => {
  try {
    // console.log(productData);
    const product = (await axios.post(`${BASE_URL}/products/create`, productData)).data
    // console.log(product);
    return product
  } catch (error) {
    errorHandler(error)
  }
}

export const editProduct = async (id, productToEdit) => {
  try {
    const product = (await axios.put(`${BASE_URL}/products/edit/${id}`, productToEdit))
  } catch (error) {
    errorHandler(error)
  }
}


export const putOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/commerce/putproductstatus/${orderId}`, {status: status})

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getAllProducts = async () => {
  try {
    const response = (await axios.get(`${BASE_URL}/products/productsallsuperadmin`)).data
    return response;
  } catch (error) {
    errorHandler(error)
  }
}



export const getPendingProducts = async () => {
  try {
    const response = (await axios.get(`${BASE_URL}/products/productspending`)).data

    return response;
  } catch (error) {
    errorHandler(error)
  }
}

export const putProduct = async (id, obj) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/confirmproductcreated/${id}`, obj)
  } catch (error) {
    errorHandler(error)
  }
}

// ! Peticiones Categorias

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


// !  Peticiones Tiedas y Sucursales

export const getBrandByOwner = async (idBrand) => {
  try {
    const {
      data
    } = await axios.get(`${BASE_URL}/commerce/branchforcommerce/${idBrand}`);
    PostLocalStorageCommercesByOwner(data);
    GetLocalStorageCommercesByOwner();
  } catch (error) {
    errorHandler(error)
  }
}

export const postCommerceRegister = async (dataCommerce) => {
  try {
    const resp = (
      await axios.post(`${BASE_URL}/commerce/register`, dataCommerce)
    ).data
  } catch (error) {
    errorHandler(error)
  }
}

export const postSucursal = async (dataSucursal) => {
  try {
    const sede = (await axios.post(`${BASE_URL}/commerce/createbranch`, dataSucursal)).data
    return sede
  } catch (error) {
    errorHandler(error)
  }
}

export const putSucursal = async (dataSucursal) => {
  try {
    const sede = (await axios.put(`${BASE_URL}/commerce/addcoords/`, dataSucursal)).data
    Swal.fire('Solicitud enviada', sede.message, 'info');
  } catch (error) {
    errorHandler(error)
  }
}

export const getInfoBranch = async (idBranch) => {
  try {
    const response = (
      await axios.get(`${BASE_URL}/commerce/infobranch/${idBranch}`)
    ).data
    return response
  } catch (error) {
    errorHandler(error)
  }
}

export const putBrand = async (id, obj) => {
  try {
    const response = await axios.put(`${BASE_URL}/commerce/approvecommerce/${id}`, obj)
  } catch (error) {
    errorHandler(error)
  }
}

export const putBranch = async (id, obj) => {
  try {
    const response = await axios.put(`${BASE_URL}/commerce/putbranchstatus/${id}`, obj)

  } catch (error) {
    errorHandler(error)
  }
}

export const getPendingCommerces = async () => {
  try {
    const response = (await axios.get(`${BASE_URL}/commerce/pendingcommerces`)).data

    return response;
  } catch (error) {
    errorHandler(error)
  }
}

export const getPendingBranches = async () => {
  try {
    const response = (await axios.get(`${BASE_URL}/commerce/pendingbranches`)).data

    return response;
  } catch (error) {
    errorHandler(error)
  }
}

export const getBranchOrders = async (branchId) => {
  try {
    const response = await axios(`${BASE_URL}/commerce/allordersforbranch/${branchId}`)
    //console.log('getBranchOrders', response.data);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export const getAllCommerces = async () => {
  try {
    const response = (await axios.get(`${BASE_URL}/commerce/allcommerces`)).data
    return response;
  } catch (error) {
    errorHandler(error)
  }
}

export const getAllBranches = async () => {
  try {
    const response = (await axios.get(`${BASE_URL}/commerce/allbranches`)).data
    return response;
  } catch (error) {
    errorHandler(error)
  }
}

export const getBrandForId = async (id) => {
try {
  const response = await axios.get(`${BASE_URL}/commerce/commerceforid/${id}`)
  return response.data
} catch (error) {
  errorHandler(error)
}
}

// ! Peticiones cloudinary 

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

    return file.secure_url
  } catch (error) {
    errorHandler(error)
  }
}


// ! Peticiones Clientes y Admin Commerce


export const postClientRegister = async (dataClient) => {
  try {
    //console.log('entré a postclientregister');
    await axios.post(`${BASE_URL}/client/register`, dataClient)
    //console.log(response);
  } catch (error) {
    errorHandler(error)
  }
}

export const postAdmincommerceRegister = async (dataAdminCommerce) => {
  try {
    await axios.post(`${BASE_URL}/admincommerce/register`, dataAdminCommerce)
  } catch (error) {
    errorHandler(error)
  }
}

export const putAdminCommerce = async (id, dataToUpdate) => {
  try {
   const data =  await axios.put(`${BASE_URL}/admincommerce/edit/${id}`, dataToUpdate)
   return data.data
  } catch (error) {
    errorHandler(error)
  }
}

export const getUser = async (emailUser) => {
  try {
    // const peticion = [axios.post(`${BASE_URL}/users/findforemail`, {email: emailUser})]
    // const response = await Promise.all(peticion) ;
    const response = await axios.post(`${BASE_URL}/users/findforemail`, {
      email: emailUser,
    })
    const data = response.data //deberia mandar los datos de la marca asociada
    PostLocalStorage(data)
    /* return (dispatch) => {
      dispatch(setUser(true))
    } */
  } catch (error) {
    errorHandler(error)
  }
}

export const postBuy = async (clientId) => {
  try {
    //console.log(clientId);
    const response = await axios.post(`${BASE_URL}/client/buy`, { clientId })
  } catch (error) {
    errorHandler(error)
  }
}


export const getHistoryOfOrderedProducts = async (clientId) => {
  try {
    const response = await axios(`${BASE_URL}/client/history/${clientId}`)

    return response.data
  } catch (error) {
    console.error(error);
  }
}

// ! Peticiones Favoritos

export const postFavorites = (clientId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/client/favorites`, {
      clientId,
      productId,
    })
    dispatch(addFav(data.product))
  } catch (error) {
    errorHandler(error)
  }
}

export const getFavorites = async (clientId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/client/favorites?clientId=${clientId}`)
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const deleteFavorite = (clientId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/client/favorites?clientId=${clientId}&&productId=${productId}`
    )
    dispatch(removeFav(productId))
  } catch (error) {
    errorHandler(error)
  }
}

// ! Peticiones Carrito

export const postChart = async (clientId, productId, quantity) => {
  try {

    const { data } = await axios.post(`${BASE_URL}/client/chart`, {
      clientId,
      productId,
      quantity,
    })
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const postOneQuantityOfProduct = async (clientId, productId) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/client/oneproductmore`, {
      clientId,
      productId
    })
    return data
  } catch (error) {
    //Swal.fire('No hay stock', error.response.data.error , 'info');
    errorHandler(error)
  }
}

export const getChart = async (clientId) => {
  try {
    //console.log(clientId);
    const { data } = await axios.get(
      `${BASE_URL}/client/chartforclient/${clientId}`
    )
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const removeChart = async (clientId, productId) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/client/deleteoneinchart?clientId=${clientId}&&productId=${productId}`
    )
    return data
  } catch (error) {
    errorHandler(error)
  }
}

export const deleteAllCart = async (clientId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/client/emptychart?clientId=${clientId}`)
  } catch (error) {
    errorHandler(error)
  }
}

export const deleteAllQuantityOfProductFromCart = async (clientId, productId, quantity) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/client/deleteproductinchart?clientId=${clientId}&&productId=${productId}&&quantity=${quantity}`)
    //return data
  } catch (error) {
    errorHandler(error)
  }
}


// ! Peticiones Geolocalizacion 

export const postUbicationUser = async(dataUbication) => {
  try {
    const resp = (await axios.post(`${BASE_URL}/commerce/municipalitycoords`, dataUbication)).data
    return resp;
  } catch (error) {
    errorHandler(error)
  }
}


export const postUbicationSucursales = async(dataCategory) => {
  try {
    const resp = (await axios.post(`${BASE_URL}/commerce/branches`, dataCategory)).data
    return resp;
  } catch (error) {
    errorHandler(error)
    Swal.fire('Oops...', error.response.data.error , 'error');
  }
}


// ! Peticiones Review

export const postReview = async (reviewData) => {
  try {
    const response = (await axios.post(`${BASE_URL}/rating/`, reviewData)).data;
    return response;
  } catch (error) {
    errorHandler(error)
  }
};

export const getReviews = async (idSucursal) => {
  try {
    const response = (await axios.get(`${BASE_URL}/rating?idSucursal=${idSucursal}`)).data;
    return response;
  } catch (error) {
    errorHandler(error)
  }
};




