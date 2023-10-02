import { Link } from "react-router-dom";

const Registration = () => {
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center mx-3 sm:mx-0 bg-slate-300 bg-opacity-50 p-12 rounded">
                <div className="flex flex-col items-center ">
                    <h1 className="text-2xl font-roboto-slab text-center font-semibold">Para crear tu cuenta te pediremos <br /> algunos datos</h1>
                    <h3 className="text-base font-roboto-slab font-normal mt-3">Solo te tomará unos minutos</h3>
                </div>

                <div className="flex flex-col items-center gap-3 my-5">
                    <Link to="/registeruser">
                        <button
                            className="w-60 h-12 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white text-base font-semibold font-roboto-slab hover:bg-purple-moru-dark">
                            Crear cuenta personal
                        </button>
                    </Link>
                    <Link  to="/registershop">
                        <button
                            className="w-60 h-12 md:h-14 px-2 border border-purple-moru rounded-lg bg-purple-moru text-white font-semibold text-base font-roboto-slab hover:bg-purple-moru-dark">
                            Crear cuenta empresa
                        </button>
                    </Link>
                </div>
            </div>       
        </div>
    );
};

export default Registration;