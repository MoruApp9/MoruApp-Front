import { NavLink } from "react-router-dom";

const Registration = () => {
    return (
        <div>
            <h1>Para crear tu cuenta te pediremos algunos datos</h1>
            <h3>Solo te tomara unos minutos</h3>
            <NavLink className='' to="/registeruser">
                <p >Crear cuenta personal</p>
            </NavLink>
            <NavLink className='' to="/registershop">
                <p >Crear cuenta empresa</p>
            </NavLink>
        </div>
    );
};

export default Registration;