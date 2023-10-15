import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { putBrand, getAllCommerces, getPendingCommerces } from "../services/services";


function Dashboard() {

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
    }, [])

    const approveRequest = (id) => {
        console.log(peticionesMarcas);
        const updated = peticionesMarcas.map((request) => {
            if (request.id === id) {
                return { ...request, status: "Aprobado" };
            }
        });
        setPeticionesMarcas(updated)
        putBrand(id, { status: "aprobado" })
    };


    const denyRequest = (id) => {
        const updated = peticionesMarcas.map((request) => {
            if (request.id === id) {
                return { ...request, status: "Rechazado" };
            }
        });
        setPeticionesMarcas(updated)
        putBrand(id, { status: "rechazado" })
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">RUT</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Descripción</th>
                        <th className="border border-gray-300 p-2">Estado</th>
                        <th className="border border-gray-300 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {peticionesMarcas.map((request) => (
                        <tr key={request.id}>
                            <td className="border border-gray-300 p-2">{request.rut}</td>
                            <td className="border border-gray-300 p-2">{request.name}</td>
                            <td className="border border-gray-300 p-2">{request.description}</td>
                            <td className="border border-gray-300 p-2">{request.status}</td>
                            <td className="border border-gray-300 p-2 w-1/4" >
                                {request.status === "pendiente" && (
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
                                            Rechazar
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
