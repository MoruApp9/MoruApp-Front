const DeleteLocalStorage = () => {
    localStorage.removeItem("User");
};

const DeleteLocalStorageCommercesByOwner = () => {
    localStorage.removeItem("Commerces");
};

export {
    DeleteLocalStorage,
    DeleteLocalStorageCommercesByOwner
} 