import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFav, removeFav } from "../redux/favoritesSlice";


const Product = ({ product }) => {

    const productId = product.product.id;
    
    const dispatch = useDispatch()
    const [isFav, setIsFav] = useState(false)
    

    const handleFavorite = () => {
        if (isFav === true) {
            setIsFav(false);
            dispatch(removeFav(product.product))
        }
        else {
            setIsFav(true);
            dispatch(addFav(product.product))
        }
    };

    return (
        <div>
            {
                isFav ? (
                    <button onClick={handleFavorite}>❤️</button>
                ) : (
                    <button onClick={handleFavorite}>🤍</button>
                )
            }
            <Link to={`/producto/${productId}`} className="block border rounded shadow p-4 mb-4">
                <div className="flex">
                    <div className="flex-1 pr-4">
                        <h2 className="text-lg font-semibold">{product.product.name}</h2>
                        <p className="text-xl text-green-800">Price: ${product.product.price}</p>
                    </div>

                    <div className="flex-1">
                        <img
                            src={product.product.image}
                            alt={product.product.name}
                            className="w-32 h-32 object-cover"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
