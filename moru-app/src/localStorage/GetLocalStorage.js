const GetLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem("User"));
    return userData;
};

const GetLocalStorageCommercesByOwner = () => {
    const commercesData = JSON.parse(localStorage.getItem("Commerces"));
    return commercesData;
};

export {
   GetLocalStorage,
   GetLocalStorageCommercesByOwner,
}