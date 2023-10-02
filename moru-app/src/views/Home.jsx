import { useSelector } from "react-redux"
import Advertising from "../components/Advertising"
import AllProducts from "../components/AllProducts"
import Filters from "../components/Filters"
import Categories from '../components/Categories';
import { useAuth0 } from '@auth0/auth0-react';
import { postAdmincommerceRegister, postClientRegister } from "../services/services";
import GetLocalStorage from '../localStorage/GetLocalStorage';

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered)
  // console.log("estado", productsFiltered)
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const dataComplete = {...GetLocalStorage(), ...user};
  
  if (Object.keys(GetLocalStorage()).length > 0) {
    if (dataComplete.userRole && dataComplete.email) {
      if (dataComplete.userRole === "buyer") {
        postClientRegister(dataComplete);
      }else{
        postAdmincommerceRegister(dataComplete);
      }
    }
  }else {
    getUser(dataComplete.email);
    GetLocalStorage();
    
    //peticion de verificacion si existe el usuario o no---->acceso
    //localStorage ---home  ---no existe

  }

  return (
    user && !dataComplete.userRole ? 
      (<div>
        <h1>Tienes que registrate</h1>
      </div>
      ) : (
        <div>
        {!productsFiltered.length && <Advertising />}
        {!productsFiltered.length && <Categories/>}
        {!productsFiltered.length && <AllProducts />}
        {productsFiltered.length && <Filters />}
      </div>
      )
    
  )
}

export default Home
