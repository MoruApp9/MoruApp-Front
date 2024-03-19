import axios from "axios"
import {
  PostLocalStorage,
  PostLocalStorageCommercesByOwner,
} from "../localStorage/PostLocalStorage"
import { errorHandler } from "./errorHandler"

import { GetLocalStorageCommercesByOwner } from "../localStorage/GetLocalStorage"

import Swal from 'sweetalert2';
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