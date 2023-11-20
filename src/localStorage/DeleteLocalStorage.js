const DeleteLocalStorage = () => {
    localStorage.removeItem("User");
};

const DeleteLocalStorageCommercesByOwner = () => {
    localStorage.removeItem("Commerces");
};

const deleteLocalStorageFavs = () => {
    localStorage.removeItem('Fav')
}



export {
    DeleteLocalStorage,
    DeleteLocalStorageCommercesByOwner,
    deleteLocalStorageFavs
} 