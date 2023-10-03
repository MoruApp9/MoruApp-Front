//TODO usar iconos de react
import { AiFillHome } from "react-icons/ai"
import { AiOutlineUserAdd } from "react-icons/ai"
import { BiSolidUser } from 'react-icons/bi';
import { BiSolidCloudUpload } from 'react-icons/bi'
import { PiStorefrontDuotone } from 'react-icons/pi'
import shoppingIcon from "../images/icons/carrito-de-compras.png";
import { FiMenu } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { LogOutButton } from '../components/LogOut';
import { cleanProductsFiltered } from "../redux/productsFilteredSlice"
import { useDispatch, useSelector } from "react-redux";
import GetLocalStorage from '../localStorage/GetLocalStorage';

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch()
  const currentUser = GetLocalStorage();
  const carrito = useSelector(((state) => state.cart.cart))

  const handleOnClickMenu = () => {
    dispatch(cleanProductsFiltered())
  }

  return (
    <nav className="flex flex-col sticky top-0  bg-white  z-50 " >
      <div className="flex justify-between w-full items-center px-6 py-2 shadow-lg rounded-bl-lg rounded-br-xl font-roboto-slab ">
        <div className=" flex 1/3 items-center space-x-8">
          <button onClick={() => { setOpenMenu(true) }}><FiMenu className="text-4xl text-purple-moru"></FiMenu></button>

          {!isAuthenticated && <button className="hidden md:block text-purple-moru" onClick={() => loginWithRedirect()}>Iniciar Sesión</button>}

          {!isAuthenticated && <Link  className='hidden md:block text-purple-moru' to={`/registration`}><p>Crear Cuenta</p></Link>}
        </div>

        <div className="flex  items-center w-1/2 justify-between">
          <Link onClick={handleOnClickMenu} to="/"><AiFillHome className="transform translate-x-[-.9rem] text-3xl text-purple-moru" /></Link>

          {

            // isAuthenticated
            // ? <Link to="/tienda"><PiStorefrontDuotone className="w-7 text-purple-moru text-4xl"></PiStorefrontDuotone></Link>
            // : currentUser.userRole !== 'adminCommerce' && (<Link to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" /></Link>)
            isAuthenticated && GetLocalStorage() && currentUser.userRole === 'adminCommerce' 
            ? <Link to="/tienda"><PiStorefrontDuotone className="w-7 text-purple-moru text-4xl"></PiStorefrontDuotone></Link>
            : (
                <Link  className="flex items-center" to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" />
                {carrito.length?<span className="mr-2 bg-purple-moru text-white rounded-full w-5 text-center">{carrito.length}</span> : null}
                </Link>
            )
          }
        </div>
      </div>


      {/* Menú desplegable */}
      <div onClick={() => { setOpenMenu(false) }} className={`${!openMenu && 'hidden'} bg-gray-600/50 min-h-screen w-full fixed backdrop-blur-sm`}></div>

      <div className={`${openMenu ? 'w-72' : 'w-0'} bg-white rounded-tr-xl rounded-br-xl min-h-screen  fixed top-0 left-0 right-0 transition-all duration-300`}>
        <div className={`${!openMenu && 'hidden'} pt-4`}>
          <button onClick={() => { setOpenMenu(false) }}>
            <FiMenu className="text-4xl text-purple-moru ml-6 mb-10"></FiMenu>
          </button>

          <li className="  flex flex-col  text-xl space-y-10">
            <ul className={`flex ${isAuthenticated ? 'order-5' : 'order-1'}  justify-center`}  >
              {
                isAuthenticated
                ? <LogOutButton />
                : <button className="  flex items-center space-x-4 mr-3" onClick={() => loginWithRedirect()}><BiSolidUser className="text-4xl text-purple-moru" /><span>Iniciar Sesión</span></button>
              }
            </ul >

            <ul className={`flex ${isAuthenticated && 'hidden'} order-2 justify-center`}>
              {
                !isAuthenticated
                && <Link onClick={() =>{ setOpenMenu(false)} } className="flex items-center space-x-4 mr-3" to={`/registration`}><AiOutlineUserAdd className="text-4xl text-purple-moru" /><span>Crear Cuenta</span></Link>
              }
            </ul>

            {/* currentUser.userRole !== 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul> */
              (!isAuthenticated || GetLocalStorage() && currentUser.userRole === 'buyer' )&& <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul>
            }
            

            {isAuthenticated && GetLocalStorage() && currentUser.userRole === 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><BiSolidCloudUpload className="w-7 text-purple-moru text-3xl"></BiSolidCloudUpload><Link to="/publicar-producto">Publicar</Link></ul>}

            {isAuthenticated && GetLocalStorage() && currentUser.userRole === 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><PiStorefrontDuotone className="w-7 text-purple-moru text-3xl"></PiStorefrontDuotone><Link to="/tienda">Mi tienda</Link></ul>}

            {isAuthenticated && (
              <ul onClick={() => { setOpenMenu(false) }} className=" order-3 flex justify-center space-x-4 mr-5" ><MdAccountCircle className="w-7 text-purple-moru text-3xl"></MdAccountCircle><Link to="/cuenta">Cuenta</Link></ul>)}
            <ul onClick={() => { setOpenMenu(false) }} className=" order-4 flex justify-center space-x-4 mr-3" ><BiSupport className="w-7 text-purple-moru text-3xl"></BiSupport><Link to="/support">Soporte</Link></ul>
          </li>
        </div>
      </div>

    </nav>
  )
}

export default Nav