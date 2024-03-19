import axios from "axios"
import { setProducts } from "../redux/productSlice"
import { errorHandler } from "./errorHandler"
import { setAllProducts } from "../redux/allProductsSlice"

import Swal from 'sweetalert2';

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