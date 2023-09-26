import Home from "./views/Home"
import Acceso from "./views/Acceso"
import { Route, Routes, useLocation } from "react-router-dom"

function App() {
  const {pathname} = useLocation();

  return (
    <div>
      <h1>Moru App</h1>
      <Routes>
        
      </Routes>
    </div>

  )
}

export default App
