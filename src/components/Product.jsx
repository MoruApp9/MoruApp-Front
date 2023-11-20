/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"

import { addToCart, removefromCart, uploadQuantity } from "../redux/cartSlice"

import {
  postFavorites,
  deleteFavorite,
  postChart,
  removeChart,
  deleteAllQuantityOfProductFromCart,
  postOneQuantityOfProduct,
  getProducts,
  putOrderStatus,
} from "../services/services"

import { FiHeart } from "react-icons/fi"
import { AiOutlinePlus } from "react-icons/ai"
import { AiOutlineMinus } from "react-icons/ai"
import { BsTrash3Fill } from "react-icons/bs"
import { BiSend } from "react-icons/bi"
import { IoMdDoneAll } from "react-icons/io"

import Swal from "sweetalert2"

import { GetLocalStorage } from "../localStorage/GetLocalStorage"
import { updateStatus } from "../redux/productsOrderedSlice"
import { updateStatusFiltered } from "../redux/productsOrderedFilteredSlice"

const Product = ({ product }) => {
  const productId = product.id

  console.log('product', product);

  const dispatch = useDispatch()
  const location = useLocation()
  const [isFav, setIsFav] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const loadedUser = useSelector((state) => state.user)
  const favorites = useSelector((state) => state.favorites)
  const cartStore = useSelector((state) => state.cart.cart)
  const productsOrdered = useSelector((state) => state.productsOrdered)

  const { isAuthenticated, user } = useAuth0()

  const currentUser = GetLocalStorage()
  const currentProductState = productsOrdered.find(
    (product) => product.id === productId
  )

  const carritoView = location.pathname === "/carrito-de-compras"
  const productStateView = location.pathname === "/estado-productos"

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
      } else {
        // si no es fav
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
      dispatch(addToCart(response)) // store
      setAddedToCart(true)
      dispatch(getProducts()) // endpoint
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

  const changePendingStatusToSend = () => {
    Swal.fire({
      title: "Confirmación",
      text: "¿Deseas enviar el pedido?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
      confirmButtonColor: "#280a50",
    }).then(async (response) => {
      if (response.isConfirmed) {
        try {
          const response = await putOrderStatus(
            currentProductState.orderId,
            "send"
          )
          if (response.status === 200) {
            Swal.fire("Pedido enviado", response.data.message, "success")
            dispatch(
              updateStatus({
                productId: currentProductState.id,
                status: response.data.order.status,
              })
            )
            dispatch(updateStatusFiltered(currentProductState.id))
          }
        } catch (error) {
          Swal.fire("Oops", "Hubo un problema", "info")
        }
      }
    })
  }

  const changeSendStatusToFinish = () => {
    Swal.fire({
      title: "Confirmación",
      text: "¿Deseas finalizar el pedido?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
      confirmButtonColor: "#280a50",
    }).then(async (response) => {
      if (response.isConfirmed) {
        try {
          const response = await putOrderStatus(
            currentProductState.orderId,
            "finish"
          )
          if (response.status === 200) {
            Swal.fire("Pedido enviado", response.data.message, "success")
            dispatch(
              updateStatus({
                productId: currentProductState.id,
                status: response.data.order.status,
              })
            )
            dispatch(updateStatusFiltered(currentProductState.id))
          }
          Swal.fire("Pedido finalizado", response.data.message, "success")
        } catch (error) {
          Swal.fire("Oops", "Hubo un problema", "info")
        }
      }
    })
  }

  const changeStatusToPending = async () => {
    // comentar esta función
    const response = await putOrderStatus(
      currentProductState.orderId,
      "pending"
    )
  }

  const changeStatusButton = () => {
    switch (product?.status) {
      case "pending":
        return (
          <button
            onClick={changePendingStatusToSend}
            className=" flex mx-auto mb-6 items-center space-x-2 text-purple-moru font-bold p-2 px-3  border-2 border-purple-moru rounded-full ">
            <BiSend />
            <span>Enviar</span>
          </button>
        )

      case "send":
        return (
          <button
            onClick={changeSendStatusToFinish}
            className=" flex mx-auto mb-6 items-center space-x-2 text-purple-moru font-bold p-2 px-3  border-2 border-purple-moru rounded-full ">
            <IoMdDoneAll className="text-xl" />
            <span>Finalizar</span>
          </button>
        )

      /* case 'finish': 
        return (
          <button onClick={changeStatusToPending}>
            <span> enviar a pendiente</span>
          </button>
        ) */
    }
  }

  const translateState = () => {
    switch (
      product?.status // product?.status
    ) {
      case "pending":
        return "Pendiente"

      case "send":
        return "Enviado"

      case "finish":
        return "Finalizado"
    }
  }

  return (
    <div className="max-w-md  bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 font-roboto-slab">
      <Link to={`/producto/${productId}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64"
        />

        <div className="flex items-center justify-end px-4 pt-2">
          {currentUser?.userRole !== "adminCommerce" && (
            <button className="text-gray-500" onClick={handleFavorite}>
              <FiHeart
                className={`text-purple-moru ${
                  isFav ? "fill-current" : "stroke-current"
                }`}
              />
            </button>
          )}
        </div>

        <h2 className="ml-4 text-lg font-semibold overflow-hidden overflow-ellipsis line-clamp-2 h-14">
          {product.name}
        </h2>
      </Link>

      <div className="px-4 pb-2">
        <div className="flex justify-between mx-2">
          <p className="text-gray-500">$ {product.price}</p>
          {productStateView && (
            <p className="text-gray-500">
              Cantidad: <span className="font-bold">{product?.quantity}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-5 mb-4">
          {productStateView && (
            <p className="text-gray-500  p-2 px-4  border rounded-full">
              {translateState()}
            </p>
          )}

          {productStateView && currentUser.userRole === "adminCommerce" && (
            <Link
              className="text-purple-moru font-bold p-2 px-4  border rounded-full"
              to={{
                pathname: "/detalle-pedido",
                search: product?.commercebranchId
              }}>
              Detalle
            </Link>
          )}
        </div>
      </div>

      {productStateView &&
        currentUser.userRole === "adminCommerce" &&
        changeStatusButton()}

      {!productStateView &&
        (!carritoView ? (
          <div className="flex items-center justify-center py-2">
            {currentUser?.userRole !== "adminCommerce" &&
              (addedToCart ? (
                <button
                  className="bg-purple-moru text-white hover:bg-gray-300 hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
                  onClick={handleDeleteToCart}>
                  Eliminar
                </button>
              ) : (
                <button
                  className="bg-purple-moru text-white hover:bg-gray-300 hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
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
        ))}
    </div>
  )
}

export default Product
