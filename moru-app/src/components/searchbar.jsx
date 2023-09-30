import { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { setProductsByName, cleanProductsFiltered } from "../redux/productsFilteredSlice"
import { getProductsByName } from "../services/services"

const SearchBar = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const onSearch = async () => {
    //console.log( await getProductsByName(name));
    const productsFiltered = await getProductsByName(name)
    dispatch(cleanProductsFiltered())
    dispatch(setProductsByName(productsFiltered))
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //event.preventDefault()
      document.getElementById("searchButton").click()
    }
  }

  const handleOnClickButton = () => {
    onSearch(name)
    setName('')
  }

  return (
    <div className="flex justify-center my-4 space-x-4" role="search">
      <input
        className=" px-8 w-4/6 py-2 border border-gray-300 rounded-lg focus:visited: focus:text-purple-moru focus:outline-none shadow-lg"
        type="text"
        name="searchProduct"
        id="search"
        placeholder="¿Qué se te antoja?"
        value={name}
        onChange={handleChange}
        //onClick={() => setName("")}
        onKeyDown={handleKeyDown}
      />

      <button
        className=" text-3xl text-gray-500 hover:text-purple-moru focus:outline-none"
        id="searchButton"
        onClick={handleOnClickButton}>
        <BiSearchAlt />
      </button>
    </div>
  )
}

export default SearchBar
