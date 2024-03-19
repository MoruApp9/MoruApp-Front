import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./services/services";
import { cleanErrors } from "./redux/errorsSlice";
import { useAuth0 } from "@auth0/auth0-react";

import { GetLocalStorage } from "./localStorage/GetLocalStorage";

import "./index.css";

import Home from "./views/DesignViews/Home.jsx";
import Landing from "./views/Landing";
import Login from "./views/LogViews/Login.jsx";
import RegisterUser from "./views/LogViews/RegisterUser.jsx";
import RegisterShop from "./views/ShopViews/RegisterShop.jsx";
import Nav from "./components/DesignComponents/Nav.jsx";
import ShoppingCart from "./views/ShopViews/ShoppingCart.jsx";
import FAQ from "./components/FAQ";
import Registration from "./components/LogComponents/Registration";
import ProductDetail from "./views/Detail";
import Favorites from "./views/Favorites";
import CategoryView from "./views/CategoryViews/CategoryView.jsx";
import PostProduct from "./views/ProductViews/PostProduct.jsx";
import Account from "./views/UserViews/Account.jsx";
import RegisterTypeOfShop from "./views/ShopViews/RegisterTypeOfShop";
import CrearSede from "./views/CrearSucursal";
import SearchByLocation from "./views/SearchByLocation";
import Dashboard from "./views/DesignViews/Dashboard.jsx";
import ProductsStateClient from "./views/ProductViews/ProductsStateClient.jsx";
import Footer from "./components/FooterComponents/Footer.jsx";
import PoliciesPrivacy from "././views/LegalDocument/PoliciesPrivacy.jsx";
import TermsConditions from "././views/LegalDocument/TermsConditions.jsx";
import OrderDetail from "./views/OrderViews/OrderDetail.jsx";
import EditProductForm from "./views/ProductViews/EditProductForm.jsx";
import Commerce from "./components/CommerceComponents/Commerce.jsx";


function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errors);
  const productsStore = useSelector((state) => state.allProducts.allProducts);
  const { user } = useAuth0();

  useEffect(() => {
    GetLocalStorage();
    if (error.length) {
      dispatch(cleanErrors());
      window.alert(error);
    }
  }, [dispatch, productsStore]);

  return (
    <div>
      {pathname !== "/login" &&
        pathname !== "/registeruser" &&
        pathname !== "/registershop" &&
        GetLocalStorage()?.userRole !== "SuperAdmin" && <Nav user={user} />}
      {/* {pathname === "/" && GetLocalStorage()?.userRole !== "SuperAdmin" && (
        <div className="md:hidden">
          <SearchBar />
        </div>
      )} */}

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/registeruser" element={<RegisterUser />}></Route>
        <Route path="/registershop" element={<RegisterShop />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/carrito-de-compras" element={<ShoppingCart />} />
        <Route path="/support" element={<FAQ />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/product/edit/:productId" element={<EditProductForm />} />
        <Route path="/products/:id" element={<CategoryView />} />
        <Route path="/fav" element={<Favorites />} />
        <Route path="/publicar-producto" element={<PostProduct />} />
        <Route path="/tienda/:id" element={<Commerce/>} />
        <Route path="/cuenta" element={<Account />} />
        <Route path="/registrar-empresa" element={<RegisterTypeOfShop />} />
        <Route path="/crearSucursal" element={<CrearSede />} />
        <Route path="/mapa" element={<SearchByLocation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estado-productos" element={<ProductsStateClient />} />
        <Route path="/politicas-privacidad" element={<PoliciesPrivacy />} />
        <Route path="/terminos-condiciones" element={<TermsConditions />} />
        <Route path="/account" element={<Account />} />
        <Route path="/detalle-pedido" element={<OrderDetail />} />
      </Routes>

      {<Footer />}
    </div>
  );
}

export default App;
