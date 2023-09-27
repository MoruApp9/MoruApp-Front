import Home from "./views/Home"
import Landing from "./views/Landing"
import Login from "./views/Login.jsx"
import "./index.css"
import RegisterUser from "./views/RegisterUser.jsx"
import RegisterShop from "./views/RegisterShop.jsx"
import Nav from "./components/nav"
import CreateCount from "./views/CreateCount"
import { Route, Routes, useLocation } from "react-router-dom"

function App() {
  const { pathname } = useLocation()

  return (
    <div>
      {
        pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/registeruser" &&
        pathname !== "/registershop" &&
        pathname !== '/createcount' &&
        <Nav />
      }

      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registeruser" element={<RegisterUser />}></Route>
        <Route path="/registershop" element={<RegisterShop />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/createcount" element={<CreateCount/>}/>
      </Routes>
    </div>
  )
}

export default App
