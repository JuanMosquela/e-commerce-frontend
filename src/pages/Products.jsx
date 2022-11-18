import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/SearchProductsProvider";
import { useFetchAllProductsQuery } from "../redux/productsApi";
import { CgMenuGridO, CgMenu } from "react-icons/cg";
import Aside from "../components/Aside";

const Products = () => {
  const { searchedProducts, inputValue } = useContext(ProductsContext);

  const { data, error, isLoading } = useFetchAllProductsQuery();

  return (
    <section className="min-height flex justify-center items-center mt-7 ">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="container grid grid-cols-4 gap-4   sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 ">
          <Aside />

          <div className="col-span-3 grid grid-cols-3 gap-4">
            <p className="col-span-3 flex items-center">
              View as:
              <div className="flex items-center gap-2 ml-4 ">
                <CgMenuGridO className="bg-orange-400 text-white text-3xl px-1" />
                <CgMenu className="bg-orange-400 text-white text-3xl px-1" />
              </div>
            </p>
            {!searchedProducts
              ? data?.products?.map((product) => (
                  <Link key={product._id} to={`/products/${product._id}`}>
                    <CardProduct className=" " product={product} />
                  </Link>
                ))
              : searchedProducts?.results?.map((product) => (
                  <Link key={product._id} to={`/products/${product._id}`}>
                    <CardProduct className="" product={product} />
                  </Link>
                ))}
          </div>
        </div>
      )}
    </section>
  );
};
export default Products;
