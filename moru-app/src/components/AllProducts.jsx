import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const AllProducts = ({ currentProductId }) => {
    const products = useSelector((state) => {
        // Filtra la lista de productos para excluir el producto actual
        return state.products.products.filter((product) => product.id !== currentProductId);
    });

    return (
        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default AllProducts;
