import { useSelector } from "react-redux";
import { useMemo } from "react";
import Product from "./Product";

const AllProducts = ({ currentProductId }) => {
    const products = useSelector ((state) => state.products.products)

    //feli, modifiqué el useSelector porque causaba un re-renderizado segun la consola 
    //Usé el useMemo para filtrar los products por id y guardarlos en una memoria caché
    /* const products = useSelector((state) => {
        return state.products.products.filter((product) => product.id !== currentProductId);
    }); */
    
    const filteredProducts = useMemo(() => {
        return products.filter((product) => product.id !== currentProductId)
    }, [products, currentProductId])

    return (
        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    );
};

export default AllProducts;
