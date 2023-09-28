import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProducts from '../components/AllProducts';

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector((state) => {
        return state.products.products.find(
            (product) => product.product.id === id
        );
    });

    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div>
        <div className="max-w-3xl mx-auto py-8 flex flex-col sm:flex-row">

            <div className="sm:w-2/3 pr-4">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {product.product.name}
                        </h2>
                        <p className="text-xl text-green-800">Precio: ${product.product.price}</p>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <p className="text-gray-700">{product.product.description}</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <img
                            src={product.product.image}
                            alt=""
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="sm:w-1/3 pl-4 mt-4 sm:mt-0">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-semibold text-gray-800">Detalles adicionales</h3>
                    </div>
                    <div className="px-4 py-2 sm:px-6">
                        <h4 className="text-gray-700 font-semibold">Stock por Talla:</h4>
                        <ul className="list-disc list-inside">
                            {product.stock.map((item) => (
                                <li key={item.id} className="text-gray-700">
                                    {item.size}: {item.stock}
                                </li>))}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            <h4 className="text-xl font-semibold mt-4 ml-8">Seguir viendo</h4>
            <AllProducts currentProductId={id}/>
        </div>
    );
};

export default ProductDetail;
