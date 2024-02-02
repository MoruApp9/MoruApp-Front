import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setProductsByName, cleanProductsFiltered } from "../redux/productsFilteredSlice";
import { getProductsByName } from "../services/services";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const onSearch = async () => {
    const productsFiltered = await getProductsByName(name);
    dispatch(cleanProductsFiltered());
    dispatch(setProductsByName(productsFiltered));
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("searchButton").click();
    }
  };

  const handleOnClickButton = () => {
    onSearch(name);
    setName("");
  };

  return (
    <div className="flex justify-center my-4 space-x-4 font-roboto-slab" role="search">
      <div className="relative">
        <input
          className="md:w-60 w-80 border border-gray-300 rounded-lg pl-8 pr-4 p-1 focus:visited: focus:text-purple-moru focus:outline-none shadow-lg font-montserrat"
          type="text"
          name="searchProduct"
          id="search"
          placeholder="Buscar"
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="absolute inset-y-0 right-1 flex items-center pl-2 text-3xl text-gray-500 hover:text-purple-moru focus:outline-none transition-all duration-300 ease-in-out"
          id="searchButton"
          onClick={handleOnClickButton}
        >
          <BiSearchAlt />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
