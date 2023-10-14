/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { addToCart, removefromCart, uploadQuantity } from "../redux/cartSlice"
import Swal from "sweetalert2"

import {
  postFavorites,
  deleteFavorite,
  postChart,
  removeChart,
  deleteAllQuantityOfProductFromCart,
  postOneQuantityOfProduct,
  getProducts,
} from "../services/services"

import { FiHeart } from "react-icons/fi"
import { AiOutlinePlus } from "react-icons/ai"
import { AiOutlineMinus } from "react-icons/ai"
import { BsTrash3Fill } from "react-icons/bs"

import { GetLocalStorage } from "../localStorage/GetLocalStorage"

import { useAuth0 } from "@auth0/auth0-react"

const Product = ({ product }) => {
  const productId = product.id

  const dispatch = useDispatch()
  const location = useLocation()
  const [isFav, setIsFav] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const loadedUser = useSelector((state) => state.user)
  const favorites = useSelector((state) => state.favorites)
  const cartStore = useSelector((state) => state.cart.cart)

  const { isAuthenticated, user } = useAuth0()

  const currentUser = GetLocalStorage()

  const carritoView = location.pathname === "/carrito-de-compras"

  const index = cartStore.findIndex((product) => product.id === productId)

  useEffect(() => {
    if (user) {
      if (cartStore.length) {
        cartStore.forEach(
          (product) => product.id === productId && setAddedToCart(true)
        )
      }
      if (favorites.length) {
        favorites.forEach((fav) => fav.id === productId && setIsFav(true))
      }
    }
  }, [dispatch, isAuthenticated, user, loadedUser, favorites, cartStore])

  const handleFavorite = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (user) {
      const userUpdate = GetLocalStorage()
      // si el user está logged
      if (isFav) {
        setIsFav(false) //que deje de ser fav
        dispatch(deleteFavorite(userUpdate.id, productId)) // se elimina el fav y se actualiza el estado global de favs para renderizar
      } else {// si no es fav
        setIsFav(true) // se vuelve fav
        console.log(userUpdate)
        dispatch(postFavorites(userUpdate.id, productId)) // Se postea en la base de datos como fav y se actualiza el estado global
      }
    } else
      Swal.fire(
        "Oops...",
        "Inicia sesión o regístrate para guardar tus favoritos",
        "warning"
      ) // si no está logged
  }

  const handleAddToCart = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const quantity = 1
    if (user) {
      const userUpdate = GetLocalStorage()
      const response = await postChart(userUpdate?.id, productId, quantity) // esto me debería devolver el objeto guardado, no un array con objetos repetidos
      dispatch(addToCart(response))
      setAddedToCart(true)
      dispatch(getProducts())
    } else
      Swal.fire(
        "Oops...",
        "Inicia sesión o regístrate para guardar tu carrito de compras",
        "warning"
      )
  }

  const handleDeleteToCart = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const response = await removeChart(currentUser?.id, productId)
    setAddedToCart(false)

    if (response.quantity > 0) {
      dispatch(uploadQuantity(response))
    } else dispatch(removefromCart(product))

    dispatch(getProducts())
  }

  const handleTrashButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    await deleteAllQuantityOfProductFromCart(
      currentUser.id,
      productId,
      cartStore[index].quantity
    )
    dispatch(removefromCart(product))
    dispatch(getProducts())
  }

  const handlePlusButton = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const response = await postOneQuantityOfProduct(currentUser.id, productId)

    if (response.allProductsInChart !== undefined) {
      const productUpdated = response.allProductsInChart.find(
        (product) => product.productId === productId
      )
      dispatch(uploadQuantity(productUpdated))
      dispatch(getProducts())
    } else Swal.fire("No hay stock", response.message, "info")
  }

  return (
    <Link to={`/producto/${productId}`}>
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 font-roboto-slab">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        <div className="flex items-center justify-end px-4 pt-2">
          {//FAV BUTTON: se muestra si el usuario NO está autenticado (cualquier usuario) o es usuario comprador
            currentUser?.userRole !== "adminCommerce" && (
              <button className="text-gray-500" onClick={handleFavorite}>
                <FiHeart className={`text-purple-moru ${isFav ? "fill-current" : "stroke-current"}`}/>
              </button>
            )
          }
        </div>

        <div className="px-4 pb-2">
          <h2 className="text-base font-semibold overflow-hidden overflow-ellipsis line-clamp-2 h-12">{product.name}</h2>
          <p className="text-gray-500">${product.price}</p>
        </div>

        {!carritoView ? (
          <div className="flex items-center justify-center py-2">
            {currentUser?.userRole !== "adminCommerce" &&
              (addedToCart ? (
                <button
                  className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full"
                  onClick={handleDeleteToCart}>
                  Eliminar
                </button>
              ) : (
                <button
                  className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full"
                  onClick={handleAddToCart}>
                  Agregar al carrito
                </button>
              ))}
          </div>
        ) : (
          <div className=" flex justify-between items-center ml-8 mr-8 mb-4">
            <button
              onClick={handleTrashButton}
              className="text-purple-moru text-2xl">
              <BsTrash3Fill />
            </button>

            <div className="flex items-center border-[1.5px] border-purple-moru rounded-full ">
              <button
                onClick={handleDeleteToCart}
                className="bg-purple-moru rounded-tl-full  rounded-tr-full rounded-bl-full pl-1 pr-1 text-white text-2xl">
                <AiOutlineMinus />
              </button>

              <span className="ml-3 mr-3">{cartStore[index].quantity}</span>
              
              <button
                onClick={handlePlusButton}
                className="bg-purple-moru rounded-tr-full  rounded-br-full rounded-bl-full pr-1 pl-1 text-white text-2xl">
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Product
