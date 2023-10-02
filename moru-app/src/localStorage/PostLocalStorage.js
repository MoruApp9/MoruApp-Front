const PostLocalStorage = (User) => {
    localStorage.setItem("User", JSON.stringify(User));
};

export default PostLocalStorage;