import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { addFav, removeFav } from "../redux/favoritesSlice"
import { addToCart, removefromCart } from "../redux/cartSlice"
import { setIsFav } from "../redux/isFavSlice"

import { getFavorites, postFavorites, deleteFavorite } from "../services/services"

import { FiHeart } from "react-icons/fi"

import { GetLocalStorage, GetLocalStorageFav} from "../localStorage/GetLocalStorage"
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
  const loadedUser = useSelector(state => state.user)
  const { isAuthenticated } = useAuth0()

  const currentUser = GetLocalStorage()
  const localStorageFavs = GetLocalStorageFav()

  const mostrarBotonAgregar = location.pathname !== "/carrito-de-compras"
  //const isFav = useSelector((state) => state.isFav[productId] || false);
  
  //console.log(dispatch(getFavorites("f4476200-8c67-4253-9561-f7a53f713f64")));
  

  useEffect(() => {
    if(!isAuthenticated && localStorageFavs.length) {
      localStorageFavs.forEach((fav) => {
        dispatch(addFav(fav)) // to local storage
        fav.id === productId && setIsFav(true) // estado global for render
      })
    } 


    
    if(isAuthenticated && currentUser?.id) {
      dispatch(setUser(true))
      const favoriteData = async() => {
        const favs = await (getFavorites(currentUser.id))
        favs.forEach(fav => {
          dispatch(addFav(fav))
          fav?.id === productId && setIsFav(true)
        })
      }
    
      favoriteData()
      //console.log(dbFavs)
    }

    if (isAuthenticated && localStorageFavs.length && loadedUser) {
      localStorageFavs.forEach((fav) => {
        dispatch(postFavorites(currentUser?.id, fav.id)) // to database
        fav.id === productId && setIsFav(true)
      })
      
      deleteLocalStorageFavs()
    }
  }, [dispatch, isAuthenticated, loadedUser])

  const handleFavorite = (event) => {
    event.stopPropagation()
    event.preventDefault()
    // post favs
    // Si el user no está autenticado, que los favs se guarden en el localeStorage y en el estado global para renderizarlos
    //Cuando se autentifique, los favs del locale storage pasan a la base de datos y se borra el locale storage
    // Si el User sí está autenticado, que los favs pasen directamente a la base de datos (llamar a funcion en services)

    // get favs para renderizarlos
    // Si el user no está autenticado, cuando se monte el componente, obtener favs desde el locale storage y llenar el estado global for render
    // Si el user está autenticado, cuando se monte el componente, se borra el locale storage y el estado global y este se llena nuevamente con los favs del back para que se renderice.

    if (isAuthenticated) {
      if (isFav) {
        // si el producto es fav
        setIsFav(false) //que deje de ser fav
        //dispatch(removeFav(product)) // se borra el fav de la base de datos y del estado global
        dispatch(deleteFavorite(currentUser.id, productId))
        //dispatch(setIsFav({ productId, isFav: false }));
      } else {
        // si el producto no es fav
        setIsFav(true) // se vuelve fav
        dispatch(postFavorites(currentUser.id, productId)) // Se postea en la base de datos como fav y se actualiza el estado global
        //dispatch(addFav(product))
        //dispatch(setIsFav({ productId, isFav: true }));
      }
    } else {
      // si el user no está autenticado
      if (isFav) {
        // si es fav
        setIsFav(false) // deja de ser fav
        const updatedFavs = localStorageFavs?.filter(
          (fav) => fav.id !== productId
        ) //Se borra del local storage
        //console.log("updatedfavs", updatedFavs)
        //console.log('up',updatedFavs)
        //dispatch(PostLocalStorageFav(product, productId))
        //deleteLocalStorageFavs()
        dispatch(putLocalStorageFavs(productId))
        //PostLocalStorageFav(updatedFavs)
        // se borra del estado global
      } else {
        setIsFav(true) // Se vuelve fav
        dispatch(PostLocalStorageFav(product)) // Se postea en el localstorage para que persista la información
        //dispatch(addFav(product)) // se llena el estado global también para que se renderice
      }
    }
  }

  const handleAddToCart = (event) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(addToCart(product))
  }

  const deleteToCart = (event) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(removefromCart(product))
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
            //FAV BUTTON: se muestra si el usuario NO está autenticado (cualquier usuario) o es usuario vendedor
            (!isAuthenticated ||
              (GetLocalStorage() && currentUser.userRole === "buyer")) && (
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
          {!isAuthenticated ||
          (GetLocalStorage() && currentUser.userRole === "buyer") ? (
            mostrarBotonAgregar ? (
              <button
                className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru  font-bold py-2 px-4 rounded-full"
                onClick={handleAddToCart}>
                {" "}
                Agregar al carrito{" "}
              </button>
            ) : (
              <button
                className="bg-purple-moru text-white hover:bg-white hover:text-purple-moru  font-bold py-2 px-4 rounded-full"
                onClick={deleteToCart}>
                Eliminar
              </button>
            )
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default Product
