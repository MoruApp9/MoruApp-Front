import { addFav } from "../redux/favoritesSlice"
import { GetLocalStorageFav } from "./GetLocalStorage"

const PostLocalStorage = (User) => {
  localStorage.setItem("User", JSON.stringify(User)) || {}
}

const PostLocalStorageCommercesByOwner = (Commerces) => {
  localStorage.setItem("Commerces", JSON.stringify(Commerces))
}


// este postLocalStorage no se ocupa porque los fav se guardan en la db
const PostLocalStorageFav = (fav) => (dispatch) => {
  const favsArray = GetLocalStorageFav()
  favsArray.push(fav)
  dispatch(addFav(fav)) // al estado global
  localStorage.setItem("Fav", JSON.stringify(favsArray)) || []
}

export {
  PostLocalStorage,
  PostLocalStorageCommercesByOwner,
  PostLocalStorageFav,
}
