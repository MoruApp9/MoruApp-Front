import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetLocalStorage } from "../../localStorage/GetLocalStorage";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ViewCommerce from "../../views/CommerceViews/ViewCommerce";
import ViewCommerceOwner from "../../views/CommerceViews/ViewCommerceOwner";

const Commerce = () => {
  const { id } = useParams();
  const currentUser = GetLocalStorage();

  const selectProductsSede = createSelector(
    (state) => state.allProducts.allProducts,
    (_, id) => id,
    (allProducts, id) => allProducts.filter((p) => p.commercebranchId === id)
  );
  const productsSede = useSelector((state) => selectProductsSede(state, id));


  const idBrandCommerce = productsSede[productsSede.length - 1]?.commerceId
    ? productsSede[productsSede.length - 1]?.commerceId
    : null;

  const idBrandUser = currentUser?.brand ? currentUser.brand.id : null;

  const isOwner = idBrandUser === idBrandCommerce || null === idBrandCommerce;

  return (
    <div>
      {isOwner ? <ViewCommerceOwner/> : <ViewCommerce/>}
    </div>
  );
};

export default Commerce;
