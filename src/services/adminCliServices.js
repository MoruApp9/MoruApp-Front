import axios from "axios"
import {
  PostLocalStorage,
  PostLocalStorageCommercesByOwner,
} from "../localStorage/PostLocalStorage"
import { errorHandler } from "./errorHandler"

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