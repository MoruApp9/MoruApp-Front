import { removeFav } from "../redux/favoritesSlice"
import { deleteLocalStorageFavs } from "./DeleteLocalStorage"
import { GetLocalStorage, GetLocalStorageFav } from "./GetLocalStorage"


export const putLocalStorageFavs = (productId) => (dispatch) => {
    const currentLSFavs = GetLocalStorageFav() 
    //dispatch(addFav(fav)) // al estado global
    //deleteLocalStorageFavs()
    const updatedArray = currentLSFavs.filter(fav => fav.id !== productId)
    // console.log(updatedArray);
    dispatch(removeFav(productId))
    localStorage.setItem('Fav', JSON.stringify(updatedArray))
}
export const putLocalStorageAdminCommerce = (adminCommerce) => {
    // Obtén el objeto actual almacenado en localStorage
    const current = GetLocalStorage();

    // Verifica si el objeto actual existe en localStorage
    if (current) {
        // Actualiza solo los valores que han cambiado
        Object.keys(adminCommerce).forEach((key) => {
            if (adminCommerce[key] !== undefined) {
                current[key] = adminCommerce[key];
            }
        });

        // Vuelve a almacenar el objeto actualizado en localStorage
        localStorage.setItem('User', JSON.stringify(current));
    }
};
