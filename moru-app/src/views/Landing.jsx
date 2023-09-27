import image from '../images/image.png';
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className="fixed inset-0 overflow-hidden bg-cover bg-center h-screen" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
            <div className="h-screen flex flex-col justify-start items-center">
                <div className="mt-auto flex flex-col items-center">
                    <Link to='./Login'>
                        <button className="mb-2 text-purple-900 w-48 h-12 bg-white rounded-lg ">Cuenta Personal</button>
                    </Link>
                    <Link to='./Login'>
                        <button className="mb-16 text-purple-900 w-48 h-12 bg-white rounded-lg ">Cuenta Empresarial</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;
