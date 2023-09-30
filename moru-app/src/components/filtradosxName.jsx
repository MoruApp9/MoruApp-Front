import { useSelector } from 'react-redux';

const FilteredProductsList = () => {
    const filteredProducts = useSelector((state) => state.products.products);

    return (
        <div>
            {filteredProducts.map((product) => (
                <div key={product.id}>{product.name}</div>
            ))}
        </div>
    );
};

export default FilteredProductsList;
