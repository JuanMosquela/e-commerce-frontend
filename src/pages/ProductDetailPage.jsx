import { useLocation } from "react-router-dom";
import { useState } from "react";

import { CircularProgress } from "@mui/material";
import ProductDetail from "../components/ProductDetail";

import { useFetchSingleProductQuery } from "../redux/api/productsApi";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);

  const [productDetail, setProductDetail] = useState({});

  const { data, isLoading } = useFetchSingleProductQuery(id);

  return (
    <section>
      <div className="min-height flex justify-center items-center ">
        {isLoading ? (
          <CircularProgress sx={{ color: "var(--color-orange)" }} size="5rem" />
        ) : (
          <ProductDetail data={data?.product} />
        )}
      </div>
    </section>
  );
};
export default ProductDetailPage;
