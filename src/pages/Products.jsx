import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/SearchProductsProvider";
import { useFetchAllProductsQuery } from "../redux/productsApi";

const Products = () => {
  const { searchedProducts, inputValue } = useContext(ProductsContext);

  const { data, error, isLoading } = useFetchAllProductsQuery();

  return (
    <section className="container-products">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="grid-container">
          {!searchedProducts
            ? data?.products?.map((product) => (
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
