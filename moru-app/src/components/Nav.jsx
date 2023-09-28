import shoppingIcon from "../images/icons/carrito-de-compras.png"
import sandwichIcon from "../images/icons/sandwich-icon.jpg"
import { Link } from "react-router-dom"
import { LogOutButton } from '../components/LogOut'
import { useAuth0 } from '@auth0/auth0-react'

// import styles from './Nav.module.css'

const Nav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <nav className="flex justify-between items-center px-6 py-2  shadow-lg rounded-bl-lg rounded-br-lg">
      <Link>
        <img className="w-7" src={sandwichIcon} alt="sandwichIcon" />
      </Link>
      <div>
                {isAuthenticated ? <>
                    <LogOutButton /> 
                    </>
                    : <button onClick={() => loginWithRedirect()}>Ingresar</button>}
            </div>
      <Link>
        <img className="w-12" src={shoppingIcon} alt="shoppingIcon" />
      </Link>
    </nav>
  );
};

export default Nav
