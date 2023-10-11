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
//import { setUser } from "../redux/userSlice";
import Loader from "../components/Loader";

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const favsGlobalState = useSelector((state) => state.favorites)
  const chartGlobalState = useSelector(state => state.cart.cart)
  //const loadedUser = useSelector(state => state.user)

  const [loadingData, setLoadingData] = useState(true);
  const [localStorageData, setLocalStorageData] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const dataComplete = { ...GetLocalStorage(), ...user };
  const [cargaSedes, setCargaSedes] = useState(false);

  useEffect(() => {
    const handleUserAuthentication = async () => {
      try {
        if (!dataComplete.id) {
          if (dataComplete.userRole && dataComplete.email) {
            if (dataComplete.userRole === "buyer") {
              console.log("register cliente");
              await postClientRegister(dataComplete);
            } else {
              await postAdmincommerceRegister(dataComplete);
            }
          }
        }
          
        if (user) {
          if (dataComplete.userRole === "adminCommerce" && !dataComplete.brand) {
            await getUser(user.email);
          }else if(!dataComplete.id){
            console.log("data");
            await getUser(user.email);
          }
          
          const dataUser = GetLocalStorage()
          //console.log(dataUser);
          if (dataUser && dataUser.error) navigate('/registration');


          if (dataUser.brand && !cargaSedes) {
            await getBrandByOwner(dataUser.brand.id)
            setCargaSedes(true)
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        //dispatch(setUser(true))
        setLoadingData(false);
      }
    };
    handleUserAuthentication();
  }, [user, isAuthenticated, localStorageData, dataComplete]);

  loadingData ? <Loader /> : null


  /*   if (dataComplete?.userRole === 'adminCommerce') { }
       //getUser(dataComplete.email)
      //console.log('dataComplete: ', dataComplete);
    
        else {
        getBrandByOwner(dataComplete.brand.id);
      }
    }  */




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
