import shoppingIcon from "../images/icons/carrito-de-compras.png"
import sandwichIcon from "../images/icons/sandwich-icon.jpg"
import { Link } from "react-router-dom"
// import styles from './Nav.module.css'

const Nav = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-2  shadow-lg rounded-bl-lg rounded-br-lg">
      <Link>
        <img className="w-7" src={sandwichIcon} alt="sandwichIcon" />
      </Link>
      <Link>
        <img className="w-12" src={shoppingIcon} alt="shoppingIcon" />
      </Link>
    </nav>
  );
};

export default Nav
