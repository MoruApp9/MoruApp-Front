import { useState, useEffect } from "react";
import { GetLocalStorage } from "../../localStorage/GetLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanProductsOrderedFromStore,
  setProductsOrderedToStore,
  updateStatus,
} from "../../redux/productsOrderedSlice";
import { updateStatusFiltered } from "../../redux/productsOrderedFilteredSlice";
import {
  cleanProductsOrderedFilteredFromStore,
  setProductsOrderedFilteredToStore,
} from "../../redux/productsOrderedFilteredSlice";
//import { getBranchOrders, putOrderStatus } from "../../services/services";
import { getBranchOrders } from "../../services/sucursalStoreServices";
import { putOrderStatus } from "../../services/productServices";
import Swal from "sweetalert2";
import Product from "../ProductComponents/Product";

const OrdersForBranch = ({ id }) => {
  const currentUser = GetLocalStorage();

  const productsOrderedFromStore = useSelector(
    (state) => state.productsOrdered
  );

  const productsOrderedFilteredFromStore = useSelector(
    (state) => state.productsOrderedFiltered
  );

  const [selectedState, setSelectedState] = useState("Todos");

  const dispatch = useDispatch();

  const updateStore = async () => {
    const response = await getBranchOrders(id);
    dispatch(setProductsOrderedToStore(response));
  };

  useEffect(() => {
    updateStore();
    //window.scrollTo(0, 0)

    if (
      selectedState === "Recibido" &&
      productsOrderedFilteredFromStore.length === 0
    ) {
      setSelectedState("Todos");
    }

    if (
      selectedState === "Preparando" &&
      productsOrderedFilteredFromStore.length === 0
    ) {
      setSelectedState("Todos");
    }
    if (
      selectedState === "Enviado" &&
      productsOrderedFilteredFromStore.length === 0
    ) {
      setSelectedState("Todos");
    }
    return () => {
      dispatch(cleanProductsOrderedFilteredFromStore());
      dispatch(cleanProductsOrderedFromStore());
    };
  }, []);

  const handleTodosButton = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    setSelectedState("Todos");
    dispatch(cleanProductsOrderedFilteredFromStore());
  };

  const handleRecibidoButton = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const pendingsProducts = productsOrderedFromStore.filter(
      (product) => product.status === "recibido"
    );
    pendingsProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(pendingsProducts)),
        setSelectedState("Recibido"))
      : Swal.fire("Oops...", "No hay productos Recibidos", "info");
  };

  const handlePreparandoButton = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const sentProducts = productsOrderedFromStore.filter(
      (product) => product.status === "preparando"
    );
    sentProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(sentProducts)),
        setSelectedState("Preparando"))
      : Swal.fire("Oops...", "No hay productos preparando", "info");
  };

  const handleEnviadoButton = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const finishedProducts = productsOrderedFromStore.filter(
      (product) => product.status === "enviado"
    );
    finishedProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(finishedProducts)),
        setSelectedState("Enviado"))
      : Swal.fire("Oops...", "No hay productos enviados", "info");
  };

  const handleFinalizadoButton = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const finishedProducts = productsOrderedFromStore.filter(
      (product) => product.status === "finalizado"
    );
    finishedProducts.length
      ? (dispatch(setProductsOrderedFilteredToStore(finishedProducts)),
        setSelectedState("Finalizado"))
      : Swal.fire("Oops...", "No hay productos finalizados", "info");
  };

  function handleClickChangeStatus (orderId) {
    const productFound = productsOrderedFilteredFromStore.find((product) => {
      return product.orderId === orderId
    })

    if(productFound) {
      Swal.fire({
        title: "Confirmación",
        text: `Deseas cambiar el estado del producto a ${productFound.status === "recibido" ? "Preparando" : productFound.status === "preparando" ? "enviado" : productFound.status === "enviado" ? "Finalizado" : null }`,
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        confirmButtonText: "Sí",
        confirmButtonColor: "#280a50" 
      }).then(async (response) => {
        if(response.isConfirmed) {
          try {
            const newStatus = productFound.status === "recibido" ? "preparando" : productFound.status === "preparando" ? "enviado" : productFound.status === "enviado" ? "finalizado" : null 
            const response = await putOrderStatus(productFound.orderId, newStatus);

            // Validar si fue cambiado el estado correctamente

            if(response.status === 200) {
              dispatch(updateStatus({
                productId: productFound.id,
                status: response.data.order.status
              }))
              dispatch(updateStatusFiltered(productFound.id));
            }
            Swal.fire(`Pedido ${productFound.status === "recibido" ? 'Preparando' : productFound.status === "preparando" ? 'Enviado' : productFound.status === "Enviado" ? "Finalizado" : null}`, response.data.message, "success");

          } catch (error) {
            
          }
        }
      })
    } else {
      console.log('No found')
    }

  }

  return (
    <div className="flex flex-col justify-center items-center">
    {/** Flechas */}
      <div className=" bg-white flex justify-center p-4 font-roboto-slab ">
        <button
          onClick={handleTodosButton}
          className={`flex items-center justify-start ${
            selectedState === "Todos" && "font-bold"
          }`}
        >
          <span className="absolute ml-4">Todos</span>
          <span className="relative">
            {/* icono de flecha */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="214"
              height="44"
              viewBox="0 0 214 44"
              fill="none"
            >
              <path
                d="M0.254883 0.25H191.638L212.696 21.0079L191.631 43.75H0.254883V0.25Z"
                stroke="black"
                strokeWidth="0.5"
              />
            </svg>
          </span>
        </button>

        <button
          onClick={handleRecibidoButton}
          className={`flex items-center justify-start ${
            selectedState === "Recibido" && "text-[#8B80F9]"
          }`}
        >
          <span className="absolute ml-7">Recibido</span>
          <span className="relative">
            {/* icono de flecha */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="217"
              height="44"
              viewBox="0 0 217 44"
              className={`${selectedState === "Recibido" ? "stroke-[#8B80F9] stroke-2" : "stroke-black stroke-[0.5]"} fill-none`}
            >
              <path
                d="M194.411 43.75H1.54178L22.1276 21.1684L22.2883 20.9922L22.1198 20.8234L1.57847 0.25H194.418L215.675 21.0079L194.411 43.75Z"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={handlePreparandoButton}
          className={`flex items-center justify-start ${
            selectedState === "Preparando" && "text-[#FFD901]"
          }`}
        >
          <span className="absolute ml-7">Preparando</span>
          <span className="relative">
            {/* Icono de flecha */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="217"
              height="44"
              viewBox="0 0 217 44"
              className={`${selectedState === "Preparando" ? "stroke-[#FFD901] stroke-2" : "stroke-black stroke-[0.5]"} fill-none`}
            >
              <path
                d="M194.411 43.75H1.54178L22.1276 21.1684L22.2883 20.9922L22.1198 20.8234L1.57847 0.25H194.418L215.675 21.0079L194.411 43.75Z"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={handleEnviadoButton}
          className={`flex items-center justify-start ${
            selectedState === "Enviado" && "text-[#5CB765]"
          }`}
        >
          <span className="absolute ml-7">Enviado</span>
          <span className="relative">
            {/* icono de flecha */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="217"
              height="44"
              viewBox="0 0 217 44"
              className={`${selectedState === "Enviado" ? "stroke-[#5CB765] stroke-2" : "stroke-black stroke-[0.5]"} fill-none`}
            >
              <path
                d="M194.411 43.75H1.54178L22.1276 21.1684L22.2883 20.9922L22.1198 20.8234L1.57847 0.25H194.418L215.675 21.0079L194.411 43.75Z"
              />
            </svg>
          </span>
        </button>
        <button
          onClick={handleFinalizadoButton}
          className={`flex items-center justify-start ${
            selectedState === "Finalizado" && "text-[#F4434F]"
          }`}
        >
          <span className="absolute ml-7">Finalizado</span>
          <span className="relative">
            {/* icono de flecha */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="217"
              height="44"
              viewBox="0 0 217 44"
              className={`${selectedState === "Finalizado" ? "stroke-[#F4434F] stroke-2" : "stroke-black stroke-[0.5]"} fill-none`}
            >
              <path
                d="M194.411 43.75H1.54178L22.1276 21.1684L22.2883 20.9922L22.1198 20.8234L1.57847 0.25H194.418L215.675 21.0079L194.411 43.75Z"
              />
            </svg>
          </span>
        </button>
      </div>
      {/** Fin de las flechas */}

      <table className="flex flex-col w-full border-collapse">
        <thead className={`flex border p-2 w-full bg-gray-300`}>
          <tr className="flex justify-around w-full items-center">
            <th className="w-10">Fecha</th>
            <th className="w-10">Producto</th>
            <th className="w-10">Precio</th>
            <th className="w-24">Estado</th>
            <th
              className={`${selectedState === "Finalizado" && "hidden"} ${
                selectedState === "Todos" && "hidden"
              } w-24`}
            >
              Cambiar estado
            </th>
            <th className="w-10">Cancelar</th>
          </tr>
        </thead>

        {productsOrderedFilteredFromStore.length > 0 ? (
          <tbody className="flex flex-col pt-2 justify-center w-full">
            {productsOrderedFilteredFromStore?.map((product) => (
              <tr
                key={product.orderId}
                className="flex justify-around border items-center p-2 w-full"
              >
                <td className="w-10">{product.date}</td>
                <td className="w-10">
                  {product.name.length > 10
                    ? `${product.name.slice(0, 10)}...`
                    : product.name}
                </td>
                <td className="w-10">{product.price}</td>
                <td className={`capitalize text-white rounded-xl p-2 ${(() => {
                      switch (product?.status) {
                        case "recibido":
                          return "bg-[#8B80F9]";
                        case "preparando":
                          return "bg-[#FFD901]";
                        case "enviado":
                          return "bg-[#5CB765]";
                        case "finalizado":
                          return "bg-[#F4434F]"
                        default:
                          return null;
                      }
                    })()} w-24 text-center`}>{product.status}</td>
                <td className={`${selectedState === "Finalizado" && "hidden"} w-24 items-center`}>
                {/**Boton para cambiar de estado el producto */}
                  <button
                    className={`btn p-2 flex gap-2 text-white rounded-xl ${
                      selectedState === "Finalizado" && "hidden"
                    } ${(() => {
                      switch (product?.status) {
                        case "recibido":
                          return "bg-[#FFD901] fill-[#FFD901]";
                        case "preparando":
                          return "bg-[#5CB765] fill-[#5CB765]";
                        case "enviado":
                          return "bg-[#F4434F] fill-[#F4434F]";
                        default:
                          return null;
                      }
                    })()}`}

                    onClick={() => handleClickChangeStatus(product.orderId)}
                  >
                    {(() => {
                      switch (product?.status) {
                        case "recibido":
                          return "Preparar";
                        case "preparando":
                          return "Enviar";
                        case "enviado":
                          return "Finalizar";
                        default:
                          return null;
                      }
                    })()}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                    >
                      <ellipse
                        cx="11.1003"
                        cy="10.5"
                        rx="10.5515"
                        ry="10.5"
                        fill="white"
                      />
                      <path
                        d="M7.90093 15.7427C7.70394 15.5737 7.59316 15.3443 7.59295 15.1051C7.59273 14.8659 7.70311 14.6364 7.8998 14.467L13.0932 9.99678L7.89184 5.5357C7.70043 5.36572 7.59439 5.13793 7.59657 4.90139C7.59875 4.66484 7.70898 4.43847 7.9035 4.27104C8.09803 4.1036 8.36129 4.00849 8.63659 4.00619C8.91189 4.00389 9.17719 4.09459 9.37537 4.25875L15.3196 9.35699C15.5166 9.526 15.6274 9.75532 15.6276 9.99454C15.6278 10.2338 15.5175 10.4633 15.3208 10.6326L9.3856 15.7414C9.18885 15.9107 8.92192 16.0059 8.6435 16.0062C8.36509 16.0064 8.09798 15.9116 7.90093 15.7427Z"
                      />
                    </svg>
                  </button>
                </td>
                <td className="items-center">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 0C15.5 0 20 4.5 20 10C20 15.5 15.5 20 10 20C4.5 20 0 15.5 0 10C0 4.5 4.5 0 10 0ZM10 2C8.1 2 6.4 2.6 5.1 3.7L16.3 14.9C17.3 13.5 18 11.8 18 10C18 5.6 14.4 2 10 2ZM14.9 16.3L3.7 5.1C2.6 6.4 2 8.1 2 10C2 14.4 5.6 18 10 18C11.9 18 13.6 17.4 14.9 16.3Z"
                        fill="#61696D"
                        fillOpacity="0.6"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : 
        // Este es el body que se muestra en "Todos"
        (
          <tbody className="flex flex-col pt-2 justify-center  w-full">
            {productsOrderedFromStore?.map((product) => (
              <tr
                key={product.orderId}
                className="flex justify-around border p-2 items-center w-full"
              >
                <td className="w-10">{product.date}</td>
                <td className="w-10">
                  {product.name.length > 10
                    ? `${product.name.slice(0, 10)}...`
                    : product.name}
                </td>
                <td className="w-10">{product.price}</td>
                <td className={`w-24 text-center capitalize text-white rounded-xl p-2 ${(() => {
                      switch (product?.status) {
                        case "recibido":
                          return "bg-[#8B80F9]";
                        case "preparando":
                          return "bg-[#FFD901]";
                        case "enviado":
                          return "bg-[#5CB765]";
                        case "finalizado":
                          return "bg-[#F4434F]"
                        default:
                          return null;
                      }
                    })()}`}>{product?.status}</td>
                <td className="justify-center">
                  <button className="pr-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 0C15.5 0 20 4.5 20 10C20 15.5 15.5 20 10 20C4.5 20 0 15.5 0 10C0 4.5 4.5 0 10 0ZM10 2C8.1 2 6.4 2.6 5.1 3.7L16.3 14.9C17.3 13.5 18 11.8 18 10C18 5.6 14.4 2 10 2ZM14.9 16.3L3.7 5.1C2.6 6.4 2 8.1 2 10C2 14.4 5.6 18 10 18C11.9 18 13.6 17.4 14.9 16.3Z"
                        fill="#61696D"
                        fillOpacity="0.6"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default OrdersForBranch;
