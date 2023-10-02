import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../services/services';
import Product from '../components/Product'
import Categories from '../components/Categories';

const CategoryView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState('asc'); 
    const productos = useSelector((state) => state.products.products.filter(producto => producto.generalcategoryId === +id));

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    useEffect(() => {
        dispatch(getProductsByCategory(id));
    }, [dispatch, id]);

    const sortedProductos = [...productos].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <div>
            <Categories/>
            <select value={sortOrder} onChange={handleSortChange}>
                <option value="asc">Menor precio</option>
                <option value="desc">Mayor precio</option>
            </select>

            <div className="productos-container">
                {sortedProductos.map((producto, index) => (
                    <Product key={producto.id} product={producto} />
                    
                ))}
            </div>
        </div>
    );
};

export default CategoryView;
