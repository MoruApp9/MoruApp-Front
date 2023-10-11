import { useSelector } from "react-redux";
import { useMemo } from "react";
import Product from "./Product";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
    const latest = useSelector((state) => state.products.products)
    const allProducts = useSelector((state) => state.allProducts.allProducts)
    const location = useLocation();

    //feli, modifiqué el useSelector porque causaba un re-renderizado segun la consola 
    //Usé el useMemo para filtrar los products por id y guardarlos en una memoria caché
    /* const products = useSelector((state) => {
        return state.products.products.filter((product) => product.id !== currentProductId);
    }); */

    /* const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => product.id !== currentProductId)
    }, [allProducts, currentProductId]) */

    return (
        <div className="font-roboto-slab">
            {
                location.pathname !== '/' || latest.length === allProducts.length || latest.length === 0 ? null :
                <div className="p-6 lg:px-28">
                <h1 className="text-2xl md:text-3xl text-purple-moru py-4">
                    Relacionados con tu última búsqueda
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {latest?.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
            }    
            <div className="p-6 lg:px-28">
                <h1 className="text-2xl md:text-3xl text-purple-moru py-4">
                    Todos los productos
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {allProducts?.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
