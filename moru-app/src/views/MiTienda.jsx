import backgroundDefault from "../images/background-perfil-shop.jpeg"
import { BsFillCameraFill } from "react-icons/bs"
import { BsFillSendFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import slide1 from "../images/slide.jpeg"
import { HiPencil } from "react-icons/hi"
import {
  GetLocalStorage,
  GetLocalStorageCommercesByOwner,
} from "../localStorage/GetLocalStorage"
import { useEffect, useState } from "react"
import {
  getBrandByOwner,
  getInfoBranch,
  getReviews,
  postReview,
} from "../services/services"
import { BiSolidCloudUpload } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"
import Product from "../components/Product"
import { createSelector } from "reselect"
import Loader from "../components/Loader"
import { Stars } from "../components/Stars"
import { ReseñasContainer } from "../components/ReseñasContainer"
import { FaMapMarker, FaClock, FaPhoneAlt } from "react-icons/fa" // Importa los íconos necesarios

const MiTienda = () => {
  const { id } = useParams()
  const [branchData, setBranchData] = useState(null)
  const currentUser = GetLocalStorage()
  const [isReviewInputVisible, setIsReviewInputVisible] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [starRating, setStarRating] = useState(0)
  const [reviews, setReviews] = useState(null)

  const selectProductsSede = createSelector(
    (state) => state.allProducts.allProducts,
    (_, id) => id,
    (allProducts, id) => allProducts.filter((p) => p.commercebranchId === id)
  )
  const productsSede = useSelector((state) => selectProductsSede(state, id))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfoBranch(id)
        setBranchData(data)
        const reviews = (await getReviews(id)).newRatingArray
        setReviews(reviews)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    window.scrollTo(0, 0);
  }, [id])

  const idBrandCommerce = productsSede[productsSede.length - 1]?.commerceId
    ? productsSede[productsSede.length - 1]?.commerceId
    : null

  const idBrandUser = currentUser?.brand ? currentUser.brand.id : null

  const esDueño = idBrandUser === idBrandCommerce || null === idBrandCommerce

  const handleOnChange = async (event) => {
    await uploadImageClaudinary(event) // esta función sube la imagen a claudinary y entrega la URL para mandarselo al back
    console.log(await uploadImageClaudinary(event)) //url creada mostrada en consola
  }

  const handleReviewClick = () => {
    setIsReviewInputVisible(true)
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    const reviewData = {
      idSucursal: id,
      commerceId: branchData.commerceId,
      userId: currentUser.id,
      reviewText: reviewText,
      starRating: starRating,
    }

    try {
      const response = await postReview(reviewData)
      window.location.reload()
      setReviewText("")
      setIsReviewInputVisible(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRatingChange = (newRating) => {
    setStarRating(newRating)
  }

  return (
    <div className="grid gap-4 max-w-7xl mx-auto font-roboto-slab w-full mt-5">
      <div>
        <div>
          {branchData ? (
            <div className="mx-auto w-full md:w-3/4 lg:w-1/2">
              <h1 className="pt-5 text-3xl text-center font-bold text-purple-moru">
                {branchData.alias}
              </h1>

              <div className="flex mx-3 flex-wrap justify-center">
                <div className="flex mt-4 items-center">
                  <FaMapMarker className="text-purple-moru justify-center" />
                  <p className="ml-2 text-purple-moru">{branchData.address}</p>
                </div>

                <div className="flex mt-4 mr-5 ml-5  items-center justify-center ">
                  <FaClock className="text-purple-moru" />
                  <p className="ml-2 text-purple-moru">{branchData.schedule}</p>
                </div>

                <div className="flex mt-4 items-center justify-center">
                  <FaPhoneAlt className="text-purple-moru" />
                  <p className="ml-2 text-purple-moru">{branchData.phone}</p>
                </div>
              </div>

              {esDueño && (
                <div className="flex justify-center items-center space-x-2 mt-2 flex-wrap">
                  <ul className="">
                    <Link
                      className="m-3 flex items-center space-x-3 bg-purple-moru text-white hover:bg-gray-300 hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full"
                      to={{
                        pathname: "/publicar-producto",
                        search: id,
                      }}>
                      <BiSolidCloudUpload className="   text-2xl" />
                      <span>Publicar producto</span>
                    </Link>
                  </ul>

                  <ul className="">
                    <Link
                      className=" flex items-center space-x-3 bg-purple-moru text-white hover:bg-gray-300 hover:text-purple-moru hover:border-purple-moru font-bold py-2 px-4 rounded-full"
                      to={{
                        pathname: "/estado-productos",
                        search: branchData.id,
                      }}>
                      <BsFillSendFill className="text-xl " />{" "}
                      <span>Productos pedidos</span>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>

        <div className="w-full">
          <div className="w-full lg:w-8/12 float-left">
            {/* Centrar el contenido de Productos de esta sede */}
            {productsSede.length ? (
              <div className="p-6 lg:px-28 mx-auto">
                <h1 className="text-purple-moru py-4 font-bold text-2xl">
                  Productos de esta sede
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {productsSede.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="p-6 lg:px-28 mx-auto">
                  <h1 className="text-purple-moru py-4 font-bold">
                    No hay productos en esta sede
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-4/12 float-left">
          <ReseñasContainer reviews={reviews} />
          {currentUser?.userRole === "buyer" && (
            <button
              className="order-2 flex justify-start p-2 hover:bg-gray-200 rounded-md w-52 space-x-4"
              onClick={handleReviewClick}>
              <BiSolidCloudUpload className="w-7 text-purple-moru text-3xl" />
              Dejar una reseña
            </button>
          )}
          {isReviewInputVisible && (
            <div className="mt-4 flex justify-center items-center">
              <form onSubmit={handleReviewSubmit}>
                <Stars score={starRating} onChange={handleRatingChange} />
                <textarea
                  className="w-1/2 p-2 border rounded-md"
                  placeholder="Escribe tu reseña aquí"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 bg-purple-moru text-white px-4 py-2 rounded">
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MiTienda
