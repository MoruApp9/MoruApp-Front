import React, { useEffect, useState } from "react";
import { putBrand, putBranch, putProduct, getAllCommerces, getAllBranches, getAllProducts } from "../services/services";
import { useAuth0 } from "@auth0/auth0-react";
import { MdLogout } from "react-icons/md";
import { DeleteLocalStorage } from "../localStorage/DeleteLocalStorage";

function Dashboard() {
    const [peticiones, setPeticiones] = useState([]);
    const [opcion, setOpcion] = useState("Marcas");
    const [selectedState, setSelectedState] = useState("Todos");
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const { user, logout } = useAuth0();

    useEffect(() => {
        const getRequests = async () => {
            try {
                let data;
                if (opcion === "Marcas") {
                    data = await getAllCommerces();
                } else if (opcion === "Sucursales") {
                    data = await getAllBranches();
                } else if (opcion === "Productos") {
                    data = await getAllProducts();
                }

                setPeticiones(data);
                setProductosFiltrados(data);
            } catch (error) {
                console.error(error);
            }
        };
        getRequests();
    }, [opcion]);

    const changeStatus = async (id, newStatus) => {
        try {
            if (opcion === "Marcas") await putBrand(id, { status: newStatus });
            else if (opcion === "Sucursales") await putBranch(id, { status: newStatus });
            else if (opcion === "Productos") await putProduct(id, { status: newStatus });

            const updatedRequests = peticiones.map((request) => {
                if (request.id === id) {
                    return { ...request, status: newStatus };
                }
                return request;
            });
            setPeticiones(updatedRequests);
            setProductosFiltrados(updatedRequests);

        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterChange = (event) => {
        const filterOption = event.target.value;
        setOpcion(filterOption);
        setSelectedState("Todos");
        setProductosFiltrados([]); // Reinicia los productos filtrados al cambiar la opción.
    };

    const handleTodosButton = () => {
        setSelectedState("Todos");
        setProductosFiltrados(peticiones); // Muestra todos los productos.
    };

    const handlePendientesButton = () => {
        setSelectedState("Pendientes");
        const pendientes = peticiones.filter((request) => request.status === "pendiente");
        setProductosFiltrados(pendientes);
    };

    const handleAprobadosButton = () => {
        setSelectedState("Aprobados");
        const aprobados = peticiones.filter((request) => request.status === "aprobado");
        setProductosFiltrados(aprobados);
    };

    const handleBaneadosButton = () => {
        setSelectedState("Baneados");
        const baneados = peticiones.filter((request) => request.status === "baneado");
        setProductosFiltrados(baneados);
    };

    const handleLogOut = () => {
        DeleteLocalStorage();
        logout({ returnTo: window.location.origin });
    }

    return (
        <div className="min-h-screen container mx-auto p-4">
            <button className="flex items-center space-x-2 mr-2 p-1 hover:bg-gray-200 rounded-md w-30" onClick={handleLogOut}>
                <MdLogout className="w-5 text-2xl text-purple-moru" /><span>Cerrar sesión</span>
            </button>
            <h1 className="text-2xl font-bold mb-4 text-purple-moru text-center">Panel de Administración</h1>

            <div className="flex flex-col md:flex-row items-center justify-center my-4 md:my-6 space-y-4 md:space-y-0 md:space-x-4 p-4">
                <select
                    value={opcion}
                    onChange={handleFilterChange}
                    className="w-full md:w-auto border rounded-full p-2"
                >
                    <option value="" disabled>
                        Filtrar
                    </option>
                    <option value="Marcas">Marcas</option>
                    <option value="Sucursales">Sucursales</option>
                    <option value="Productos">Productos</option>
                </select>

                <div className="bg-white flex flex-wrap space-x-2 md:space-x-4">
                    <button
                        onClick={handleTodosButton}
                        className={`w-full md:w-auto border-r p-2 ${selectedState === "Todos" && "font-bold"}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={handlePendientesButton}
                        className={`w-full md:w-auto border-r p-2 ${selectedState === "Pendientes" && "font-bold"}`}
                    >
                        Pendientes
                    </button>
                    <button
                        onClick={handleAprobadosButton}
                        className={`w-full md:w-auto border-r p-2 ${selectedState === "Aprobados" && "font-bold"}`}
                    >
                        Aprobados
                    </button>
                    <button
                        onClick={handleBaneadosButton}
                        className={`w-full md:w-auto p-2 ${selectedState === "Baneados" && "font-bold"}`}
                    >
                        Baneados
                    </button>
                </div>
            </div>


            {opcion && (
                <Tabla data={productosFiltrados} changeStatus={changeStatus} opcion={opcion} />
            )}
        </div>
    );
}

const Tabla = ({ data, changeStatus, opcion }) => {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Comercio</th>
                    <th className="border border-gray-300 p-2">RUT</th>
                    {opcion !== "Marcas" && (
                        <>
                            <th className="border border-gray-300 p-2">Sucursal</th>
                            {opcion === "Sucursales" && (
                                <th className="border border-gray-300 p-2">Dirección</th>
                            )}
                            {opcion === "Productos" && (
                                <>
                                    <th className="border border-gray-300 p-2">Producto</th>
                                    <th className="border border-gray-300 p-2">Descripción</th>
                                </>
                            )}
                        </>
                    )}
                    <th className="border border-gray-300 p-2">Estado</th>
                    <th className="border border-gray-300 p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data && data?.map((request) => (
                    <tr key={request.id}>
                        <td className="border border-gray-300 p-2">{request.name} </td>
                        <td className="border border-gray-300 p-2">{request.rut}</td>
                        {opcion !== "Marcas" && (
                            <>
                                <td className="border border-gray-300 p-2">{request.alias}</td>
                                {opcion === "Sucursales" && (
                                    <td className="border border-gray-300 p-2">{request.address}</td>
                                )}
                                {opcion === "Productos" && (
                                    <>
                                        <td className="border border-gray-300 p-2">{request.nameProduct}</td>
                                        <td className="border border-gray-300 p-2">{request.description}</td>
                                    </>
                                )}
                            </>
                        )}
                        <td className="border border-gray-300 p-2">{request.status}</td>

                        <td className="border border-gray-300 p-2 w-1/4">
                            {request.status === "pendiente" && (
                                <div>
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => changeStatus(request.id, "aprobado")}
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                        onClick={() => changeStatus(request.id, "rechazado")}
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            )}
                            {request.status === "aprobado" && (
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => changeStatus(request.id, "baneado")}
                                >
                                    Banear
                                </button>

                            )}
                            {request.status === "baneado" && (
                                <button
                                    className="bg-green-500 text-white px-2 py-1 m-1 rounded"
                                    onClick={() => changeStatus(request.id, "aprobado")}
                                >
                                    Quitar ban
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Dashboard;
