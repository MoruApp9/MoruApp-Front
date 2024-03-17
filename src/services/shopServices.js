import axios from "axios"
import { errorHandler } from "./errorHandler"


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