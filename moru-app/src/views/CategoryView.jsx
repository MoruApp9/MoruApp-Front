import { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { getProductsByCategory } from '../services/services'; 

const CategoryView = () => {
    const { id } = useParams(); 
    const [productos, setProductos] = useState([]); 
    const location = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const productos = await getProductsByCategory(id);
                setProductos(productos);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [id]);
    

    return (
        <div>
            <h1>Categoría ID: {id}</h1>
            <div className="productos-container">
                {productos.map((producto, index) => (
                    <div key={index} className="producto">
                        <img src={producto.imagen} alt={producto.nombre} />
                        <p>{producto.nombre}</p>
                        <p>{producto.precio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryView;
