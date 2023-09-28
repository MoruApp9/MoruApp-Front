import Home from "./views/Home"
import Landing from "./views/Landing"
import Login from "./views/Login.jsx"
import "./index.css"
import RegisterUser from "./views/RegisterUser.jsx"
import RegisterShop from "./views/RegisterShop.jsx"
import Nav from "./components/Nav"
import ShoppingCart from "./views/ShoppingCart"
import { Route, Routes, useLocation } from "react-router-dom"

function App() {
  const { pathname } = useLocation()

  return (
    <div>
      {
        pathname !== "/login" &&
        pathname !== "/registeruser" &&
        pathname !== "/registershop" &&
        <Nav />
      }

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registeruser" element={<RegisterUser />}></Route>
        <Route path="/registershop" element={<RegisterShop />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/carrito-de-compras" element={<ShoppingCart/>}/>
      </Routes>
    </div>
  )
}

export default App
