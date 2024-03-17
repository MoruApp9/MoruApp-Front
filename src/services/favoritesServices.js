import axios from "axios"
import { errorHandler } from "./errorHandler"
import { addFav, removeFav } from "../redux/favoritesSlice"

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
