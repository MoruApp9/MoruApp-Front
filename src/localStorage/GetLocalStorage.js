const GetLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem("User"));
    return userData;
};

const GetLocalStorageCommercesByOwner = () => {
    const commercesData = JSON.parse(localStorage.getItem("Commerces"));
    return commercesData;
};

const GetLocalStorageFav = () => {
    const favData = JSON.parse(localStorage.getItem('Fav')) || []
    return favData
}

export {
   GetLocalStorage,
   GetLocalStorageCommercesByOwner,
   GetLocalStorageFav
}