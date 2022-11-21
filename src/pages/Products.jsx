import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/SearchProductsProvider";
import {
  useFetchAllProductsByNameOrCategoryQuery,
  useFetchAllProductsQuery,
} from "../redux/productsApi";
import { CgMenuGridO, CgMenu } from "react-icons/cg";
import Aside from "../components/Aside";
import { useState } from "react";
import Pagination from "../components/Pagination";

const Products = () => {
  const { inputValue } = useContext(ProductsContext);

  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage, setProductsPerPage] = useState(6);

  const { data, isError, error, isLoading } = useFetchAllProductsQuery();
  // const { data: searchedProducts } =
  //   useFetchAllProductsByNameOrCategoryQuery(inputValue);

  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;

  return (
    <section className="min-height bg-white flex justify-center py-7 ">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="container grid grid-cols-4 gap-4   sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 ">
          <Aside />

          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div className="col-span-1  flex ">
              View as:
              <div className="flex  gap-2 ml-4 ">
                <CgMenuGridO className="bg-orange text-white text-3xl px-1" />
                <CgMenu className="bg-orange text-white text-3xl px-1" />
              </div>
            </div>
            <Pagination
              total={data.products.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            {/* {searchedProducts
              ? searchedProducts?.findProducts.map((product) => (
                  <Link key={product._id} to={`/products/${product._id}`}>
                    <CardProduct className=" " product={product} />
                  </Link>
                )) */}
            {data?.products.slice(firstProduct, lastProduct).map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <CardProduct className=" " product={product} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
export default Products;
