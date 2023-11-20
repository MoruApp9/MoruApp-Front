import { useEffect } from "react";

const FAQ = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div className="min-h-screen">
            <h1 className="text-decoration: underline text-center text-xl italic mt-2 mb-7">NOSOTROS</h1>
            <div className="ml-5 mr-5">
            <div className="mt-4 mb-8">
                <h1 className="italic bg-gray-100">¿Quiénes somos?</h1>
                <h1>Mōru App es una herramienta diseñada para conectar comercios locales con consumidores de su municipio y subregión, 
                    fortaleciendo la economía local. Nace de la visión compartida de Estefanía, Gabriel, y Wilson, amigos desde la infancia, 
                    quienes junto con Cristian y Dumar combinan experiencias personales y profesionales diversas, los llevó a concebir Mōru . 
                    Inspirados por los desafíos de las compras locales y la necesidad de digitalización, buscan revolucionar la interacción entre 
                    comerciantes y clientes en sus comunidades</h1>
            </div>
            <div className="mt-4 mb-8">
                <h1 className="italic bg-gray-100">¿Cuál es el significado del nombre Mōru App?</h1>
                <h1>El nombre tiene un significado fuerte y relevante que conecta la idea de un centro comercial con el concepto digital de una app.</h1>
            </div>
            <div className="mt-4 mb-8">
                <h1 className="italic bg-gray-100">¿Cuál es nuestro eslogan?</h1>
                <h1>“Comercio local, ahora online”</h1>
            </div>
            <div className="mt-4 mb-8">
                <h1 className="italic bg-gray-100">¿Cuál es nuestro objetivo?</h1>
                <h1>Mōru App va enfocado a dinamizar la economía local y democratizar el comercio electrónico en todos los municipios de América Latina</h1>
            </div>
        </div>
        </div>
    )
}

export default FAQ;
