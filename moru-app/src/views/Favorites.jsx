import Product from "../components/Product";
import { useSelector } from "react-redux";

const Favorites = ()=>{

    const favorites = useSelector(state => state.favorites.favorites)
    return(
        <div>
    <h1 className="text-4xl font-bold text-center text-blue-500 m-8">¡Estos son tus favoritos!</h1>
        {favorites.length &&
                favorites.map((fav) => {
                    return (
                        <Product
                        key={fav.name}
                        product={fav}                  
                        />
                    )
                })
            }
        </div>
    )
}

export default Favorites;