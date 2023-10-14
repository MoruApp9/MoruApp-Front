import { useEffect } from "react"
import { getHistoryOfOrderedProducts } from "../services/services"
import { GetLocalStorage } from "../localStorage/GetLocalStorage"
import { useDispatch, useSelector } from "react-redux"
import { setProductsState } from "../redux/productsStateSlice"
import Product from "../components/Product"

const ProductsStateClient = () => {
  const currentUser = GetLocalStorage()
  const productsStateStore = useSelector((state) => state.productsState)
  const dispatch = useDispatch()

  const updateStore = async () => {
    const response = await getHistoryOfOrderedProducts(currentUser.id)
    console.log(response)
    response?.forEach(product => dispatch(setProductsState(product)))
  }

  useEffect(() => {
    updateStore()
  }, [dispatch, productsStateStore])

  return (
    <section className="flex flex-col ">
      <div className=" bg-white flex justify-center mx-auto w-fit my-6 space-x-4 p-4 font-roboto-slab border rounded-full sticky top-24 ">
        <button className="border-r font-bold pr-2">Todos</button>
        <button className="border-r pr-2">Pendiente</button>
        <button className="border-r pr-2">Enviado</button>
        <button>Finalizado</button>
      </div>

      <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"> 
        {productsStateStore?.map(product => (
          <Product key={product.id} product={product}/>
        ))}
      </div>
    </section>
  )
}

export default ProductsStateClient
