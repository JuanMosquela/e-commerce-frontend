import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

import { CircularProgress } from "@mui/material";
import ProductDetail from "../components/ProductDetail";

import { useSelector } from "react-redux";
import { useFetchSingleProductQuery } from "../redux/api/productApi";

const ProductDetailPage = () => {
  const location = useLocation();

  const { id } = useParams();

  console.log(id);

  const [loading, setLoading] = useState(true);

  const [productDetail, setProductDetail] = useState({});

  const { data, error, isLoading } = useFetchSingleProductQuery(id);

  console.log(data, error);

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
