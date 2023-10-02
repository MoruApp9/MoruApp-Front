import { setProducts } from '../redux/productSlice';
import { setUserRole } from '../redux/userRoleSlice';
import axios from 'axios';

const BASE_URL = 'https://moruapp-back.up.railway.app'

export const getProducts = () => {
  return async (dispatch) => { // Usa async para permitir operaciones asincrónicas
    try {
      const response = await axios.get(`${BASE_URL}/products/`);
      
      const data = response.data;
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const getProductsByCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/?generalCategory=${categoryId}`);
      const data = response.data;
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const getCategorias = () => {
  return async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/allcategories`);
      
      const data = response.data;
      return (data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const getProductsByName = async (name) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/searchbyname?name=${name}`);
      return data
    } 
    catch (error) {
      console.error(error);
    }
  }

export const uploadImageClaudinary = async (event) => {
  const files = event.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "storeImages")
    

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsgvvje7v/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json()
    //console.log(res)
    
    //console.log(file.secure_url)
    return file.secure_url
}

export const postClientRegister = async(dataClient) => {  
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/client/register`, dataClient);
      const data = response.data;
      dispatch(setUserRole(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const postAdmincommerceRegister = (dataAdminCommerce) => {
  console.log(dataAdminCommerce);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/admincommerce/register`, dataAdminCommerce);
      const data = response.data;
      dispatch(setUserRole(data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};


