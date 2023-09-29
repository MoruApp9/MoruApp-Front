import { useSelector, useDispatch } from "react-redux"
import { removefromCart } from '../redux/cartSlice'

const ShoppingCart = () => {
  const cartItems = useSelector(state => state.cart.cart)
  const total = cartItems.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);
  
  console.log(`Total del carrito: ${total}`);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{`Total del carrito: ${total}`}</span>
      {
        cartItems.map(item => {
          return(
            <div className="d-flex">
              <img src={item.image} alt="" />
              <div>
                <h4>{item.name}</h4>
                <button onClick={() => dispatch(removefromCart({id: item.id}))}>Eliminar</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ShoppingCart