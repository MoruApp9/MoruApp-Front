import { useState } from "react"
import shoppingIcon from "../images/icons/carrito-de-compras.png"
import sandwichIcon from "../images/icons/sandwich-icon.jpg"
import storeIcon from '../images/icons/store.svg'
import favIcon from '../images/icons/fav.svg'
import countIcon from '../images/icons/count.svg'
//import logoutIcon from '../images/icons/logout.svg'
import publishIcon from '../images/icons/publish.svg'
import supportIcon from '../images/icons/support.svg'
import { Link } from "react-router-dom"

import { useAuth0 } from '@auth0/auth0-react'
import { LogOutButton } from '../components/LogOut'
//import logoMoru from "../images/logo.jpeg"

const Nav = () => {
  const [ openMenu, setOpenMenu ] = useState(false)
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <nav className="flex flex-col sticky top-0  bg-white  z-50">
      <div className="flex justify-between w-full items-center px-6 py-2 shadow-lg rounded-bl-lg rounded-br-lg ">
      <button onClick={() => {setOpenMenu(true)}}>
        <img className="w-7" src={sandwichIcon} alt="sandwichIcon" />
          </button>

            {
                isAuthenticated ? 
                <LogOutButton /> 
                : <button onClick={() => loginWithRedirect()}>Ingresar</button>
            }

        {/* <Link to="/"><img className="w-20" src={logoMoru} alt="Moru App" /></Link> */}

        <Link to="/carrito-de-compras">
          <img className="w-12" src={shoppingIcon} alt="shoppingIcon" />
        </Link>
      </div>
      <div onClick={() => {setOpenMenu(false)}} className={`${!openMenu && 'hidden'} bg-gray-600/50 min-h-screen w-full fixed backdrop-blur-sm`}></div>

      <div className={`${openMenu ? 'w-72' : 'w-0' } bg-white min-h-screen  fixed top-0 left-0 right-0 transition-all duration-300`}>
        
        <div className={`${!openMenu && 'hidden'} pt-4`}>
          <button onClick={() => {setOpenMenu(false)}}>
            <img className="w-7 ml-6 mb-14" src={sandwichIcon} alt="sandwichIcon" />
          </button>

          <li className="flex flex-col space-y-10 text-xl">
            <ul className="flex justify-center space-x-4"> <img className="w-7" src={storeIcon} alt="store" /><Link to= "/">Tienda</Link></ul>
            <ul className="flex justify-center space-x-4" ><img className="w-7" src={favIcon} alt="fav" /><Link to="/fav">Favoritos</Link></ul>
            <ul className="flex justify-center space-x-4" ><img className="w-7" src={publishIcon} alt="publish" /><Link to="/publish">Publicar</Link></ul>
            <ul className="flex justify-center space-x-4" ><img className="w-7" src={countIcon} alt="count" /><Link to="/myaccount">Cuenta</Link></ul>
            <ul className="flex justify-center space-x-4" ><img className="w-7" src={supportIcon} alt="publish" /><Link to="/support">Soporte</Link></ul>
          </li>
        </div>
      </div>

    </nav>
  )
}

export default Nav
