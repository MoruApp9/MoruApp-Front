import { useSelector, useDispatch } from "react-redux"
import { removeAllFromCart } from "../redux/cartSlice"  // Asegúrate de importar la acción adecuada
import Product from "../components/Product"
import { Link } from "react-router-dom"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cart)
  const total = cartItems.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.price)
  }, 0)

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart())  
  }

  return (
    <section className="flex flex-col mx-4">
      {total === 0 
        ? (<div>
            <h1 className="text-4xl text-center text-purple-moru m-8"> Tu carrito está vacío </h1>
            <Link to={'/'}> <h2 className="text-4xl font-bold text-center text-purple-moru-dark m-8">Agregar productos</h2></Link>
          </div>)
        : (
          <div>
            <h1 className="text-4xl font-bold text-center text-purple-moru-dark mt-8"> ¡Este es tu carrito! </h1>
            <div className="flex flex-row items-center justify-center">
            <h3 className="text-2xl text-purple-moru text-center m-8">{`Total del carrito: $${total}`}</h3>
            <button
              className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru  font-bold py-2 px-4 rounded"
              onClick={handleRemoveAllFromCart}
            >
              Vaciar carrito
            </button>
            </div>
          </div>
      )}

      <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cartItems.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ShoppingCart
