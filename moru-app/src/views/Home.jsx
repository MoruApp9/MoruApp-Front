import { useSelector } from "react-redux"
import Advertising from "../components/Advertising"
import AllProducts from "../components/AllProducts"
import Filters from "../components/Filters"
import Categories from '../components/Categories';
import { useAuth0 } from '@auth0/auth0-react';
import { postAdmincommerceRegister, postClientRegister, getUser } from "../services/services";
import GetLocalStorage from '../localStorage/GetLocalStorage';
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered)
  // console.log("estado", productsFiltered)
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const dataComplete = {...GetLocalStorage(), ...user};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


      
  const handleUserAuthentication =  async() => {
    if (dataComplete.userRole && dataComplete.email) {
        if (dataComplete.userRole === "buyer") {
          postClientRegister(dataComplete);
        }else{
          postAdmincommerceRegister(dataComplete);
        }
    }else if(isAuthenticated){
      try {
        setLoading(true);
        console.log(loading);
        await getUser(dataComplete.email);
         
        GetLocalStorage();
        
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
      
    }
  }
  handleUserAuthentication();
  //console.log(loading);

  useEffect(() => {

 }, []);

  return !isAuthenticated || isAuthenticated && GetLocalStorage() 
  ? (
      <div>
        {!productsFiltered.length && <Advertising />}
        {!productsFiltered.length && <Categories/>}
        {!productsFiltered.length && <AllProducts />}
        {productsFiltered.length && <Filters />}
      </div>
    ) 
    :loading ? (
      <ErrorMessage/>
    ) 
    : isAuthenticated && GetLocalStorage() === null(
      navigate("/registration")
    )
}

//   return loading ? (
//     <ErrorMessage/>)
//     :!isAuthenticated||isAuthenticated && GetLocalStorage() ?
//       (
//         <div>
//         {!productsFiltered.length && <Advertising />}
//         {!productsFiltered.length && <Categories/>}
//         {!productsFiltered.length && <AllProducts />}
//         {productsFiltered.length && <Filters />}
//       </div>
//       )
//   : (
//     navigate("/registration")
//   )
// }

export default Home




// if (GetLocalStorage()) {
  //   if (dataComplete.userRole && dataComplete.email) {
  //     if (dataComplete.userRole === "buyer") {
  //       postClientRegister(dataComplete);
  //     }else{
  //       postAdmincommerceRegister(dataComplete);
  //     }
  //   }
  // }else {
  //   getUser(dataComplete.email);
  //   GetLocalStorage();

  //peticion de verificacion si existe el usuario o no---->acceso
    //localStorage ---home  ---no existe
  //}
