import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../services/services';
import Product from '../components/Product'
import Categories from '../components/Categories';
import { createSelector } from 'reselect';
import Loader from '../components/Loader'

const CategoryView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    const selectFilteredProducts = createSelector(
        (state) => state.products.products,
        (_, id) => id,
        (products, id) =>
            products.filter((producto) => producto.generalcategoryId === +id)
    );
    const productos = useSelector((state) => selectFilteredProducts(state, id));

    useEffect(() => {
        setLoading(true);
        dispatch(getProductsByCategory(id))
            .then(() => { setLoading(false) });
    }, [dispatch, id]);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedProductos = [...productos].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <section className="flex flex-col  mx-4">
            <Categories />
            {loading ? (
                <Loader />
            ) : productos.length
                ? (<>
                        <div>
                            <select
                                className="bg-white text-purple-moru border border-purple-moru p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="asc">Menor precio</option>
                                <option value="desc">Mayor precio</option>
                            </select>
                        </div>
                        <div className="p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {sortedProductos.map((producto, index) => (
                                <Product key={producto.id} product={producto} />
                            ))}
                        </div>
                    </>)
                : (<>
                        <h1 className="text-4xl text-center text-purple-moru m-8"> Aún no hay productos de esa categoría </h1>
                        <Link to={'/'}> <h2 className="text-4xl font-bold text-center text-purple-moru-dark m-8">Ver todos </h2></Link>
                    </>)}
        </section>
    )
};

export default CategoryView;
