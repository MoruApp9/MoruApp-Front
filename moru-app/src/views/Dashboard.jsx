import React, { useEffect, useState } from "react";
import { putBrand, getPendingCommerces, getPendingBranches, getPendingProducts, putBranch, putProduct } from "../services/services";

function Dashboard() {
    const [peticiones, setPeticiones] = useState([]);
    const [opcion, setOpcion] = useState("");

    useEffect(() => {
        const getRequests = async () => {
            try {
                if (opcion === 'Marcas') {
                    const marcas = await getPendingCommerces();
                    setPeticiones(marcas);
                } else if (opcion === 'Sucursales') {
                    const sucursales = await getPendingBranches();
                    setPeticiones(sucursales);
                } else if (opcion === 'Productos') {
                    const productos = await getPendingProducts();
                    setPeticiones(productos);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getRequests()
    }, [opcion]);

    const approveRequest = async (id) => {
        try {
            await putRequest(id, "aprobado");
            const updatedRequests = peticiones.map(request => {
                if (request.id === id) {
                    return { ...request, status: "Aprobado" };
                }
                return request;
            });
            setPeticiones(updatedRequests);
        } catch (error) {
            console.error(error);
        }
    };

    const denyRequest = async (id) => {
        try {
            await putRequest(id, "rechazado");
            const updatedRequests = peticiones.map(request => {
                if (request.id === id) {
                    return { ...request, status: "Rechazado" };
                }
                return request;
            });
            setPeticiones(updatedRequests);
        } catch (error) {
            console.error(error);
        }
    };

    const putRequest = async (id, status) => {
        if (opcion === 'Marcas') await putBrand(id, { status });
        else if (opcion === 'Sucursales') await putBranch(id, { status });
        else if (opcion === 'Productos') await putProduct(id, { status });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <select value={opcion} onChange={(event) => setOpcion(event.target.value)}>
                <option value="" disabled>Filtrar</option>
                <option value="Marcas">Marcas</option>
                <option value="Sucursales">Sucursales</option>
                <option value="Productos">Productos</option>
            </select>

            {opcion === 'Marcas' && (
                <Table
                    data={peticiones}
                    handleApprove={approveRequest}
                    handleDeny={denyRequest}
                    opcion={opcion}
                />
            )}

            {opcion === 'Sucursales' && (
                <Table
                    data={peticiones}
                    handleApprove={approveRequest}
                    handleDeny={denyRequest}
                    opcion={opcion}
                />
            )}

            {opcion === 'Productos' && (
                <Table
                    data={peticiones}
                    handleApprove={approveRequest}
                    handleDeny={denyRequest}
                    opcion={opcion}
                />
            )}
        </div>
    );
}

const Table = ({ data, handleApprove, handleDeny, opcion }) => {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Comercio</th>
                    <th className="border border-gray-300 p-2">RUT</th>
                    {opcion !== "Marcas" && (<>
                    <th className="border border-gray-300 p-2">Sucursal</th>
                    {opcion === "Sucursales" && <th className="border border-gray-300 p-2">Dirección</th>}
                    {opcion === "Productos" && (<>
                    <th className="border border-gray-300 p-2">Producto</th> 
                    <th className="border border-gray-300 p-2">Descripción</th>
                    </>)}
                    </>)}
                    <th className="border border-gray-300 p-2">Estado</th>
                    <th className="border border-gray-300 p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((request) => (
                    <tr key={request.id}>
                        <td className="border border-gray-300 p-2">{request.name} </td>
                        <td className="border border-gray-300 p-2">{request.rut}</td>
                        {opcion !== "Marcas" && (<>
                            <td className="border border-gray-300 p-2">{request.alias}</td>
                            {opcion === 'Sucursales' && <td className="border border-gray-300 p-2">{request.address}</td>}
                            {opcion === "Productos" && (
                                <>
                                    <td className="border border-gray-300 p-2">{request.nameProduct}</td>
                                    <td className="border border-gray-300 p-2">{request.description}</td>
                                </>
                            )}
                        </>)}
                        <td className="border border-gray-300 p-2">{request.status}</td>

                        <td className="border border-gray-300 p-2 w-1/4">
                            {request.status === "pendiente" && (
                                <div>
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleApprove(request.id)}
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                        onClick={() => handleDeny(request.id)}
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
    );
};

export default Dashboard;
