import { useSelector } from "react-redux"
import Advertising from "../components/Advertising"
import AllProducts from "../components/AllProducts"
import Filters from "../components/Filters"
import Categories from "../components/Categories"

const Home = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered)
  // console.log("estado", productsFiltered)

  return (
    <div>
      {!productsFiltered.length && <Advertising />}
      {!productsFiltered.length && <Categories />}
      {!productsFiltered.length && <AllProducts />}
      {productsFiltered.length && <Filters />}
      </div>
  )
}

export default Home
