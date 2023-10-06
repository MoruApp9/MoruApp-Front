import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AllProducts from '../components/AllProducts';
import { addFav, removeFav } from "../redux/favoritesSlice";
import { addToCart } from '../redux/cartSlice'
import { FiHeart } from 'react-icons/fi';

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector((state) => {
        return state.products.products.find(
            (product) => product.id === id
        );
    });
    const userRole = useSelector(state => state.userRole)


    if (!product) return <div>Producto no encontrado</div>;

    const dispatch = useDispatch();

    const [isFav, setIsFav] = useState(false)

    const handleFavorite = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (isFav === true) {
            setIsFav(false);
            dispatch(removeFav(product))
        }
        else {
            setIsFav(true);
            dispatch(addFav(product))
        }
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(addToCart(product))
    };

    return (
        <div>
            <div className="bg-white border-2 pb-8 mx-auto xl:mx-28 mt-12 shadow-xl overflow-hidden sm:rounded-lg max-w-md sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl flex flex-col sm:flex-row">
                <div className="sm:w-2/3 p-4 lg:pl-8 xl:pl-12">
                    <div className="">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {product.name}
                            </h2>
                            <p className="text-xl text-green-800">Precio: ${product.price}</p>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <img
                                src={product.image}
                                alt=""
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>

                <div className="sm:w-2/3 p-4 lg:pr-8 xl:pr-12 mx-auto block">
                    <div className=" mt-4 sm:mt-0">

                        <div className="">
                            <div className="m-4 mb-0 flex items-center justify-end text-lg sm:text-2xl ">
                            {userRole === 'buyer' && <button className="text-gray-500" onClick={handleFavorite}>
                                    <FiHeart className={`text-red-500 ${isFav ? 'fill-current' : 'stroke-current'}`} />
                                </button>}
                            </div>
                            {/* <div className="px-4 sm:px-6">
                                <h3 className="text-lg font-semibold text-gray-800">Detalles adicionales</h3>
                            </div> */}
                            <div className="px-4 py-2 sm:px-6">
                                {/* <h4 className="text-gray-700 font-semibold">Stock por Talla:</h4> */}
                                <ul className="list-disc list-inside">
                                    {/* {product.stock.map((item) => (
                                        <li key={item.id} className="text-gray-700">
                                            {item.size}: {item.stock}
                                        </li>))} */}
                                    <h2>{product.season ? `temporada: ${product.season}` : null}</h2>
                                    <h2>{product.gender ? `género: ${product.gender}` : null}</h2>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                    {userRole === 'buyer' && <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleAddToCart}>
                            Agregar al carrito
                        </button>}
                    </div>
                </div>
            </div>
            <AllProducts currentProductId={id}/>
        </div>
    );
};

export default ProductDetail;
