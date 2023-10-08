import { useDispatch, useSelector } from "react-redux";
import Advertising from "../components/Advertising";
import AllProducts from "../components/AllProducts";
import Filters from "../components/Filters";
import Categories from '../components/Categories';
import { useAuth0 } from '@auth0/auth0-react';
import { postAdmincommerceRegister, postClientRegister, getUser, getBrandByOwner, getChart, getFavorites } from "../services/services";
import { GetLocalStorage } from '../localStorage/GetLocalStorage';
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../redux/cartSlice";
import { addFav } from "../redux/favoritesSlice";
import { setUser } from "../redux/userSlice";

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const loadedUser = useSelector(state => state.user)

  const [loadingData, setLoadingData] = useState(true);
  const [localStorageData, setLocalStorageData] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const dataComplete = { ...GetLocalStorage(), ...user };
  //const currentUser = GetLocalStorage()

  useEffect(() => {
    
    const handleUserAuthentication = async () => {
      try {
        // Realizar las solicitudes para obtener datos y configurar localStorageData
        if (dataComplete.userRole && dataComplete.email) {
          if (dataComplete.userRole === "buyer") {
            await postClientRegister(dataComplete);
          } else {
            await postAdmincommerceRegister(dataComplete);
          }
        } else if (isAuthenticated) {
          dispatch( getUser(dataComplete.email));
          // Aquí configura localStorageData cuando los datos estén disponibles
          setLocalStorageData(dataComplete);
          dispatch(user(true))
        }  
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setUser(true))
        setLoadingData(false); // Marcar la carga de datos como completa
      }
    };

    handleUserAuthentication();
  }, [loadedUser, isAuthenticated, localStorageData]);

  // Si los datos aún se están cargando, muestra un mensaje de carga
  if (loadingData) {
    return <h1>Cargando...</h1>;
  }
  //console.log(dataComplete);
  // Comprobación de userRole y autenticación

  if (localStorageData && localStorageData.error) navigate('/registration');

  if (dataComplete?.userRole === 'adminCommerce') {
    console.log('a');
    console.log(!dataComplete.brand || !dataComplete.brand.id);
    if (!dataComplete.brand || !dataComplete.brand.id) {
      navigate('/registrar-empresa');
    }else{
      getBrandByOwner(dataComplete.brand.id);
    }
  }

  if(loadedUser) {
    const handleChart = async () => {
      const userChart = await getChart(dataComplete.id)
      userChart.forEach(product => dispatch(addToCart(product)))
    }

    const handleFavs = async () => {
      const userfavs = await getFavorites(dataComplete.id)
      userfavs.forEach(fav => dispatch(addFav(fav)))
    }
    
    handleChart()
    handleFavs()
  }



  // Si no se cumple la condición, muestra los productos
  return (
    <div>
      {!productsFiltered.length && <Advertising />}
      {!productsFiltered.length && <Categories />}
      {!productsFiltered.length && <AllProducts />}
      {productsFiltered.length !== 0 && <Filters />}
    </div>
  );
  

};

export default Home;
