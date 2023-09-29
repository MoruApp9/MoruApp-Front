import { setProducts } from '../redux/productSlice';
import axios from 'axios';

export const getProducts = () => {
  return async (dispatch) => { // Usa async para permitir operaciones asincrónicas
    try {
      const response = await axios.get('https://moruapp-back.up.railway.app/products/');
      const data = response.data;
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};