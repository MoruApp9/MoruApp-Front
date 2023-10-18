import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import AllProducts from '../components/AllProducts';
import { addFav, removeFav } from "../redux/favoritesSlice";
import { addToCart } from '../redux/cartSlice'
import { FiHeart } from 'react-icons/fi';
import { GetLocalStorage } from "../localStorage/GetLocalStorage";
import { deleteFavorite } from "../services/services";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector((state) => {
        return state.allProducts.allProducts.find(
            (product) => product.id === id
        );
    });
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false)
    const userRole = useSelector(state => state.userRole)
    const currentUser = GetLocalStorage();
    console.log(currentUser);
    const detailRef = useRef();
    const { isAuthenticated, user } = useAuth0()
    
    useEffect(() => {
        // Verifica si el componente se monta con un ID de producto válido
        if (id && detailRef.current) {
            // Cuando el componente se monta y recibe un ID válido, desplaza la vista al componente de detalle
            detailRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) return <div>Producto no encontrado</div>;

    const handleFavorite = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (user) {
            const userUpdate = GetLocalStorage()
            // si el user está logged
            if (isFav) {
              setIsFav(false) //que deje de ser fav
              dispatch(deleteFavorite(userUpdate.id, id)) // se elimina el fav y se actualiza el estado global de favs para renderizar
            } else {
              // si no es fav
              setIsFav(true) // se vuelve fav
              console.log(userUpdate)
              dispatch(postFavorites(userUpdate.id, id)) // Se postea en la base de datos como fav y se actualiza el estado global
            }
          } else
            Swal.fire(
              "Oops...",
              "Inicia sesión o regístrate para guardar tus favoritos",
              "warning"
            ) // si no está logged
    };

    const handleAddToCart = async (event) => {
        event.stopPropagation()
        event.preventDefault()
    
        const quantity = 1
        if (user) {
          const userUpdate = GetLocalStorage()
          const response = await postChart(userUpdate?.id, id, quantity) // esto me debería devolver el objeto guardado, no un array con objetos repetidos
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

    return (
        <div className="font-roboto-slab" ref={detailRef}>
            <div className="bg-white border-2 pb-8 mx-auto xl:mx-28 mt-12 shadow-xl overflow-hidden sm:rounded-lg max-w-md sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl flex flex-col md:flex-row">
                <div className="sm:w-2/3 p-4 lg:pl-8 xl:pl-12 mx-auto">
                    <div className="w-full sm:w-102">
                        <img
                            src={product.image}
                            alt=""
                            className="w-full h-102"
                        />
                    </div>
                </div>

                <div className="sm:w-2/3 p-4 lg:pr-8 xl:pr-12 mx-auto flex flex-col h-102">
                    <div className="">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {product.name}
                            </h2>
                            <p className="text-xl text-green-800">Precio: ${product.price}</p>
                        </div>
                        <div className="px-2 py-3 sm:px-4">
                            <p>Cantidad en stock: {product.stock}</p>
                        </div>
                        <div className="px-2 py-3 sm:px-4">
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-0">
                        <div className="flex justify-end gap-2">
                            <div className="flex items-center text-lg sm:text-2xl ">
                                {(!currentUser || currentUser.userRole !== 'adminCommerce') && <button className="text-gray-500" onClick={handleFavorite}>
                                    <FiHeart className={`text-purple-moru  ${isFav ? 'fill-current' : 'stroke-current'}`} />
                                </button>}
                            </div>
                            <div className="flex items-center mr-4">
                                {product.commercebranchId && (
                                    <Link to={`/tienda/${product.commercebranchId}`} className="text-purple-moru underline">
                                        Ver tienda
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-40">
                        {(!currentUser || currentUser.userRole !== 'adminCommerce') && 
                        <button className="bg-purple-moru text-white hover:bg-gray-300 hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full" 
                        onClick={handleAddToCart}>
                            Agregar al carrito
                        </button>}
                    </div>
                </div>
            </div>            
            <AllProducts currentProductId={id}/>
        </div>
    );
};

export default ProductDetail;
