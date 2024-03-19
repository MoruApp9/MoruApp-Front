import { useLocation } from "react-router-dom"
import { getBranchOrders } from "../../services/services"
import { useEffect } from "react"
import { useState } from "react"

const OrderDetail = () => {
  const location = useLocation()
  const [orderDetail, setOrderDetail] = useState({})

  const branchID = location.search.slice(1)

  const getOrderDetail = async () => {
    const response = await getBranchOrders(branchID)
    //console.log(response)
    setOrderDetail(response[0])
  }

  useEffect(() => {
    getOrderDetail()
  }, [])

  const translateState = () => {
    switch (
        orderDetail.status // product?.status
    ) {
      case "recibido":
        return "Recibido"

      case "preparando":
        return "Preparando"

      case "enviado":
        return "Enviado"

      case "finalizado":
        return "Finalizado"
    }
  }

  return (
    <section className=" font-roboto-slab  rounded-3xl my-14 max-w-4xl mx-auto shadow-xl">
      <div className="flex flex-col items-center py-11">
        <img className="rounded-full border  w-60 mb-4 shadow-lg" src={orderDetail.image} alt="" />
        <h1 className="text-purple-moru text-lg font-bold ">{orderDetail.name}</h1>
      </div>

      <div className="flex flex-wrap space-y-5 justify-evenly pb-11 sm:space-y-0 ">
        <div className="">
            <h2 className="font-bold mb-2 text-purple-moru">Descripción del pedido</h2>
            <p>Precio: {orderDetail.price}</p>
            <p>Cantidad: {orderDetail.quantity}</p>
            <p>Fecha del pedido: {orderDetail.date}</p>
            <p>Estado del pedido: {translateState()}</p>
        </div>

        <div className="">
            <h2 className="font-bold mb-2 text-purple-moru">Datos del comprador</h2>
            <p>Nombre: {orderDetail.client?.nameClient} {orderDetail.client?.lastname}</p>
            <p>Email: {orderDetail.client?.email}</p>
            {orderDetail.client?.phone && <p>Teléfono: {orderDetail.client?.phone}</p>}
            <p>País: {orderDetail.client?.country}</p>
            <p>Departamento: {orderDetail.client?.department}</p>
            <p>Municipalidad: {orderDetail.client?.municipality}</p>
        </div>
      </div>
    </section>
  )
}

export default OrderDetail
