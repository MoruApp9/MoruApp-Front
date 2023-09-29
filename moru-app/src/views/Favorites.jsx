import Product from "../components/Product";
import { useSelector } from "react-redux";

const Favorites = ()=>{

    const favorites = useSelector(state => state.favorites.favorites)
    console.log("Estoy en", favorites);
    return(
        <div>
        <h1>Tus Favoritos</h1>
        {favorites.length &&
                favorites.map((fav) => {
                    return (
                        <Product
                        key={fav.id}
                        product={{product:fav}}                  
                        />
                    )
                })
            }
        </div>
    )
}

export default Favorites;