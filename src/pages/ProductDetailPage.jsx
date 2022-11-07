import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import ProductDetail from "../components/ProductDetail";
import axios from "axios";

const ProductDetailPage = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);

  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://fit-commerce-api.onrender.com/api/products/${id}`
        );

        setProductDetail(data.product);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section>
      <div className="product-detail-container">
        {loading ? (
          <CircularProgress sx={{ color: "var(--color-orange)" }} size="5rem" />
        ) : (
          <ProductDetail productDetail={productDetail} />
        )}
      </div>
    </section>
  );
};
export default ProductDetailPage;
