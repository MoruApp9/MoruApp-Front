import { useEffect, useState } from "react"
import {
  getBranchOrders,
  getHistoryOfOrderedProducts,
} from "../../services/services"
import { GetLocalStorage } from "../../localStorage/GetLocalStorage"
import { useDispatch, useSelector } from "react-redux"
import Product from "../../components/ProductComponents/Product"
import { cleanProductsOrderedFromStore, setProductsOrderedToStore } from "../../redux/productsOrderedSlice"
import {
  cleanProductsOrderedFilteredFromStore,
  setProductsOrderedFilteredToStore,
} from "../../redux/productsOrderedFilteredSlice"
import Swal from "sweetalert2"
import { useLocation } from "react-router-dom"
import { cleanProductsFiltered } from "../../redux/productsFilteredSlice"

const ProductsStateClient = () => {
  const currentUser = GetLocalStorage()

  const productsOrderedFromStore = useSelector((state) => state.productsOrdered)
  const productsOrderedFilteredFromStore = useSelector(
    (state) => state.productsOrderedFiltered
  )
  const [ selectedState, setSelectedState ] = useState("Todos")

  const dispatch = useDispatch()
  const location = useLocation()
  
  const idBranch = location.search.slice(1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateStore = async () => {
    if (idBranch.length) {
      const response = await getBranchOrders(idBranch)
      dispatch(setProductsOrderedToStore(response))
      /* response?.forEach((product) =>
        dispatch(setProductsOrderedToStore(product))
      ) */
      
    } else {
      const response = await getHistoryOfOrderedProducts(currentUser.id) // user client

      dispatch(setProductsOrderedToStore(response))
      /* response?.forEach((product) =>
        dispatch(setProductsOrderedToStore(product))
      ) */
    }
  }
  
  useEffect(() => {
    updateStore()
    //window.scrollTo(0, 0)

    if (selectedState === 'recibido' && productsOrderedFilteredFromStore.length === 0 ) {
      setSelectedState('Todos')
    }
  
    if (selectedState === 'Enviado' && productsOrderedFilteredFromStore.length === 0 ) {
      setSelectedState('Todos')
    }
    return () => {
       dispatch(cleanProductsOrderedFilteredFromStore());
       dispatch(cleanProductsOrderedFromStore())
    }
  }, [])

  const handleTodosButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    setSelectedState("Todos")
    dispatch(cleanProductsOrderedFilteredFromStore())
  }

  const handleRecibidoButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const receivedProducts = productsOrderedFromStore.filter(
      (product) => product.status === "recibido"
    )
    receivedProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(receivedProducts)),
        setSelectedState("Recibido"))
      : Swal.fire("Oops...", "No hay productos Recibidos", "info")
  }
  const handlePreparandoButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const receivedProducts = productsOrderedFromStore.filter(
      (product) => product.status === "preparando"
    )
    receivedProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(receivedProducts)),
        setSelectedState("Preparando"))
      : Swal.fire("Oops...", "No hay productos Recibidos", "info")
  }

  const handleEnviadoButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const sentProducts = productsOrderedFromStore.filter(
      (product) => product.status === "enviado"
    )
    sentProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(sentProducts)),
        setSelectedState("Enviado"))
      : Swal.fire("Oops...", "No hay productos enviados", "info")
  }

  const handleFinalizadoButton = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const finishedProducts = productsOrderedFromStore.filter(
      (product) => product.status === "finish"
    )
    finishedProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(finishedProducts)),
        setSelectedState("Finalizado"))
      : Swal.fire("Oops...", "No hay productos finalizados", "info")
  }

  return (
    <section className="min-h-screen flex flex-col ">
      <div className=" bg-white flex justify-center mx-auto w-fit my-6 space-x-4 p-4 font-roboto-slab border rounded-full sticky top-24 ">
        <button
          onClick={handleTodosButton}
          className={`border-r pr-2 ${
            selectedState === "Todos" && "font-bold"
          }`}>
          Todos
        </button>
        <button
          onClick={handleRecibidoButton}
          className={`border-r pr-2 ${
            selectedState === "recibido" && "font-bold"
          }`}>
          Recibido
        </button>
        <button
          onClick={handlePreparandoButton}
          className={`border-r pr-2 ${
            selectedState === "preparando" && "font-bold"
          }`}>
          Preparando
        </button>
        <button
          onClick={handleEnviadoButton}
          className={`border-r pr-2 ${
            selectedState === "Enviado" && "font-bold"
          }`}>
          Enviado
        </button>
        <button
          onClick={handleFinalizadoButton}
          className={`${selectedState === "Finalizado" && "font-bold"}`}>
          Finalizado
        </button>
      </div>

      {productsOrderedFilteredFromStore.length > 0 ? (
        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {productsOrderedFilteredFromStore?.map((product) => (
            <Product key={product.orderId} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {productsOrderedFromStore?.map((product) => (
            <Product key={product.orderId} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsStateClient
