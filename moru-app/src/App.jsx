import Home from "./views/Home"
import Landing from "./views/Landing"
import Login from "./views/Login.jsx"
import "./index.css"
import RegisterUser from "./views/RegisterUser.jsx"
import RegisterShop from "./views/RegisterShop.jsx"
import Nav from "./components/Nav"
import ShoppingCart from "./views/ShoppingCart"
import { Route, Routes, useLocation } from "react-router-dom"
import FAQ from "./components/FAQ"
import SearchBar from "./components/searchbar"
import ProductDetail from './views/Detail'
import Favorites from './views/Favorites'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProducts } from './services/services'; 
import publishProduct from "./views/publishProduct"


function App() {
  const { pathname } = useLocation()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      {
        pathname !== "/login" &&
        pathname !== "/registeruser" &&
        pathname !== "/registershop" &&
        pathname !== "/landing" &&
        <Nav />
      }
      {
        pathname !== "/login" &&
        pathname !== "/registeruser" &&
        pathname !== "/registershop" &&
        pathname !== "/support" &&
        <SearchBar/>
      }

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registeruser" element={<RegisterUser />}></Route>
        <Route path="/registershop" element={<RegisterShop />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/carrito-de-compras" element={<ShoppingCart/>}/>
        <Route path="/support" element={<FAQ/>}/>
        <Route path="/producto/:id" element={<ProductDetail/>} />
        <Route path="/fav" element={<Favorites/>} />
        <Route path="/publicar-producto" element={<publishProduct/>} />
      </Routes>
    </div>
  )
}

export default App
