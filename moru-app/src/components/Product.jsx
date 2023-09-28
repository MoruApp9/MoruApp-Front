const Product = ({ product }) => {
    return (
        <div className="border rounded shadow p-4 mb-4 flex">
            <div className="flex-1 pr-4">
                <h2 className="text-lg font-semibold">{product.product.name}</h2>
                <p className="text-xl text-green-800">Price: ${product.product.price}</p>
            </div>

            <div className="flex-1">
                <img
                    src={product.product.image}
                    alt={product.product.name}
                    className="w-32 h-32 object-cover"
                />
            </div>
        </div>
    );
};

export default Product;
