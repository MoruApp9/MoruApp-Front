import { useSelector } from "react-redux"
import Advertising from "../components/Advertising"
import AllProducts from "../components/AllProducts"
import Filters from "../components/Filters"

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered)
  console.log("estado", productsFiltered)

  return (
    <div>
      {!productsFiltered.length && <Advertising />}
      {!productsFiltered.length && <AllProducts />}
      {productsFiltered.length && <Filters />}
    </div>
  )
}

export default Home
