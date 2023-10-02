import { setProducts } from '../redux/productSlice';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import PostLocalStorage from "../localStorage/PostLocalStorage";

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
      const response = await axios.post(`${BASE_URL}/categories/allcategories`);
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
  try {
    await axios.post(`${BASE_URL}/client/register`, dataClient);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postAdmincommerceRegister = async(dataAdminCommerce) => {
  try {
    await axios.post(`${BASE_URL}/admincommerce/register`, dataAdminCommerce);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getUser = (emailUser) => {
  return async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/findforemail`, {email: emailUser});
      const data = response.data;
      PostLocalStorage(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

