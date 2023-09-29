import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFav, removeFav } from "../redux/favoritesSlice";
import { addToCart } from '../redux/cartSlice'
import { useLocation } from "react-router-dom";

const Product = ({ product }) => {
    const productId = product.id;
    const dispatch = useDispatch();
    const location = useLocation()

    const [isFav, setIsFav] = useState(false)

    const handleFavorite = () => {
        if (isFav === true) {
            setIsFav(false);
            dispatch(removeFav(product))
        }
        else {
            setIsFav(true);
            dispatch(addFav(product))
        }
    };

    return (
        <div>
        {location.pathname !== '/fav' ? 
            (
                isFav ? (
                    <button className="ps-9" onClick={handleFavorite}>❤️</button>
                ) : (
                    <button className="ps-9" onClick={handleFavorite}>🤍</button>
                )
             ) : null
        }
            
            <Link to={`/producto/${productId}`} className="block border rounded shadow p-4 mb-4 mr-6 ml-6">
                <div className="flex">
                    <div className="flex-1 pr-4">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-xl text-green-800">Price: ${product.price}</p>
                    </div>

                    <div className="flex-1">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-cover"
                        />
                    </div>
                </div>
            </Link>
            <button className="ps-9" onClick={() => dispatch(addToCart(product.product))}>Agregar al carrito</button>
        </div >
    );
};

export default Product;
