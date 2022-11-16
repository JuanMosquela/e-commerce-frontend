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
    <section className="flex justify-center items-center min-h-screen mt-6">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="grid grid-cols-1 gap-4 px-[2%] md:px-[5%] lg:px-[10%]  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  ">
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
