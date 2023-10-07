import { useSelector } from "react-redux";
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
  const { user, isAuthenticated } = useAuth0();
  const dataComplete = { ...GetLocalStorage(), ...user };
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(true);
  const [localStorageData, setLocalStorageData] = useState(null);

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
        }  
        if (!dataComplete.id) {
          await getUser(dataComplete.email);
          setLocalStorageData(dataComplete);
          } 
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingData(false); // Marcar la carga de datos como completa
      }
    };
    handleUserAuthentication();
  }, [dataComplete, isAuthenticated]);


  // Si los datos aún se están cargando, muestra un mensaje de carga
  if (loadingData) {
    return <h1>Cargando...</h1>;
  }
  //console.log(dataComplete);
  // Comprobación de userRole y autenticación

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
