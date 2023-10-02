import { useSelector, useDispatch } from "react-redux"
import { removefromCart } from "../redux/cartSlice"
import Product from "../components/Product"

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.cart)
  const total = cartItems.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.price)
  }, 0)

  const dispatch = useDispatch()

  return (
    <section className="flex flex-col  mx-4">
      <h1 className="text-4xl font-bold text-center text-blue-500 m-8">
        ¡Este es tu carrito!
      </h1>
      <span className="m-2">{`Total del carrito: ${total}`}</span>
      {cartItems.map((item) => {
        return (
          <div className="mb-5" key={item.id}>
            <Product product={item} />
          </div>
        )
      })}
    </section>
  )
}

export default ShoppingCart
