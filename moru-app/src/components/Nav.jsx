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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { cleanProductsFiltered } from "../redux/productsFilteredSlice"
import { useDispatch, useSelector } from "react-redux";
import { GetLocalStorage } from '../localStorage/GetLocalStorage';
import { IoIosArrowDown } from "react-icons/io";
import {DeleteLocalStorage} from '../localStorage/DeleteLocalStorage';
import { MdLogout } from 'react-icons/md'

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch()
  const currentUser = GetLocalStorage();
  const carrito = useSelector(((state) => state.cart.cart));
  const navigate = useNavigate()

  const [selectedOption, setSelectedOption] = useState(null);

  const { logout } = useAuth0();

  const handleLogOut = () => {
    DeleteLocalStorage();
    logout({ returnTo: window.location.origin});
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    // Implementar la lógica cuando se hace clic en una opción
    console.log(`Clic en la opción: ${option}`);
    setSelectedOption(option);
    setOpenMenu(false);
    navigate('/tienda')
    // Aquí podrías redirigir a una nueva página o realizar otras acciones según la opción seleccionada
  };

  const options = [{name: "mac"}];


  const handleOnClickMenu = () => {
    dispatch(cleanProductsFiltered()),
    setSelectedOption('');
  }

  return (
    <nav className="flex flex-col sticky top-0 bg-white z-50 font-roboto-slab" >
      <div className="flex justify-between w-full items-center px-6 py-2 shadow-lg rounded-bl-lg rounded-br-xl font-roboto-slab">
        <div className=" flex 1/3 items-center space-x-8">
          <button onClick={() => { setOpenMenu(true) }}><FiMenu className="text-4xl text-purple-moru"></FiMenu></button>

          {!isAuthenticated && <button className="hidden md:block text-purple-moru" onClick={() => loginWithRedirect()}>Iniciar Sesión</button>}

          {!isAuthenticated && <Link  className='hidden md:block text-purple-moru' to={`/registration`}><p>Crear Cuenta</p></Link>}
        </div>

        <div className="flex items-center w-1/2 justify-between">
          <Link onClick={handleOnClickMenu} to="/"><AiFillHome className="transform translate-x-[-.9rem] text-3xl text-purple-moru" /></Link>

          {

            // isAuthenticated
            // ? <Link to="/tienda"><PiStorefrontDuotone className="w-7 text-purple-moru text-4xl"></PiStorefrontDuotone></Link>
            // : currentUser.userRole !== 'adminCommerce' && (<Link to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" /></Link>)
            isAuthenticated && GetLocalStorage() && currentUser.userRole === 'adminCommerce' 
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

      <div className={`${openMenu ? 'w-72' : 'w-0'} bg-white rounded-tr-xl rounded-br-xl min-h-screen fixed top-0 left-0 right-0 transition-all duration-300`}>
        <div className={`${!openMenu && 'hidden'} pt-4`}>
          <button onClick={() => { setOpenMenu(false) }}>
            <FiMenu className="text-4xl text-purple-moru ml-6 mb-5"></FiMenu>
          </button>

          <li className={`flex flex-col text-xl gap-10 items-start ml-12 whitespace-nowrap w-52 ${isAuthenticated ? 'mt-9' : 'mt-0'}`}>
            <ul className={`flex ${isAuthenticated ? 'order-5' : 'order-1'}  justify-start p-2 hover:bg-gray-200 rounded-md w-52`}  >
              {
                isAuthenticated
                ? <button className="flex items-center space-x-4 mr-3" onClick={handleLogOut}><MdLogout className="w-7 text-3xl text-purple-moru"/><span>Cerrar sesión</span></button>
                : <button className="flex items-center space-x-4 mr-3" onClick={() => loginWithRedirect()}><BiSolidUser className="w-7 text-3xl text-purple-moru" /><span>Iniciar Sesión</span></button>
              }
            </ul >

            <ul className={`flex ${isAuthenticated && 'hidden'} order-2 justify-start p-2 hover:bg-gray-200 rounded-md w-52`}>
              {
                !isAuthenticated
                && <Link onClick={() =>{ setOpenMenu(false)} } className="flex items-center space-x-4 mr-3" to={`/registration`}><AiOutlineUserAdd className="w-7 text-3xl text-purple-moru" /><span>Crear Cuenta</span></Link>
              }
            </ul>

            {/* currentUser.userRole !== 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul> */
              (!isAuthenticated || GetLocalStorage() && currentUser.userRole === 'buyer' )&& <ul onClick={() => { setOpenMenu(false), setSelectedOption('favoritos') }} className={`order-2 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 ${selectedOption === "favoritos" ? 'bg-gray-200 ': ''}`} ><Link to="/fav" className="flex items-center space-x-4 mr-3"><MdFavorite className="w-7 text-purple-moru text-3xl"/><span>Favoritos</span></Link></ul>
            }

            <div>
              {isAuthenticated && GetLocalStorage() && currentUser.userRole === 'adminCommerce' && <ul className="order-2 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 space-x-4" ><PiStorefrontDuotone className="w-7 text-purple-moru text-3xl"/>
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
                    {options.map((option, index) => (
                      <Link to={"/tienda"} onClick={() => setSelectedOption('tienda')}>
                      <button
                        key={index}
                        onClick={(e) => handleOptionClick(e, option.name)}
                        role="menuitem"
                        className={`flex p-2 w-full text-left hover:bg-gray-200 rounded-md ${selectedOption === option.name ? 'bg-gray-200 ': ''}`}
                      >
                        {option.name}
                      </button>
                      </Link>
                    ))}
                  </div>
                  <Link to={"/crearSucursal"} onClick={() => setSelectedOption('tienda')}>
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
            <ul onClick={() => { setOpenMenu(false), setSelectedOption('soporte') }} className={`order-4 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 ${selectedOption === 'soporte' ? 'bg-gray-200 ': ''}`} ><Link to="/support" className="flex items-center space-x-4 mr-3"><BiSupport className="w-7 text-purple-moru text-3xl"/><span>Soporte</span></Link></ul>
          </li>
        </div>
      </div>
    </nav>
  )
}

export default Nav