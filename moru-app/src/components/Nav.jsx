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
import { getBrandByOwner, getChart, getFavorites, getUser } from '../services/services';
import { addFav } from "../redux/favoritesSlice";
import { addToCart } from "../redux/cartSlice";

const Nav = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {loginWithRedirect, logout } = useAuth0();

  const favsStore = useSelector(state => state.favorites)
  const chartStore = useSelector(state => state.cart.cart)

  const currentUser = GetLocalStorage();
  const sedes = GetLocalStorageCommercesByOwner();

  useEffect(() => {
    const handleFavsAndChart = async () => {
      if (user) {
      await getUser(user.email)
      const dataUser = GetLocalStorage()

      if(user && dataUser?.userRole === 'buyer' ){
        if (!favsStore.length) {
          const userFavs = await getFavorites(dataUser.id)
          userFavs?.forEach(fav => dispatch(addFav(fav)))
        }
        
        if(!chartStore.length) {
          const userChart = await getChart(dataUser.id)
          userChart?.forEach(product => dispatch(addToCart(product)))
        }
      }
    }
  }
    handleFavsAndChart()
  }, [dispatch, user, favsStore, chartStore])

  
  const handleLogOut = () => {
    DeleteLocalStorage();
    DeleteLocalStorageCommercesByOwner();
    logout({ returnTo: window.location.origin});
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    setSelectedOption('tienda')
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
    <nav className="flex flex-col sticky top-0 bg-white z-40 rounded-b-xl font-roboto-slab">
      <div className="flex w-full px-2 sm:px-6 py-2 shadow-lg rounded-b-xl font-roboto-slab z-10">
        <div className="flex w-full justify-start items-center space-x-6 whitespace-nowrap">
          <button onClick={() => { setOpenMenu(true) }} className="hover:bg-gray-200 rounded-md">
            <FiMenu className="text-4xl text-purple-moru"/>
          </button>

          {/* {!user && <button className="hidden md:block text-purple-moru hover:bg-gray-200 p-1 rounded-md" onClick={() => loginWithRedirect()}>
            Iniciar Sesión
          </button>}

          {!user && <Link  className='hidden md:block text-purple-moru hover:bg-gray-200 p-1 rounded-md' to={`/registration`}>
            <p>Crear Cuenta</p>
          </Link>} */}
        </div>

        <div className="flex w-full justify-center">
          <Link onClick={handleOnClickMenu} to="/" className="w-28"><img src={logoMoru}/></Link>
        </div>
        
        <div className="flex w-full justify-end">
          {

            // isAuthenticated
            // ? <Link to="/tienda"><PiStorefrontDuotone className="w-7 text-purple-moru text-4xl"></PiStorefrontDuotone></Link>
            // : currentUser.userRole !== 'adminCommerce' && (<Link to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" /></Link>)
            currentUser && GetLocalStorage() && currentUser.userRole === 'adminCommerce' 
            ? null
            : (
                <Link  className={`flex items-center hover:bg-gray-200 px-2 rounded-md  ${selectedOption === 'carrito' ? 'bg-gray-200 ': ''}`} onClick={() => setSelectedOption('carrito')} to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" />
                {chartStore.length?<span className="mr-2 bg-purple-moru text-white rounded-full w-5 text-center">{chartStore.length}</span> : null}
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

          <li className="flex flex-col text-xl gap-10 items-start ml-12 mt-9 whitespace-nowrap w-52">
            {!currentUser &&
              <ul>
                <button className="flex items-center space-x-4 mr-3 p-2 hover:bg-gray-200 rounded-md w-52" onClick={() => loginWithRedirect()}>
                  <BiSolidUser className="w-7 text-3xl text-purple-moru" /><span>Iniciar Sesión</span>
                </button>
              </ul >
            }

            {!currentUser && 
            <Link to={`/registration`}>
              <ul className={`flex ${currentUser && 'hidden'} p-2 hover:bg-gray-200 rounded-md w-52 items-center space-x-4 mr-3 ${selectedOption === "crearCuenta" ? 'bg-gray-200 ': ''}`}
              onClick={() =>{ setOpenMenu(false), setSelectedOption('crearCuenta')} }>
                <AiOutlineUserAdd className="w-7 text-3xl text-purple-moru" /><span>Crear Cuenta</span>
              </ul>
            </Link>
            }

            {/* currentUser.userRole !== 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul> */
            (!currentUser || GetLocalStorage() && currentUser.userRole === 'buyer' ) && 
              <Link to="/fav" >
                <ul onClick={() => { setOpenMenu(false), setSelectedOption('favoritos') }} className={`flex p-2 hover:bg-gray-200 rounded-md w-52 items-center space-x-4 mr-3 ${selectedOption === "favoritos" ? 'bg-gray-200 ': ''}`} >
                  <MdFavorite className="w-7 text-purple-moru text-3xl"/><span>Favoritos</span>
                </ul>
              </Link>
            }

            {!currentUser || GetLocalStorage() && currentUser.userRole === 'adminCommerce' && !currentUser.brand &&
              <Link  to={`/registrar-empresa`}>
                <ul className={`flex items-center space-x-4 mr-3 p-2 hover:bg-gray-200 rounded-md w-52 ${selectedOption === "registrarMarca" ? 'bg-gray-200 ': ''}`}
                  onClick={() =>{ setOpenMenu(false), setSelectedOption('registrarMarca')} }>
                  <AiOutlineUserAdd className="w-7 text-3xl text-purple-moru" /><span className="w-28">Registrar marca</span>
                </ul>
              </Link>
            }
            {currentUser && GetLocalStorage() && currentUser.userRole === 'adminCommerce' && currentUser.brand &&
              <div>
                <button>
                  <ul onClick={(e) => handleButtonClick(e) }
                  className={`flex p-2 hover:bg-gray-200 rounded-md w-52  ${selectedOption === 'tienda' ? 'bg-gray-200 ': ''}`} >
                    <PiStorefrontDuotone className="w-7 text-purple-moru text-3xl"/>
                    <span className="w-28 ml-4">Mis tiendas</span>  
                    <IoIosArrowDown className="w-7 ml-2 text-3xl text-purple-moru "/>
                  </ul>
                </button>

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
            }

            {/* {isAuthenticated && (
              <ul onClick={() => { setOpenMenu(false) }} className="order-3 flex justify-center space-x-4 mr-5" ><MdAccountCircle className="w-7 text-purple-moru text-3xl"></MdAccountCircle><Link to="/cuenta">Cuenta</Link></ul>)} */}
            <Link to="/mapa">
              <ul onClick={() => { setOpenMenu(false), setSelectedOption('ubication') }} className={`flex items-center space-x-4  mr-3 justify-start p-2 hover:bg-gray-200 rounded-md w-52  ${selectedOption === 'ubication' ? 'bg-gray-200 ': ''}`}>
                <FaMapMarkerAlt className="w-7 text-purple-moru text-3xl"/>
                <span className="whitespace-normal w-28">Buscar por ubicación</span>
              </ul>
            </Link>
                    
            <Link to="/support">
              <ul onClick={() => { setOpenMenu(false), setSelectedOption('soporte') }} className={`flex items-center space-x-4 mr-3 justify-start p-2 hover:bg-gray-200 rounded-md w-52 ${selectedOption === 'soporte' ? 'bg-gray-200 ': ''}`} >
                <BiSupport className="w-7 text-purple-moru text-3xl"/>
                <span>Soporte</span>
              </ul>
            </Link>

            
            {currentUser &&
              <ul>
                <button className="flex items-center space-x-4 mr-3 p-2 hover:bg-gray-200 rounded-md w-52" onClick={handleLogOut}>
                  <MdLogout className="w-7 text-3xl text-purple-moru"/><span>Cerrar sesión</span>
                </button>
              </ul> 
            }
          </li>
        </div>
      </div>
    </nav>
  )
}

export default Nav