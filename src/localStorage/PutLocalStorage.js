import { removeFav } from "../redux/favoritesSlice"
import { deleteLocalStorageFavs } from "./DeleteLocalStorage"
import { GetLocalStorageFav } from "./GetLocalStorage"


export const putLocalStorageFavs = (productId) => (dispatch) => {
    const currentLSFavs = GetLocalStorageFav() 
    //dispatch(addFav(fav)) // al estado global
    //deleteLocalStorageFavs()
    const updatedArray = currentLSFavs.filter(fav => fav.id !== productId)
    console.log(updatedArray);
    dispatch(removeFav(productId))
    localStorage.setItem('Fav', JSON.stringify(updatedArray))
}

