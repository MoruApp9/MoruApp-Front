import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { putBrand, getAllCommerces, getPendingCommerces } from "../services/services";


function Dashboard() {
    // Estado para almacenar las peticiones
    const [requests, setRequests] = useState([
        {
            id: 1,
            type: "Producto",
            name: "Producto 1",
            status: "Pendiente",
            details: "Detalles del Producto 1...",
        },
        {
            id: 2,
            type: "Producto",
            name: "Producto 2",
            status: "Pendiente",
            details: "Detalles de Producto 2...",
        },
        {
            id: 3,
            type: "Producto",
            name: "Producto 3",
            status: "Pendiente",
            details: "Detalles de Producto 3...",
        },
    ]);

    const [peticionesMarcas, setPeticionesMarcas] = useState([]);


    useEffect(() => {
        const getRequests = async () => {
            try {
                const peticiones = await getPendingCommerces()
                // await getPendingProducts()
                // await getPendingBranches()
                setPeticionesMarcas(peticiones)
            } catch (error) {
                console.error(error);
            }
        }
        getRequests()
    })

    // Función para aprobar una solicitud
    const approveRequest = (id) => {
        console.log(peticionesMarcas);
        peticionesMarcas.map((peticion) => {
            if (peticion.id === id) {
                peticion.status = "Aprobada"
            }
        }
        )
        putBrand()
        const updatedRequests = requests.map((request) => {
            if (request.id === id) {
                request.status = "Aprobada";
            }
            return request;
        });
        setRequests(updatedRequests);
        putBrand(id, "aprobado")
    };

    // Función para denegar una solicitud
    const denyRequest = (id) => {
        const updatedRequests = requests.map((request) => {
            if (request.id === id) {
                request.status = "Denegada";
            }
            return request;
        });
        setRequests(updatedRequests);
        putBrand(id, "denegado")
    };

    // Función para mostrar u ocultar los detalles de una solicitud
    const toggleDetails = (id) => {
        const updatedRequests = requests.map((request) => {
            if (request.id === id) {
                request.showDetails = !request.showDetails;
            }
            return request;
        });
        setRequests(updatedRequests);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Tipo</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Estado</th>
                        <th className="border border-gray-300 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td className="border border-gray-300 p-2">{request.type}</td>
                            <td className="border border-gray-300 p-2">{request.name}</td>
                            <td className="border border-gray-300 p-2">{request.status}</td>
                            <td className="border border-gray-300 p-2 w-1/4" >
                                {request.status === "Pendiente" && (
                                    <div >
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                            onClick={() => approveRequest(request.id)}
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                            onClick={() => denyRequest(request.id)}
                                        >
                                            Denegar
                                        </button>
                                    </div>
                                )}
                                <button
                                    className="text-2xl cursor-pointer ml-2"
                                    onClick={() => toggleDetails(request.id)}
                                >
                                    {request.showDetails ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </button>
                            </td>
                        </tr>
                    ))}
                    {requests.filter((request) => request.showDetails).map((request) => (
                        <tr key={`details-${request.id}`}>
                            <td className="border border-gray-300 p-2" colSpan="4">
                                Detalles: {request.details}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
