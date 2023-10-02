const GetLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem("User"));
    return userData;
};

export default GetLocalStorage;