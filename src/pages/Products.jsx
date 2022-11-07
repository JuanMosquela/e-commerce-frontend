import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { ProductsContext } from "../context/SearchProductsProvider";
import { publicRequest } from "../utils/request-methods";

const Products = () => {
  const { searchedProducts, inputValue } = useContext(ProductsContext);

  const [dataProducts, setDataProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await publicRequest.get(`/products`);
        setDataProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container-products">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="grid-container">
          {!searchedProducts
            ? dataProducts?.products?.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <CardProduct product={product} />
                </Link>
              ))
            : searchedProducts?.results?.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <CardProduct product={product} />
                </Link>
              ))}
        </div>
      )}
    </section>
  );
};
export default Products;
