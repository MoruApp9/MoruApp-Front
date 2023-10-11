import store from '../redux/store'
import { setErrors } from "../redux/errorsSlice"

export const errorHandler = (error) => {
    console.error(error);
    console.log(store);
    store.dispatch(
      setErrors(
        error?.response?.data?.includes("<!DOCTYPE")
          ? error.message
          : error.response.data.error
      )
    ) 
  }