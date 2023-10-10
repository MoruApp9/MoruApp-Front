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
import Loader from "../components/Loader";

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const loadedUser = useSelector(state => state.user)

  const [loadingData, setLoadingData] = useState(true);
  const [localStorageData, setLocalStorageData] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const dataComplete = { ...GetLocalStorage(), ...user };
  const [cargaSedes, setCargaSedes] = useState(false)


  useEffect(() => {
    const handleUserAuthentication = async () => {
      try {
        if (dataComplete.userRole && dataComplete.email) {
          if (dataComplete.userRole === "buyer") {
            await postClientRegister(dataComplete);
          } else {
            await postAdmincommerceRegister(dataComplete);
          }
        }

        await getUser(user.email);
        const dataUser = GetLocalStorage()
        console.log(GetLocalStorage());
        console.log(dataUser.brand);

        if (dataUser.brand && !cargaSedes) {
          await getBrandByOwner(dataUser.brand.id)
          setCargaSedes(true)
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setUser(true))
        setLoadingData(false); 
      }
    };
    handleUserAuthentication();
  }, [loadedUser, isAuthenticated, localStorageData]);

  loadingData ? <Loader/> : null

  if (localStorageData && localStorageData.error) navigate('/registration');

/*   if (dataComplete?.userRole === 'adminCommerce') { }
     //getUser(dataComplete.email)
    //console.log('dataComplete: ', dataComplete);
  
      else {
      getBrandByOwner(dataComplete.brand.id);
    }
  }  */

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
