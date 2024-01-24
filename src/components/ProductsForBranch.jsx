import { useState, useEffect } from "react"
import { GetLocalStorage } from "../localStorage/GetLocalStorage"
import { createSelector } from "@reduxjs/toolkit"
import Product from "./Product"
import { useSelector } from "react-redux"


const ProductsForBranch = ({id}) => {

  const selectProductsSede = createSelector(
    (state) => state.allProducts.allProducts,
    (_, id) => id,
    (allProducts, id) => allProducts.filter((p) => p.commercebranchId === id)
  )
  const productsSede = useSelector((state) => selectProductsSede(state, id))

  return (
    <div>{
        productsSede?.length ? (
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
  )
}

export default ProductsForBranch