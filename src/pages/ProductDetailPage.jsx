import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import ProductDetail from "../components/ProductDetail";
import axios from "axios";
import { useFetchSingleProductQuery } from "../redux/productsApi";

const ProductDetailPage = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);

  const [productDetail, setProductDetail] = useState({});

  const { data, isLoading } = useFetchSingleProductQuery(id);

  console.log(data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://fit-commerce-api.onrender.com/api/products/${id}`
  //       );

  //       setProductDetail(data.product);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  return (
    <section>
      <div className="min-height flex justify-center items-center my-7">
        {isLoading ? (
          <CircularProgress sx={{ color: "var(--color-orange)" }} size="5rem" />
        ) : (
          <ProductDetail data={data.product} />
        )}
      </div>
    </section>
  );
};
export default ProductDetailPage;
