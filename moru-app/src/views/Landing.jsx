import image from '../images/image.png';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="fixed inset-0 overflow-hidden bg-cover bg-center h-screen" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
            <div className="h-screen flex flex-col justify-start items-center">
                <div className="mt-auto flex flex-col items-center">
                    <button
                        className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg ">
                        <Link to="/">Ingreso (solo vista)</Link>
                    </button>
                    <button className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg " >Cuenta Usuario</button>
                    <button className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg " >Cuenta Empresarial</button>
                </div>
            </div>
        </div>
    )
}

export default Landing;
