import axios from "axios"
import { errorHandler } from "./errorHandler"


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
