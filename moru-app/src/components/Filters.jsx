import { useSelector } from "react-redux"
import Product from "./Product"

const Filters = () => {
  const productsFiltered = useSelector((state) => state.productsFiltered)

  return (
    <div>
      {productsFiltered?.map((product) => {
        return <Product key={product.product.id} product={product} />
      })}
    </div>
  )
}

/* const AllProducts = ({ currentProductId }) => {
    const products = useSelector((state) => {
        // Filtra la lista de productos para excluir el producto actual
        return state.products.products.filter((product) => product.product.id !== currentProductId);
    });
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}; */

export default Filters