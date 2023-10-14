import { useEffect } from "react"
import { getHistoryOfOrderedProducts } from "../services/services"
import { GetLocalStorage } from "../localStorage/GetLocalStorage"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
import { setProductsOrderedToStore } from "../redux/productsOrderedSlice"
import { cleanProductsOrderedFilteredFromStore, setProductsOrderedFilteredToStore } from "../redux/productsOrderedFilteredSlice"

const ProductsStateClient = () => {
  const currentUser = GetLocalStorage()
  const productsOrderedFromStore = useSelector((state) => state.productsOrdered)
  const productsOrderedFilteredFromStore = useSelector(
    (state) => state.productsOrderedFiltered
  )
  const dispatch = useDispatch()

  const updateStore = async () => {
    const response = await getHistoryOfOrderedProducts(currentUser.id)
    console.log(response)
    response?.forEach((product) => dispatch(setProductsOrderedToStore(product)))
  }

  useEffect(() => {
    updateStore()
  }, [dispatch])

  const handleTodosButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    
    dispatch(cleanProductsOrderedFilteredFromStore())
  }

  const handlePendienteButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const pendingsProducts = productsOrderedFromStore.filter(
      (product) => product.status === "pending"
    )
    pendingsProducts.length
      ? dispatch(setProductsOrderedFilteredToStore(pendingsProducts))
      : window.alert("No hay productos pendientes")
  }

  const handleEnviadoButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const sentProducts = productsOrderedFromStore.filter(product => product.status === "send")
    sentProducts.length
      ? dispatch(setProductsOrderedFilteredToStore(sentProducts))
      : window.alert("No hay productos enviados")
  }

  const handleFinalizadoButton = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const finishedProducts = productsOrderedFromStore.filter(product => product.status === "finish")
    finishedProducts.length
      ? dispatch(setProductsOrderedFilteredToStore(finishedProducts))
      : window.alert("No hay productos finalizados")
  }

  return (
    <section className="flex flex-col ">
      <div className=" bg-white flex justify-center mx-auto w-fit my-6 space-x-4 p-4 font-roboto-slab border rounded-full sticky top-24 ">
        <button onClick={handleTodosButton} className="border-r font-bold pr-2">Todos</button>
        <button onClick={handlePendienteButton} className="border-r pr-2">
          Pendiente
        </button>
        <button onClick={handleEnviadoButton} className="border-r pr-2">
          Enviado
        </button>
        <button onClick={handleFinalizadoButton}>Finalizado</button>
      </div>

      {productsOrderedFilteredFromStore.length > 0 ? (
        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {productsOrderedFilteredFromStore?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {productsOrderedFromStore?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsStateClient