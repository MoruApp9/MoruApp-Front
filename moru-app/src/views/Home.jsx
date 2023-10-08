import { useDispatch, useSelector } from "react-redux";
import Advertising from "../components/Advertising";
import AllProducts from "../components/AllProducts";
import Filters from "../components/Filters";
import Categories from '../components/Categories';
import { useAuth0 } from '@auth0/auth0-react';
import { postAdmincommerceRegister, postClientRegister, getUser, getBrandByOwner } from "../services/services";
import { GetLocalStorage } from '../localStorage/GetLocalStorage';
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useAuth0();
  const dataComplete = { ...GetLocalStorage(), ...user };
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(true);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [cargaSedes, setCargaSedes] = useState(false)

  useEffect(() => {
    const handleUserAuthentication = async () => {
      try {
        // Realizar las solicitudes para obtener datos y configurar localStorageData
        if (dataComplete.userRole && dataComplete.email) {
          if (dataComplete.userRole === "buyer") {
            await postClientRegister(dataComplete);
          } else {
            await postAdmincommerceRegister(dataComplete);
            dispatch(getUser(dataComplete.email))
          }
        }  
        if (dataComplete.brand && !cargaSedes) {
          console.log(dataComplete.brand.id);
          getBrandByOwner(dataComplete.brand.id)
          setCargaSedes(true)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingData(false); 
      }
    };
    handleUserAuthentication();
  }, [dataComplete, isAuthenticated]);

  if (loadingData) {
    return <h1>Cargando...</h1>;
  }

  if (localStorageData && localStorageData.error) navigate('/registration');

/*   if (dataComplete?.userRole === 'adminCommerce') { }
 */    //getUser(dataComplete.email)
    //console.log('dataComplete: ', dataComplete);
  
    /*  else {
      getBrandByOwner(dataComplete.brand.id);
    } */
    

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
