import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { addFav, removeFav } from "../redux/favoritesSlice"
import { addToCart, removefromCart } from "../redux/cartSlice"
import { setIsFav } from "../redux/isFavSlice"

import {
  getFavorites,
  postFavorites,
  deleteFavorite,
  postChart,
  removeChart,
  getChart,
} from "../services/services"

import { FiHeart } from "react-icons/fi"

import { GetLocalStorage, GetLocalStorageFav } from "../localStorage/GetLocalStorage"
import { PostLocalStorageFav } from "../localStorage/PostLocalStorage"
import { putLocalStorageFavs } from "../localStorage/PutLocalStorage"
import { deleteLocalStorageFavs } from "../localStorage/DeleteLocalStorage"

import { useAuth0 } from "@auth0/auth0-react"
import { current } from "@reduxjs/toolkit"
import { setUser } from "../redux/userSlice"

const Product = ({ product }) => {
  const productId = product.id

  const dispatch = useDispatch()
  const location = useLocation()
  const [isFav, setIsFav] = useState(false)
  const loadedUser = useSelector((state) => state.user)
  const favorites = useSelector((state) => state.favorites)

  const { isAuthenticated, user } = useAuth0()

  const currentUser = GetLocalStorage()
  const localStorageFavs = GetLocalStorageFav()

  const mostrarBotonAgregar = location.pathname !== "/carrito-de-compras"
  //const isFav = useSelector((state) => state.isFav[productId] || false);

  //console.log(dispatch(getFavorites("f4476200-8c67-4253-9561-f7a53f713f64")));

  useEffect(() => {
    if(user && favorites.length) {
      favorites.forEach(fav => fav.id === productId && setIsFav(true))
    }
    /* if (!isAuthenticated && localStorageFavs.length) {
      localStorageFavs.forEach((fav) => {
        dispatch(addFav(fav)) // to local storage
        fav.id === productId && setIsFav(true) // estado global for render
      })
    } */

   /*  if (user && currentUser?.id) {
      //dispatch(setUser(true))
      favorites.forEach((fav) => {
        dispatch(addFav(fav))
        fav?.id === productId && setIsFav(true)
      })
    } */

    /* if (isAuthenticated && localStorageFavs?.length && loadedUser) {
      localStorageFavs.forEach((fav) => {
        dispatch(postFavorites(currentUser?.id, fav.id)) // to database
        fav.id === productId && setIsFav(true)
      })

      deleteLocalStorageFavs()
    } */
  }, [dispatch, isAuthenticated, user, loadedUser, favorites])

    

  const handleFavorite = (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (user) { // si el user está logged
      
      if (isFav) { 
        setIsFav(false) //que deje de ser fav
        dispatch(deleteFavorite(currentUser.id, productId)) // se elimina el fav y se actualiza el estado global de favs para renderizar
      } 
      else { // si no es fav
        setIsFav(true) // se vuelve fav
        dispatch(postFavorites(currentUser.id, productId)) // Se postea en la base de datos como fav y se actualiza el estado global
      }
    } 
    else window.alert("Inicia sesión o regístrate para guardar tus favoritos") // si no está logged
  }

  const handleAddToCart = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const quantity = 1
    if (user) {
      postChart(currentUser?.id, productId, quantity) // esto me debería devolver el objeto guardado, no un array con objetos repetidos
      dispatch(addToCart(product))
      // aquí tendría que haber un post
      //
    } else
      window.alert("Inicia sesión o regístrate para guardar tu carrito de compras")
  }

  const handleDeleteToCart = (event) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(removefromCart(product))
    removeChart(currentUser?.id, productId)
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
          {
            //FAV BUTTON: se muestra si el usuario NO está autenticado (cualquier usuario) o es usuario comprador
            currentUser?.userRole !== "adminCommerce" && (
              <button className="text-gray-500" onClick={handleFavorite}>
                <FiHeart
                  className={`text-purple-moru ${
                    isFav ? "fill-current" : "stroke-current"
                  }`}
                />
              </button>
            )
          }
        </div>
        <div className="px-4 pb-2">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500">${product.price}</p>
        </div>

        <div className="flex items-center justify-center py-2">
          {currentUser?.userRole !== "adminCommerce" && (
            mostrarBotonAgregar ? (
              <button
                className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru  font-bold py-2 px-4 rounded-full"
                onClick={handleAddToCart}>
                Agregar al carrito
              </button>
            ) : (
              <button
                className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru  font-bold py-2 px-4 rounded-full"
                onClick={handleDeleteToCart}>
                Eliminar
              </button>
            )
          )}
        </div>
      </div>
    </Link>
  )
}

export default Product
