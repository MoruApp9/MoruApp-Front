import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const AllProducts = () => {
    const products = useSelector((state) => state.products.products);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default AllProducts;
