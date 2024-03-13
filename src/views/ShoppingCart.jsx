import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeAllFromCart } from "../redux/cartSlice" // Asegúrate de importar la acción adecuada
import Product from "../components/ProductComponents/Product"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { GetLocalStorage } from "../localStorage/GetLocalStorage"
import { useAuth0 } from "@auth0/auth0-react"
import { deleteAllCart, getChart, postBuy } from "../services/services"
import Swal from "sweetalert2"

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth0()

  useEffect(() => {
    //window.scrollTo(0, 0)
  }, [dispatch, user, cartItems])

  const total = cartItems.reduce((accumulator, product) => {
    return accumulator + parseFloat(product?.price)
  }, 0)

  const comprarButton = (event) => {
    const userData = GetLocalStorage()

    event.stopPropagation()
    event.preventDefault()

    Swal.fire({
      title: "Confirmación",
      text: "¿Deseas confirmar el pedido?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
      confirmButtonColor: "#280a50",
    }).then(async(response) => {
      if (response.isConfirmed) {
        Swal.fire(
          "Pedido realizado",
          "En breve se comunicarán contigo",
          "success"
        )
        await postBuy(userData.id)

        dispatch(removeAllFromCart()) // store
        navigate('/estado-productos')
      }
    })
  }

  const handleRemoveAllFromCart = () => {
    const userData = GetLocalStorage()

    Swal.fire({
      title: "Advertencia",
      text: "¿Deseas vaciar el carrito?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
      confirmButtonColor: "#280a50",
    }).then((response) => {
      if (response.isConfirmed) {
        Swal.fire("Éxito", "Se vació el carrito correctamente", "success")
        deleteAllCart(userData.id)
        dispatch(removeAllFromCart())
      } else if (response.isDenied) {
        Swal.fire("Información", "No se eliminaron tus productos", "info")
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col mx-4">
      {total === 0 ? (
        <div>
          <h1 className="text-4xl text-center text-purple-moru m-8">
            {" "}
            Tu carrito está vacío{" "}
          </h1>
          <Link to={"/"}>
            {" "}
            <h2 className="text-4xl font-bold text-center text-purple-moru-dark m-8">
                Ver tiendas
            </h2>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-center text-purple-moru-dark mt-8">
            {" "}
            ¡Este es tu carrito!{" "}
          </h1>
          <div className="flex flex-row items-center justify-center">
            {/* <h3 className="text-2xl text-purple-moru text-center m-8">{`Total del carrito: $${total}`}</h3> */}
            <button
              className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru mt-3 font-bold py-2 px-4  rounded-xl transition-all duration-300 ease-in-out"
              onClick={handleRemoveAllFromCart}>
              Vaciar carrito
            </button>
          </div>
        </div>
      )}

      <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cartItems.map((product) => (
          <Product key={product?.id} product={product} />
        ))}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={comprarButton}
          className="sticky bottom-6 w-15 mx-auto mt-6 bg-purple-moru text-white hover:bg-white hover:text-purple-moru  font-bold py-3 px-8 rounded-full border-[1.6px] border-white text-lg transition-all duration-300 ease-in-out">
          Comprar
        </button>
      )}
    </div>
  )
}

export default ShoppingCart
