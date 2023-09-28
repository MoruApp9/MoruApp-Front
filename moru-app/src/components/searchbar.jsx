import { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"

const SearchBar = () => {
    const [ name, setName ] = useState()

    const onSearch = (name) => {
        // getProductByName(name) este es un handler para buscar en el endpoint
    }

    const handleChange = (event) => {
        setName(event.target.value)
    }
    
  return (
    <search className="flex justify-center my-4 space-x-4" role="search">
      <input
        className=" px-8 w-4/6 py-2 border border-gray-300 rounded-lg focus:visited: focus:text-purple-moru focus:outline-none shadow-lg"
        type="text"
        name="searchProduct"
        id="search"
        placeholder="¿Qué se te antoja?"
        value={name}
        onChange={handleChange}
        onClick={() => setName('')}
      />

      <button
        className=" text-3xl text-gray-500 hover:text-purple-moru focus:outline-none"
        id="searchButton"
        onClick={() => onSearch(name)}
        >
        
        <BiSearchAlt />
      </button>
    </search>
  )
}

export default SearchBar
