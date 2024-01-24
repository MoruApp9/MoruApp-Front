import SideBarBranch from "../components/SideBarBranch";
import { useEffect, useState } from "react";
import AllProducts from "../components/AllProducts";
import ProductsForBranch from "../components/ProductsForBranch";
import { useParams } from "react-router-dom";
import { getInfoBranch, getBrandForId } from "../services/services";
import Loader from "../components/Loader";
import { FaMapMarker, FaClock, FaPhoneAlt } from "react-icons/fa";
import OrdersForBranch from "../components/OrdersForBranch";
import { FiMenu } from "react-icons/fi";

const ViewCommerceOwner = () => {
  const { id } = useParams();
  const [view, setView] = useState("tienda");
  const [branchData, setBranchData] = useState(null);
  const [brandData, setBrandData] = useState({});
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfoBranch(id);
        setBranchData(data);
        const brand = await getBrandForId(data.commerceId);
        setBrandData(brand);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  
  const handlerOpenMenu = () => {
    if(openMenu) {
      setOpenMenu(false)
    } else {
      setOpenMenu(true)
    }
  }
  return (
    <div className="flex">
      <div className="relative">
        <button className="block md:hidden p-6 bg-purple-moru rounded-r-full mt-4" onClick={handlerOpenMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="white"
          >
            <path
              d="M7.69408 0.264138C7.88996 0.433317 8 0.662742 8 0.901961C8 1.14118 7.88996 1.37061 7.69408 1.53978L2.52205 6.00545L7.69408 10.4711C7.88441 10.6413 7.98973 10.8691 7.98734 11.1057C7.98496 11.3422 7.87508 11.5685 7.68135 11.7358C7.48763 11.903 7.22557 11.9979 6.95161 12C6.67765 12.002 6.41372 11.9111 6.21666 11.7468L0.30592 6.64327C0.11004 6.47409 4.76837e-07 6.24467 4.76837e-07 6.00545C4.76837e-07 5.76623 0.11004 5.5368 0.30592 5.36762L6.21666 0.264138C6.4126 0.0950107 6.67831 0 6.95537 0C7.23243 0 7.49814 0.0950107 7.69408 0.264138Z"
            />
          </svg>
        </button>
        <div className={`${!openMenu && 'hidden'} md:block ${openMenu && 'absolute block bg-purple-moru'}`}>
          <SideBarBranch setView={setView} />
        </div>
      </div>
      {/** Aca empiezan las vistas */}
      <div className="mt-10">
        {view === "tienda" ? (
          <div>
            <div>
              {branchData ? (
                <div className="flex items-center justify-start mt-6 gap-8">
                  {/** Image */}
                  <div>
                    {brandData.image ? (
                      <img
                        className="w-24 h-24 rounded-full object-cover object-center mx-auto"
                        src={brandData.image}
                      />
                    ) : (
                      <img
                        className="w-24 h-24 rounded-full object-cover object-center mx-auto"
                        src="https://cdn-icons-png.flaticon.com/512/61/61205.png"
                      />
                    )}
                  </div>{" "}
                  {/**Cierre div image */}
                  {/** Apertura de div Info Branch */}
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold font-roboto-slab text-gray-700">
                      {branchData.alias}
                    </h1>
                    <div className="flex flex-col items-start flex-wrap justify-center">
                      <div className="flex items-center gap-2">
                        <FaMapMarker className="text-purple-moru justify-center" />
                        <p className="text-gray-700">{branchData.address}</p>
                      </div>

                      <div className="flex gap-2 items-center justify-center ">
                        <FaClock className="text-purple-moru" />
                        <p className="text-purple-moru">
                          {branchData.schedule}
                        </p>
                      </div>

                      {/* <div className="flex mt-4 items-center justify-center">
                        <FaPhoneAlt className="text-purple-moru" />
                        <p className="ml-2 text-purple-moru">
                          {branchData.phone}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </div>
            <ProductsForBranch id={id} />
          </div>
        ) : null}
        {/** Vista Pedidos */}
        {view === "pedidos" && <OrdersForBranch id={id} />}
      </div>
    </div>
  );
};

export default ViewCommerceOwner;
