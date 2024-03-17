import axios from "axios"
import { errorHandler } from "./errorHandler"


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
