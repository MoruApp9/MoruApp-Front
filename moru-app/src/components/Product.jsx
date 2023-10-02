import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../redux/favoritesSlice";
import { setIsFav } from "../redux/isFavSlice";
import { addToCart, removefromCart } from '../redux/cartSlice'
import { useLocation } from "react-router-dom";
import { FiHeart } from 'react-icons/fi';
import GetLocalStorage from '../localStorage/GetLocalStorage';
import { useAuth0 } from '@auth0/auth0-react';


const Product = ({ product }) => {
    const productId = product.id;
    const dispatch = useDispatch();
    const location = useLocation();
    const mostrarBotonAgregar = location.pathname !== '/carrito-de-compras';
    const isFav = useSelector((state) => state.isFav[productId] || false);
    const { user, loginWithRedirect, isAuthenticated } = useAuth0();
    const currentUser = GetLocalStorage();

    const handleFavorite = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (isFav === true) {
            dispatch(removeFav(product))
            dispatch(setIsFav({ productId, isFav: false }));
        }
        else {
            setIsFav(true);
            dispatch(addFav(product))
            dispatch(setIsFav({ productId, isFav: true }));
        }
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(addToCart(product))
    };

    const deleteToCart = (event) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(removefromCart(product))
    };

    return (
        <Link to={`/producto/${productId}`}>
            <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="flex items-center justify-end px-4 pt-2">
                {/* currentUser.userRole === 'buyer' && <button className="text-gray-500" onClick={handleFavorite}>
                        <FiHeart className={`text-red-500 ${isFav ? 'fill-current' : 'stroke-current'}`} />
                    </button> */
                    (!isAuthenticated || GetLocalStorage() && currentUser.userRole === 'buyer') && <button className="text-gray-500" onClick={handleFavorite}>
                    <FiHeart className={`text-red-500 ${isFav ? 'fill-current' : 'stroke-current'}`} />
                    </button> 
                }
                </div>
                <div className="px-4 pb-2">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-500">${product.price}</p>
                </div>

                <div className="flex items-center justify-center py-2">
                    {!isAuthenticated || GetLocalStorage() && currentUser.userRole === 'buyer' ? 
                        mostrarBotonAgregar  ? 
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleAddToCart}> Agregar al carrito </button> 
                            : <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={deleteToCart}>Eliminar</button> 
                    : null}
                </div>
            </div>
        </Link>
    );
};

export default Product;
