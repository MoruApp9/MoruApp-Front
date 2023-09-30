//TODO usar iconos de react
import shoppingIcon from "../images/icons/carrito-de-compras.png"
import { AiFillHome } from "react-icons/ai"
import { FiMenu } from "react-icons/fi"
import { MdFavorite } from "react-icons/md"
import { MdAccountCircle } from "react-icons/md"
import { BiSupport } from "react-icons/bi"

import { BiLogInCircle } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdPerson, IoMdPersonAdd } from 'react-icons/io';

import { Link } from "react-router-dom"
import { useState } from "react"

import { useAuth0 } from '@auth0/auth0-react'
import { LogOutButton } from '../components/LogOut'

import { cleanProductsFiltered } from "../redux/productsFilteredSlice"
import { useDispatch, useSelector } from "react-redux"

//import logoMoru from "../images/logo.jpeg"

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch()
  const userRole = useSelector(state => state.userRole)
  console.log(userRole);

  const handleOnClickMenu = () => {
    dispatch(cleanProductsFiltered())
  }

  return (
    <nav className="flex flex-col sticky top-0  bg-white  z-50">
      <div className="flex justify-between w-full items-center px-6 py-2 shadow-lg rounded-bl-lg rounded-br-xl ">

        <div className="flex items-center space-x-5">
          <button onClick={() => { setOpenMenu(true) }}><FiMenu className="text-4xl text-purple-moru"></FiMenu></button>
          {
            !isAuthenticated && <button onClick={() => loginWithRedirect()}><BsPersonCircle className="text-4xl text-purple-moru" /></button>
            /* ? <LogOutButton /> 
            : */
          }
          {!isAuthenticated && <Link className='' to={`/registration`}><p >Crear Cuenta</p></Link>}

        </div>

        <Link onClick={handleOnClickMenu} to="/"><AiFillHome className="text-3xl text-purple-moru" /></Link>

        {userRole === 'buyer' && (<Link to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" /></Link>)}
      </div>

      <div onClick={() => { setOpenMenu(false) }} className={`${!openMenu && 'hidden'} bg-gray-600/50 min-h-screen w-full fixed backdrop-blur-sm`}></div>

      <div className={`${openMenu ? 'w-72' : 'w-0'} bg-white min-h-screen  fixed top-0 left-0 right-0 transition-all duration-300`}>

        <div className={`${!openMenu && 'hidden'} pt-4`}>
          <button onClick={() => { setOpenMenu(false) }}>
            <FiMenu className="text-4xl text-purple-moru ml-6 mb-10"></FiMenu>
          </button>

          <li className="  flex flex-col  text-xl space-y-10">
            <ul className={`flex ${isAuthenticated ? 'order-5' : 'order-1'}  justify-center`}  >{
              isAuthenticated
                ? <LogOutButton />
                : <button className="  flex items-center space-x-4 mr-3" onClick={() => loginWithRedirect()}><BsPersonCircle className="text-4xl text-purple-moru" /><span>Ingresar</span></button>
            }</ul >

            {userRole === 'buyer' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul>}

            {userRole === 'seller' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/publicar-producto">Publicar</Link></ul>}

            {userRole === 'seller' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/tienda">Mi tienda</Link></ul>}

            {isAuthenticated && (
              <ul onClick={() => { setOpenMenu(false) }} className=" order-3 flex justify-center space-x-4 mr-5" ><MdAccountCircle className="w-7 text-purple-moru text-3xl"></MdAccountCircle><Link to="/account">Cuenta</Link></ul>)}
            <ul onClick={() => { setOpenMenu(false) }} className=" order-4 flex justify-center space-x-4 mr-3" ><BiSupport className="w-7 text-purple-moru text-3xl"></BiSupport><Link to="/support">Soporte</Link></ul>
          </li>
        </div>
      </div>

    </nav>
  )
}

export default Nav