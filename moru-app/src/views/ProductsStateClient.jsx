import { useEffect, useState } from "react"
import {
  getBranchOrders,
  getHistoryOfOrderedProducts,
} from "../services/services"
import { GetLocalStorage } from "../localStorage/GetLocalStorage"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
import { setProductsOrderedToStore } from "../redux/productsOrderedSlice"
import {
  cleanProductsOrderedFilteredFromStore,
  setProductsOrderedFilteredToStore,
} from "../redux/productsOrderedFilteredSlice"
import Swal from "sweetalert2"
import { useLocation } from "react-router-dom"

const ProductsStateClient = () => {
  const currentUser = GetLocalStorage()

  const productsOrderedFromStore = useSelector((state) => state.productsOrdered)
  const productsOrderedFilteredFromStore = useSelector(
    (state) => state.productsOrderedFiltered
  )

  
  const dispatch = useDispatch()
  const location = useLocation()
  
  const idBranch = location.search.slice(1)

  const [selectedState, setSelectedState] = useState("Todos")

 /*  switch (productsOrderedFilteredFromStore.length === 0) {
    case selectedState === 'Pendiente':
      setSelectedState('Enviado')
      break

    case selectedState === 'Enviado':
      setSelectedState('Finalizado')
      break
  } */
  

  
  //console.log(idBranch);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateStore = async () => {
    if (idBranch.length) {
      const response = await getBranchOrders(idBranch)
      console.log('getBranchOrdersResponse', response)
      response?.forEach((product) =>
        dispatch(setProductsOrderedToStore(product))
      )
      
    } else {
      const response = await getHistoryOfOrderedProducts(currentUser.id) // user client
      console.log(response)
      response?.forEach((product) =>
        dispatch(setProductsOrderedToStore(product))
      )
    }
  }

  useEffect(() => {
    updateStore()
    window.scrollTo(0, 0)

    if (selectedState === 'Pendiente' && productsOrderedFilteredFromStore.length === 0 ) {
      setSelectedState('Todos')
    }
  
    if (selectedState === 'Enviado' && productsOrderedFilteredFromStore.length === 0 ) {
      setSelectedState('Todos')
    }
  }, [dispatch, productsOrderedFilteredFromStore])

  const handleTodosButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    setSelectedState("Todos")
    dispatch(cleanProductsOrderedFilteredFromStore())
  }

  const handlePendienteButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const pendingsProducts = productsOrderedFromStore.filter(
      (product) => product.status === "pending"
    )
    pendingsProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(pendingsProducts)),
        setSelectedState("Pendiente"))
      : Swal.fire("Oops...", "No hay productos pendientes", "info")
  }

  const handleEnviadoButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const sentProducts = productsOrderedFromStore.filter(
      (product) => product.status === "send"
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
          onClick={handlePendienteButton}
          className={`border-r pr-2 ${
            selectedState === "Pendiente" && "font-bold"
          }`}>
          Pendiente
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
