import { Link } from "react-router-dom";
import Product from "../../components/ProductComponents/Product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GetLocalStorage } from "../../localStorage/GetLocalStorage";
import { getFavorites } from "../../services/services";
import { addFav } from "../../redux/favoritesSlice";


const Favorites = () => {
    const favorites = useSelector(state => state.favorites)
    const { user } = useAuth0()
    const dispatch = useDispatch()

    useEffect(() => {window.scrollTo(0, 0)}, [dispatch, user, favorites])

    return (
        <div className="min-h-screen flex flex-col mx-4 font-roboto-slab">
        {
            favorites.length > 0
                ? <h1 className="text-4xl font-bold text-center text-purple-moru-dark mt-8">¡Estos son tus favoritos!</h1>
                : (<div>
                    <h1 className="text-4xl text-center text-purple-moru m-8"> No tienes favoritos </h1>
                    <Link to={'/'}> <h2 className="text-4xl font-bold text-center text-purple-moru-dark m-8">Ver tiendas</h2></Link>
                </div>)
        }

        < div className = "p-6 lg:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" >
        {
            favorites.map((product) => (
                <Product key={product.id} product={product} />
            ))
        }
        </div >
        </div>
    )
}

export default Favorites;