import axios from "axios"
import { errorHandler } from "./errorHandler"

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
  