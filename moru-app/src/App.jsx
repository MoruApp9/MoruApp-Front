import Home from "./views/Home"
import Landing from "./views/Landing"
import { Route, Routes, useLocation } from "react-router-dom"

function App() {
  const {pathname} = useLocation();

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>

  )
}

export default App
