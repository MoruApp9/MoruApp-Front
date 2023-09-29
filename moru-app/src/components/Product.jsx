import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const Product = ({ product }) => {
    const productId = product.product.id;
    const dispatch = useDispatch();

    return (
        <div>
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
        <button onClick={() => dispatch(addToCart(product.product))}>Agregar al carrito</button>
        </div>
    );
};

export default Product;
