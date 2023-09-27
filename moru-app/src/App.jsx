import Home from "./views/Home"
import Landing from "./views/Landing"
import Login from "./views/Login.jsx"
import "./index.css"
import RegisterUser from "./views/RegisterUser.jsx"
import RegisterShop from "./views/RegisterShop.jsx"
import { Route, Routes, useLocation } from "react-router-dom"

function App() {
  const {pathname} = useLocation();

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registeruser" element={<RegisterUser />}></Route>
        <Route path="/registershop" element={<RegisterShop />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>

  )
}

export default App
