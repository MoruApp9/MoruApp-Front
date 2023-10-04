const PostLocalStorage = (User) => {
    localStorage.setItem("User", JSON.stringify(User));
};

const PostLocalStorageCommercesByOwner = (Commerces) => {
    localStorage.setItem("Commerces", JSON.stringify(Commerces));
};

export {
    PostLocalStorage,
    PostLocalStorageCommercesByOwner
}