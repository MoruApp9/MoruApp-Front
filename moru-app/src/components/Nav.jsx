//TODO usar iconos de react
import { AiFillHome } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidUser } from 'react-icons/bi';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { PiStorefrontDuotone } from 'react-icons/pi';
import shoppingIcon from "../images/icons/carrito-de-compras.png";
import logoMoru from "../images/logo-moruApp.png"
import { FiMenu } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { cleanProductsFiltered } from "../redux/productsFilteredSlice"
import { useDispatch, useSelector } from "react-redux";
import { GetLocalStorage, GetLocalStorageCommercesByOwner } from '../localStorage/GetLocalStorage';
import { IoIosArrowDown } from "react-icons/io";
import {DeleteLocalStorage, DeleteLocalStorageCommercesByOwner} from '../localStorage/DeleteLocalStorage';
import { MdLogout } from 'react-icons/md';
import { FaMapMarkerAlt } from "react-icons/fa";
import { getBrandByOwner } from '../services/services';

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = GetLocalStorage();
  const carrito = useSelector(((state) => state.cart.cart));
  const sedes = GetLocalStorageCommercesByOwner();
  
  const handleLogOut = () => {
    DeleteLocalStorage();
    DeleteLocalStorageCommercesByOwner();
    logout({ returnTo: window.location.origin});
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (e, option, id) => {
    e.preventDefault();
    setSelectedOption(option);
    setOpenMenu(false);
    navigate(`/tienda/${id}`)
  };

  const handleOnClickMenu = () => {
    dispatch(cleanProductsFiltered()),
    setSelectedOption('');
  }

  return (
    <nav className="flex flex-col sticky top-0 bg-white z-40 font-roboto-slab" >
      <div className="flex w-full absolute justify-center">
        <Link onClick={handleOnClickMenu} to="/" className="w-28"><img src={logoMoru}/></Link>
      </div>

      <div className="flex w-full items-center justify-between px-6 py-2 shadow-lg rounded-bl-lg rounded-br-xl font-roboto-slab">
        <div className="flex items-center space-x-6">
          <button onClick={() => { setOpenMenu(true) }} className="hover:bg-gray-200 rounded-md">
            <FiMenu className="text-4xl text-purple-moru"/>
          </button>

          {!currentUser && <button className="hidden md:block text-purple-moru hover:bg-gray-200 p-1 rounded-md" onClick={() => loginWithRedirect()}>
            Iniciar Sesión
          </button>}

          {!currentUser && <Link  className='hidden md:block text-purple-moru hover:bg-gray-200 p-1 rounded-md' to={`/registration`}>
            <p>Crear Cuenta</p>
          </Link>}
        </div>

        <div className="flex items-center ">
          {

            // isAuthenticated
            // ? <Link to="/tienda"><PiStorefrontDuotone className="w-7 text-purple-moru text-4xl"></PiStorefrontDuotone></Link>
            // : currentUser.userRole !== 'adminCommerce' && (<Link to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" /></Link>)
            currentUser && GetLocalStorage() && currentUser.userRole === 'adminCommerce' 
            ? null
            : (
                <Link  className={`flex items-center hover:bg-gray-200 px-2 rounded-md  ${selectedOption === 'carrito' ? 'bg-gray-200 ': ''}`} onClick={() => setSelectedOption('carrito')} to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" />
                {carrito.length?<span className="mr-2 bg-purple-moru text-white rounded-full w-5 text-center">{carrito.length}</span> : null}
                </Link>
            )
          }
        </div>
      </div>


      {/* Menú desplegable */}
      <div onClick={() => { setOpenMenu(false) }} className={`${!openMenu && 'hidden'} bg-gray-600/50 min-h-screen w-full fixed backdrop-blur-sm`}></div>

      <div className={`${openMenu ? 'w-72' : 'w-0'} z-50 fixed bg-white rounded-tr-xl rounded-br-xl min-h-screen top-0 left-0 right-0 transition-all duration-300`}>
        <div className={`${!openMenu && 'hidden'} pt-4`}>
          <button onClick={() => { setOpenMenu(false) }}>
            <FiMenu className="text-4xl text-purple-moru ml-6 mb-5"></FiMenu>
          </button>

          <li className={`flex flex-col text-xl gap-10 items-start ml-12 whitespace-nowrap w-52 ${currentUser ? 'mt-9' : 'mt-0'}`}>
            <ul className={`flex ${currentUser ? 'order-5' : 'order-1'}  justify-start p-2 hover:bg-gray-200 rounded-md w-52`}  >
              {
                currentUser
                ? <button className="flex items-center space-x-4 mr-3" onClick={handleLogOut}><MdLogout className="w-7 text-3xl text-purple-moru"/><span>Cerrar sesión</span></button>
                : <button className="flex items-center space-x-4 mr-3" onClick={() => loginWithRedirect()}><BiSolidUser className="w-7 text-3xl text-purple-moru" /><span>Iniciar Sesión</span></button>
              }
            </ul >

            <ul className={`flex ${currentUser && 'hidden'} order-2 justify-start p-2 hover:bg-gray-200 rounded-md w-52`}>
              {
                !currentUser
                && <Link onClick={() =>{ setOpenMenu(false)} } className="flex items-center space-x-4 mr-3" to={`/registration`}><AiOutlineUserAdd className="w-7 text-3xl text-purple-moru" /><span>Crear Cuenta</span></Link>
              }
            </ul>

            {/* currentUser.userRole !== 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul> */
              (!currentUser || GetLocalStorage() && currentUser.userRole === 'buyer' ) && 
              
              <ul onClick={() => { setOpenMenu(false), setSelectedOption('favoritos') }} className={`order-2 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 ${selectedOption === "favoritos" ? 'bg-gray-200 ': ''}`} ><Link to="/fav" className="flex items-center space-x-4 mr-3"><MdFavorite className="w-7 text-purple-moru text-3xl"/><span>Favoritos</span></Link></ul>
            }

              <ul className={`flex order-2 justify-start p-2 hover:bg-gray-200 rounded-md w-52`}>
              {!currentUser || GetLocalStorage() && currentUser.userRole === 'adminCommerce' && !currentUser.brand &&
                <Link onClick={() =>{ setOpenMenu(false)} } className="flex items-center space-x-4 mr-3" to={`/registrar-empresa`}><AiOutlineUserAdd className="w-7 text-3xl text-purple-moru" /><span>Registrar marca</span></Link>
              }
              </ul>

            <div>
              {currentUser && GetLocalStorage() && currentUser.userRole === 'adminCommerce' && currentUser.brand &&
              <ul onClick={() => setSelectedOption('tienda') }
              className={`order-2 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 space-x-4 ${selectedOption === 'tienda' ? 'bg-gray-200 ': ''}`} >
                <PiStorefrontDuotone className="w-7 text-purple-moru text-3xl"/>
                <button
                  type="button"
                  onClick={(e) => handleButtonClick(e)}
                  className="flex"
                >
                  Mis tiendas
                  <IoIosArrowDown className="w-7 text-3xl ml-3 text-purple-moru "/>
                </button>
              </ul>}

              {isDropdownOpen && (
                <div className="origin-top-right right-0 mt-2 w-52 whitespace-normal bg-gray-100 rounded-md">
                  <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {sedes?.map((option, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleOptionClick(e, option.alias, option.id)}
                        role="menuitem"
                        className={`flex p-2 w-full text-left hover:bg-gray-200 rounded-md ${selectedOption === option.alias ? 'bg-gray-200 ': ''}`}
                      >
                        {option.alias}
                      </button>
                    ))}
                  </div>

                  <Link to={"/crearSucursal"} onClick={() => {setSelectedOption('crearSede'), setOpenMenu(false) }}>
                    <button
                      role="menuitem"
                      className={`flex p-2 w-full text-left hover:bg-gray-200 rounded-md ${selectedOption === 'crearSede' ? 'bg-gray-200 ': ''}`}
                    >
                      Crear nueva sede
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* {isAuthenticated && (
              <ul onClick={() => { setOpenMenu(false) }} className="order-3 flex justify-center space-x-4 mr-5" ><MdAccountCircle className="w-7 text-purple-moru text-3xl"></MdAccountCircle><Link to="/cuenta">Cuenta</Link></ul>)} */}
            <Link to="/mapa">
              <ul onClick={() => { setOpenMenu(false), setSelectedOption('ubication') }} className={`order-4 flex items-center space-x-4  mr-3 justify-start p-2 hover:bg-gray-200 rounded-md w-52  ${selectedOption === 'ubication' ? 'bg-gray-200 ': ''}`}>
                <FaMapMarkerAlt className="w-7 text-purple-moru text-3xl"/>
                <span className="whitespace-normal w-28">Buscar por ubicación</span>
              </ul>
            </Link>
                    
            <Link to="/support">
              <ul onClick={() => { setOpenMenu(false), setSelectedOption('soporte') }} className={`order-4 flex items-center space-x-4 mr-3 justify-start p-2 hover:bg-gray-200 rounded-md w-52 ${selectedOption === 'soporte' ? 'bg-gray-200 ': ''}`} >
                <BiSupport className="w-7 text-purple-moru text-3xl"/>
                <span>Soporte</span>
              </ul>
            </Link>

          </li>
        </div>
      </div>
    </nav>
  )
}

export default Nav