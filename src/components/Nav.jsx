/* eslint-disable react/prop-types */
//TODO usar iconos de react
import { AiFillHome } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { BiSolidCloudUpload } from "react-icons/bi";
import { PiStorefrontDuotone } from "react-icons/pi";
import logoMoru from "../images/LogoFooter.png";
import { FiMenu } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanProductsFiltered } from "../redux/productsFilteredSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLocalStorage,
  GetLocalStorageCommercesByOwner,
} from "../localStorage/GetLocalStorage";
import { IoIosArrowDown } from "react-icons/io";
import {
  DeleteLocalStorage,
  DeleteLocalStorageCommercesByOwner,
} from "../localStorage/DeleteLocalStorage";
import { MdLogout } from "react-icons/md";
import { FaHtml5, FaMapMarkerAlt } from "react-icons/fa";
import {
  getBrandByOwner,
  getChart,
  getFavorites,
  getInfoBranch,
  getProducts,
  getUser,
} from "../services/services";
import { addFav } from "../redux/favoritesSlice";
import { addToCart } from "../redux/cartSlice";
import SearchBar from "./SearchBar";
import { createSelector } from "reselect";
import SideBarBranch from "./SideBarBranch";

const Nav = ({ user }) => {
  const { pathname } = useLocation();
  const currentUser = GetLocalStorage();
  const [branchData, setBranchData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenNav, setDropdownOpenNav] = useState(false);
  const [isDropdownOpenMore, setIsDropdownOpenMore] = useState(false);
  const { loginWithRedirect, logout } = useAuth0();

  const favsStore = useSelector((state) => state.favorites);
  const chartStore = useSelector((state) => state.cart.cart);
  const allProductsStore = useSelector(
    (state) => state.allProducts.allProducts
  );
  const id = pathname.split("/tienda/")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfoBranch(id);
        setBranchData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [pathname]);
  {
    /** Productos de la branch */
  }

  const selectProductsSede = createSelector(
    (state) => state.allProducts.allProducts,
    (_, id) => id,
    (allProducts, id) => allProducts.filter((p) => p.commercebranchId === id)
  );
  const productsSede = useSelector((state) => selectProductsSede(state, id));

  const idBrandCommerce = productsSede[productsSede.length - 1]?.commerceId
    ? productsSede[productsSede.length - 1]?.commerceId
    : null;

  const idBrandUser = currentUser?.brand ? currentUser.brand.id : null;

  const isOwner = idBrandUser === idBrandCommerce || null === idBrandCommerce;

  const sedes = GetLocalStorageCommercesByOwner();
  // console.log(currentUser);

  useEffect(() => {
    !allProductsStore.length && dispatch(getProducts());

    const handleFavsAndChart = async () => {
      if (user) {
        await getUser(user.email);
        const dataUser = GetLocalStorage();

        if (user && dataUser?.userRole === "buyer") {
          if (!favsStore.length) {
            const userFavs = await getFavorites(dataUser.id);
            userFavs?.forEach((fav) => dispatch(addFav(fav)));
          }

          if (!chartStore.length) {
            const userChart = await getChart(dataUser.id);
            userChart?.forEach((product) => dispatch(addToCart(product)));
          }
        }
      }
    };
    handleFavsAndChart();
  }, [dispatch, user, favsStore, chartStore]);

  const handleLogOut = () => {
    DeleteLocalStorage();
    DeleteLocalStorageCommercesByOwner();
    logout({ returnTo: window.location.origin });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setSelectedOption("tienda");
    setDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClickNav = (e) => {
    e.preventDefault();
    setSelectedOption("tienda");
    setDropdownOpenNav(!isDropdownOpenNav);
    setIsDropdownOpenMore(false);
  };

  const handleButtonClickMore = (e) => {
    e.preventDefault();
    setIsDropdownOpenMore(!isDropdownOpenMore);
    setDropdownOpenNav(false);
  };

  const handleOptionClick = (e, option, id) => {
    e.preventDefault();
    setSelectedOption(option);
    setOpenMenu(false);
    navigate(`/tienda/${id}`);
    setDropdownOpenNav(false);
  };

  const handleOnClickMenu = () => {
    dispatch(cleanProductsFiltered()), setSelectedOption("");
  };

  return (
    <nav
      className={`flex flex-col sticky top-0 z-40 font-roboto-slab `}
      style={{
        background:
          "linear-gradient(to right, #260d4f 0%, #391376 50%, #561db2 100%)",
      }}
    >
      <div className="flex w-full px-2 sm:px-6 py-2 shadow-lg rounded-b-xl font-roboto-slab z-10 items-center h-24 justify-center">
        <div className="flex space-x-6 whitespace-nowrap items-center">
          <button
            onClick={() => {
              setOpenMenu(true);
            }}
            className="hover:bg-purple-moru rounded-md transition-all duration-300 ease-in-out"
          >
            {isOwner && pathname.includes('/tienda') ? null : <FiMenu className="text-4xl text-white"/>}
            
          </button>

          {/* {!user && <button className="hidden md:block text-purple-moru hover:bg-gray-200 p-1 rounded-md" onClick={() => loginWithRedirect()}>
            Iniciar Sesión
          </button>}

          {!user && <Link  className='hidden md:block text-purple-moru hover:bg-gray-200 p-1 rounded-md' to={`/registration`}>
            <p>Crear Cuenta</p>
          </Link>} */}
        </div>
        {/* Logo de Moru */}
        <div className="flex md:justify-start md:ml-5 ml-0 justify-center items-center w-full">
          <Link onClick={handleOnClickMenu} to="/" className="w-28">
            <img src={logoMoru} />
          </Link>
        </div>
        {/* //* SearchBar e Iconos de acceso rapido **/}
        <div className="flex gap-4 items-center">
          <div className="md:block hidden">
            <SearchBar />
          </div>
          {currentUser?.brand?.status === "aprobado" &&
          currentUser &&
          GetLocalStorage() &&
          currentUser.userRole === "adminCommerce" &&
          currentUser.brand ? (
            <div>
              {/** //* Acceso rapido sucursales */}
              <button>
                <ul
                  onClick={(e) => handleButtonClickNav(e)}
                  className={`flex p-2 hover:text-purple-300 transition-all duration-100 ease-in-out rounded-md ${
                    selectedOption === "tienda" ? "text-white " : "text-white"
                  }`}
                >
                  {/* <PiStorefrontDuotone className="w-7 text-3xl" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    className="transition-all duration-100 ease-in-out fill-white hover:fill-current hover:text-purple-300"
                  >
                    <path d="M10.1941 15.1887L10.1931 24.2988H6.59928L6.60019 15.1887H10.1941ZM18.3054 13.3662H14.1039C13.6069 13.3662 13.2039 13.7742 13.2039 14.2775V18.5324C13.2039 19.0356 13.6069 19.4436 14.1039 19.4436H18.3054C18.8024 19.4436 19.2054 19.0356 19.2054 18.5324V14.2775C19.2054 13.7742 18.8024 13.3662 18.3054 13.3662ZM17.4046 15.1887V17.6211H15.0035V15.1887H17.4046ZM7.39936 6.07743H1.80158L1.8017 7.49259C1.8017 8.92737 2.85469 10.1132 4.22088 10.3008L4.40904 10.3201L4.60068 10.3266C6.0821 10.3266 7.29472 9.16133 7.3932 7.68662L7.39966 7.49259L7.39936 6.07743ZM14.7971 6.07743H9.19929L9.19958 7.49259C9.19958 8.92737 10.2526 10.1132 11.6188 10.3008L11.8069 10.3201L11.9986 10.3266C13.48 10.3266 14.6926 9.16133 14.7911 7.68662L14.7976 7.49259L14.7971 6.07743ZM22.1972 6.07743H16.5994L16.6003 7.49259C16.6003 8.92737 17.6533 10.1132 19.0195 10.3008L19.2076 10.3201L19.3993 10.3266C20.8807 10.3266 22.0933 9.16133 22.1918 7.68662L22.1983 7.49259L22.1972 6.07743ZM8.47286 1.8225H5.19144L2.96313 4.25493H7.73489L8.47286 1.8225ZM13.6423 1.8225H10.3568L9.61761 4.25493H14.3814L13.6423 1.8225ZM18.8073 1.8225H15.5262L16.2641 4.25493H21.0356L18.8073 1.8225ZM0.241978 4.54644L4.14049 0.29149C4.28241 0.136602 4.47209 0.0374341 4.67627 0.00868717L4.80026 0H19.1997C19.4084 0 19.6091 0.0733495 19.7689 0.205359L19.8594 0.29149L23.786 4.57841L23.8228 4.62567C23.9449 4.79051 24 4.97743 24 5.16102L23.9982 7.49259C23.9982 8.70052 23.5439 9.80104 22.799 10.6286L22.798 23.3887C22.798 23.8501 22.4595 24.2314 22.0202 24.2917L21.898 24.3L11.9942 24.2988L11.9951 14.2775C11.9951 13.7742 11.5921 13.3662 11.0951 13.3662H5.70022C5.20319 13.3662 4.80026 13.7742 4.80026 14.2775L4.79935 24.2988L2.10186 24.3C1.64625 24.3 1.2697 23.9571 1.21011 23.5124L1.20189 23.3887L1.20096 10.6286C0.505572 9.85608 0.0635091 8.84575 0.00775933 7.73221L0.00177174 7.49259L0.00154372 5.21353C-0.00813989 5.0467 0.0274385 4.87504 0.116655 4.718L0.176389 4.6255L0.241978 4.54644Z" />
                  </svg>
                  <IoIosArrowDown className="w-4 ml-1 text-3xl" />
                </ul>
              </button>

              {isDropdownOpenNav && (
                <div className="absolute w-60 sm:w-100 p-4 right-7 overflow-y-auto whitespace-normal bg-purple-moru rounded-md border">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    className="flex flex-col gap-5"
                  >
                    {sedes?.map((option, index) => (
                      <button
                        key={index}
                        onClick={(e) =>
                          handleOptionClick(e, option.alias, option.id)
                        }
                        role="menuitem"
                        className={`flex p-2 w-full flex text-white justify-center hover:bg-purple-moru-medium shadow-bottom shadow-md transition-all duration-300 ease-in-out ${
                          selectedOption === option.alias
                            ? "bg-gray-200 text-purple-moru"
                            : ""
                        }`}
                      >
                        {option.alias}
                      </button>
                    ))}
                  </div>

                  <Link
                    to={"/crearSucursal"}
                    onClick={() => {
                      setSelectedOption("crearSede"), setOpenMenu(false);
                    }}
                  >
                    <button
                      role="menuitem"
                      className={`p-2 w-full text-purple-moru border-purple-moru hover:text-purple-moru-medium mt-5 bg-gray-100 border-2 flex justify-center hover:bg-gray-300 transition-all duration-300 ease-in-out rounded-md ${
                        selectedOption === "crearSede"
                          ? "bg-gray-200 text-purple-moru"
                          : ""
                      }`}
                    >
                      Crear nueva sede
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : currentUser?.userRole === "adminCommerce" &&
            currentUser?.brand?.status === "pendiente" ? (
            <h5 className="text-purple-moru">Esperando aprobación</h5>
          ) : null}
          {
            // isAuthenticated
            // ? <Link to="/tienda"><PiStorefrontDuotone className="w-7 text-purple-moru text-4xl"></PiStorefrontDuotone></Link>
            // : currentUser.userRole !== 'adminCommerce' && (<Link to="/carrito-de-compras"><img className="w-12" src={shoppingIcon} alt="shoppingIcon" /></Link>)

            // * Acceso Rapido Carrito

            currentUser &&
            GetLocalStorage() &&
            currentUser.userRole === "adminCommerce" ? null : (
              <Link
                className={`flex items-center px-2 rounded-md transition-all duration-300 ease-in-out ${
                  selectedOption === "carrito" ? "bg-purple-moru " : ""
                }`}
                onClick={() => setSelectedOption("carrito")}
                to="/carrito-de-compras"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  className="fill-white hover:fill-purple-300"
                >
                  <path d="M7.20666 24.3C6.54605 24.3 5.98073 24.0623 5.51069 23.5868C5.04066 23.1113 4.80524 22.5391 4.80444 21.87C4.80444 21.2017 5.03986 20.6299 5.51069 20.1544C5.98153 19.6789 6.54685 19.4408 7.20666 19.44C7.86727 19.44 8.43299 19.6781 8.90383 20.1544C9.37466 20.6307 9.60968 21.2026 9.60888 21.87C9.60888 22.5382 9.37386 23.1105 8.90383 23.5868C8.43379 24.0631 7.86807 24.3008 7.20666 24.3ZM19.2178 24.3C18.5571 24.3 17.9918 24.0623 17.5218 23.5868C17.0518 23.1113 16.8163 22.5391 16.8155 21.87C16.8155 21.2017 17.051 20.6299 17.5218 20.1544C17.9926 19.6789 18.5579 19.4408 19.2178 19.44C19.8784 19.44 20.4441 19.6781 20.9149 20.1544C21.3858 20.6307 21.6208 21.2026 21.62 21.87C21.62 22.5382 21.385 23.1105 20.9149 23.5868C20.4449 24.0631 19.8792 24.3008 19.2178 24.3ZM6.18571 4.86L9.06838 10.935H17.4761L20.7792 4.86H6.18571ZM5.04466 2.43H22.761C23.2215 2.43 23.5718 2.63776 23.812 3.05329C24.0522 3.46882 24.0622 3.88881 23.842 4.31325L19.5781 12.0892C19.3579 12.4942 19.0628 12.8081 18.6929 13.0309C18.3229 13.2536 17.9174 13.365 17.4761 13.365H8.52788L7.20666 15.795H21.62V18.225H7.20666C6.30583 18.225 5.6252 17.8253 5.16477 17.0258C4.70435 16.2263 4.68433 15.4313 5.10472 14.6407L6.72621 11.664L2.40222 2.43H0V0H3.90361L5.04466 2.43Z" />
                </svg>
                {chartStore.length ? (
                  <span className="mr-2 bg-purple-moru text-white rounded-full w-5 text-center">
                    {chartStore.length}
                  </span>
                ) : null}
              </Link>
            )
          }

          {isOwner && pathname.includes("/tienda") ? (
            <div className="mb-1">
              <Link
                to={{
                  pathname: "/estado-productos",
                  search: branchData?.id,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  fill="none"
                  className="hover:fill-purple-300"
                >
                  <path
                    d="M16.2833 1H5.71667C4.42889 1 3.78556 1 3.26556 1.1956C2.77531 1.38334 2.33173 1.6906 1.96926 2.09351C1.6068 2.49642 1.3352 2.98414 1.17556 3.51879C1 4.09719 1 4.81239 1 6.24398V23.0487C1 24.0783 2.09444 24.6255 2.78667 23.9415C2.98087 23.7477 3.23558 23.6401 3.5 23.6401C3.76442 23.6401 4.01913 23.7477 4.21333 23.9415L4.75 24.4719C5.09023 24.8117 5.53659 25.0004 6 25.0004C6.46341 25.0004 6.90977 24.8117 7.25 24.4719C7.59023 24.1321 8.03659 23.9434 8.5 23.9434C8.96341 23.9434 9.40977 24.1321 9.75 24.4719C10.0902 24.8117 10.5366 25.0004 11 25.0004C11.4634 25.0004 11.9098 24.8117 12.25 24.4719C12.5902 24.1321 13.0366 23.9434 13.5 23.9434C13.9634 23.9434 14.4098 24.1321 14.75 24.4719C15.0902 24.8117 15.5366 25.0004 16 25.0004C16.4634 25.0004 16.9098 24.8117 17.25 24.4719L17.7867 23.9415C17.9809 23.7477 18.2356 23.6401 18.5 23.6401C18.7644 23.6401 19.0191 23.7477 19.2133 23.9415C19.9056 24.6255 21 24.0783 21 23.0487V6.24398C21 4.81239 21 4.09599 20.8244 3.51999C20.665 2.98507 20.3935 2.49707 20.031 2.09394C19.6685 1.6908 19.2249 1.38339 18.7344 1.1956C18.2144 1 17.5711 1 16.2833 1Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9.33335 11.8H16.5556M5.44446 11.8H6.00001M5.44446 7.59998H6.00001M5.44446 15.9999H6.00001M9.33335 7.59998H16.5556M9.33335 15.9999H16.5556"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            </div>
          ) : null}

          {isOwner && pathname.includes("/tienda/") ? (
            <div>
              <button>
                <ul
                  onClick={(e) => handleButtonClickMore(e)}
                  className={`flex p-2 text-white hover:text-purple-300 transition-all duration-100 ease-in-out rounded-md `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="fill-white hover:fill-purple-300"
                  >
                    <path d="M11.5294 5.33333C12.06 5.33333 12.4902 5.78105 12.4902 6.33333V11H16.9739C17.5045 11 17.9346 11.4477 17.9346 12C17.9346 12.5523 17.5045 13 16.9739 13H12.4902V17.6667C12.4902 18.2189 12.06 18.6667 11.5294 18.6667C10.9988 18.6667 10.5686 18.2189 10.5686 17.6667V13H6.08497C5.55435 13 5.12418 12.5523 5.12418 12C5.12418 11.4477 5.55435 11 6.08497 11H10.5686V6.33333C10.5686 5.78105 10.9988 5.33333 11.5294 5.33333ZM0 4.33333C0 1.94009 1.86401 0 4.1634 0H18.8954C21.1948 0 23.0588 1.94009 23.0588 4.33333V19.6667C23.0588 22.0599 21.1948 24 18.8954 24H4.1634C1.86401 24 0 22.0599 0 19.6667V4.33333ZM4.1634 2C2.92527 2 1.92157 3.04467 1.92157 4.33333V19.6667C1.92157 20.9553 2.92527 22 4.1634 22H18.8954C20.1336 22 21.1373 20.9553 21.1373 19.6667V4.33333C21.1373 3.04467 20.1336 2 18.8954 2H4.1634Z" />
                  </svg>
                  <IoIosArrowDown className="w-4 ml-1 text-3xl" />
                </ul>
              </button>

              {isDropdownOpenMore && (
                <div className="absolute w-60 sm:w-100 right-7 whitespace-normal bg-gray-100 p-2 rounded-md">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      className="flex p-2 w-full justify-center hover:text-gray-300 bg-purple-moru text-white transition-all duration-300 ease-in-out border-2 mb-1 rounded-md border-purple-moru"
                      role="menuitem"
                    >
                      Nuevo Pedido
                    </button>

                    <Link
                      to={{
                        pathname: "/publicar-producto",
                        search: id,
                      }}
                    >
                      <button
                        className="flex p-2 w-full justify-center border-purple-moru hover:text-gray-300 bg-purple-moru text-white transition-all duration-300 ease-in-out border-2 rounded-md"
                        role="menuitem"
                      >
                        Añadir Producto
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
        {/** //* Cierre Div accesos rapidos */}
      </div>

      {/* //* Menú desplegable */}
      <div
        onClick={() => {
          setOpenMenu(false);
        }}
        className={`${
          !openMenu && "hidden"
        } bg-gray-600/50 min-h-screen w-full fixed backdrop-blur-sm`}
      ></div>

      <div
        className={`${
          openMenu ? "w-72" : "w-0"
        } z-50 fixed bg-purple-moru rounded-tr-xl rounded-br-xl min-h-screen top-0 left-0 right-0 transition-all duration-300`}
      >
        <div className={`${!openMenu && "hidden"} pt-4`}>
          <button
            onClick={() => {
              setOpenMenu(false);
            }}
          >
            <FiMenu className="text-4xl text-white ml-3 mt-4"></FiMenu>
          </button>

          <li className="flex flex-col text-xl gap-10 items-start ml-12 mt-9 whitespace-nowrap w-52">
            {!currentUser && (
              <ul>
                <button
                  className="flex items-center space-x-4 mr-3 p-2 text-white hover:text-purple-moru hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md w-52"
                  onClick={() => loginWithRedirect()}
                >
                  <BiSolidUser className="w-7 text-3xl" />
                  <span>Iniciar Sesión</span>
                </button>
              </ul>
            )}

            {!currentUser && (
              <Link to={`/registration`}>
                <ul
                  className={`flex ${
                    currentUser && "hidden"
                  } p-2 hover:bg-gray-200 hover:text-purple-moru transition-all duration-200 ease-in-out rounded-md w-52 items-center space-x-4 mr-3 ${
                    selectedOption === "crearCuenta"
                      ? "bg-gray-200 text-purple-moru "
                      : "text-white"
                  }`}
                  onClick={() => {
                    setOpenMenu(false), setSelectedOption("crearCuenta");
                  }}
                >
                  <AiOutlineUserAdd className="w-7 text-3xl" />
                  <span>Crear Cuenta</span>
                </ul>
              </Link>
            )}

            {
              /* currentUser.userRole !== 'adminCommerce' && <ul onClick={() => { setOpenMenu(false) }} className="  order-2 flex justify-center space-x-4 " ><MdFavorite className="w-7 text-purple-moru text-3xl"></MdFavorite><Link to="/fav">Favoritos</Link></ul> */
              GetLocalStorage() && currentUser.userRole === "buyer" && (
                <Link to="/fav">
                  <ul
                    onClick={() => {
                      setOpenMenu(false), setSelectedOption("favoritos");
                    }}
                    className={`flex p-2  hover:bg-gray-200 hover:text-purple-moru transition-all duration-300 ease-in-out rounded-md w-52 items-center space-x-4 mr-3 ${
                      selectedOption === "favoritos"
                        ? "bg-gray-200 text-purple-moru"
                        : "text-white"
                    }`}
                  >
                    <MdFavorite className="w-7 text-3xl" />
                    <span>Favoritos</span>
                  </ul>
                </Link>
              )
            }
            {GetLocalStorage() && currentUser.userRole === "buyer" && (
              <Link to="/estado-productos">
                <ul
                  onClick={() => {
                    setOpenMenu(false), setSelectedOption("pedidos");
                  }}
                  className={`flex p-2 hover:text-purple-moru hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md w-52 items-center space-x-4 mr-3 ${
                    selectedOption === "pedidos"
                      ? "bg-gray-200 text-purple-moru"
                      : "text-white"
                  }`}
                >
                  <BsFillSendFill className="w-7 text-3xl" />
                  <span>Mis Pedidos</span>
                </ul>
              </Link>
            )}

            {!currentUser ||
              (GetLocalStorage() &&
                currentUser.userRole === "adminCommerce" &&
                !currentUser.brand && (
                  <Link to={`/registrar-empresa`}>
                    <ul
                      className={`flex items-center space-x-4 mr-3 p-2  hover:text-purple-moru hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md w-52 ${
                        selectedOption === "registrarMarca"
                          ? "bg-gray-200 text-purple-moru"
                          : "text-white"
                      }`}
                      onClick={() => {
                        setOpenMenu(false), setSelectedOption("registrarMarca");
                      }}
                    >
                      <AiOutlineUserAdd className="w-7 text-3xl" />
                      <span className="w-28">Registrar marca</span>
                    </ul>
                  </Link>
                ))}
            {currentUser?.brand?.status === "aprobado" &&
            currentUser &&
            GetLocalStorage() &&
            currentUser.userRole === "adminCommerce" &&
            currentUser.brand ? (
              <div>
                <button>
                  <ul
                    onClick={(e) => handleButtonClick(e)}
                    className={`flex p-2 hover:text-purple-moru hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md w-52  ${
                      selectedOption === "tienda"
                        ? "bg-gray-200 text-purple-moru "
                        : "text-white"
                    }`}
                  >
                    <PiStorefrontDuotone className="w-7 text-3xl" />
                    <span className="w-28 ml-4">Mis tiendas</span>
                    <IoIosArrowDown className="w-7 ml-2 text-3xl" />
                  </ul>
                </button>

                {isDropdownOpen && (
                  <div className="right-0 mt-2 w-52 max-h-48 overflow-y-auto whitespace-normal bg-gray-100 rounded-md">
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {sedes?.map((option, index) => (
                        <button
                          key={index}
                          onClick={(e) =>
                            handleOptionClick(e, option.alias, option.id)
                          }
                          role="menuitem"
                          className={`flex p-2 w-full text-left hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md ${
                            selectedOption === option.alias
                              ? "bg-gray-200 text-purple-moru"
                              : ""
                          }`}
                        >
                          {option.alias}
                        </button>
                      ))}
                    </div>

                    <Link
                      to={"/crearSucursal"}
                      onClick={() => {
                        setSelectedOption("crearSede"), setOpenMenu(false);
                      }}
                    >
                      <button
                        role="menuitem"
                        className={`flex p-2 w-full hover:text-purple-moru text-left hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md ${
                          selectedOption === "crearSede"
                            ? "bg-gray-200 text-purple-moru"
                            : ""
                        }`}
                      >
                        Crear nueva sede
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ) : currentUser?.userRole === "adminCommerce" &&
              currentUser?.brand?.status === "pendiente" ? (
              <h5 className="text-purple-moru">Esperando aprobación</h5>
            ) : null}

            {currentUser && (
              <Link to="/cuenta">
                <ul
                  onClick={() => {
                    setOpenMenu(false), setSelectedOption("cuenta");
                  }}
                  className={`flex items-center space-x-4  mr-3 justify-start p-2 hover:text-purple-moru hover:bg-gray-200 transition-all duration-200 ease-in-out rounded-md w-52 ${
                    selectedOption === "cuenta"
                      ? "bg-gray-200 text-purple-moru"
                      : "text-white"
                  }`}
                >
                  <MdAccountCircle className="w-7 text-3xl" />
                  <span>Cuenta</span>
                </ul>
              </Link>
            )}
            <Link to="/mapa">
              <ul
                onClick={() => {
                  setOpenMenu(false), setSelectedOption("ubication");
                }}
                className={`flex items-center space-x-4  mr-3 justify-start p-2  hover:text-purple-moru hover:bg-gray-200 transition-all duration-200 ease-in-out rounded-md w-52  ${
                  selectedOption === "ubication"
                    ? "bg-gray-200 text-purple-moru"
                    : "text-white"
                }`}
              >
                <FaMapMarkerAlt className="w-7 text-3xl" />
                <span className="whitespace-normal w-28">
                  Buscar por ubicación
                </span>
              </ul>
            </Link>

            <Link to="/support">
              <ul
                onClick={() => {
                  setOpenMenu(false), setSelectedOption("soporte");
                }}
                className={`flex items-center space-x-4 mr-3 justify-start p-2 hover:text-purple-moru hover:bg-gray-200 transition-all duration-200 ease-in-out rounded-md w-52 ${
                  selectedOption === "soporte"
                    ? "bg-gray-200 text-purple-moru"
                    : "text-white"
                }`}
              >
                <BsFillPeopleFill className="w-7 text-3xl" />
                <span>Nosotros</span>
              </ul>
            </Link>

            {currentUser && (
              <ul>
                <button
                  className="flex items-center space-x-4 mr-3 p-2 text-white hover:text-purple-moru hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-md w-52"
                  onClick={handleLogOut}
                >
                  <MdLogout className="w-7 text-3xl" />
                  <span>Cerrar sesión</span>
                </button>
              </ul>
            )}
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
