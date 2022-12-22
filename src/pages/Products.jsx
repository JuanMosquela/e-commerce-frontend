import { CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/SearchProductsProvider";
import {
  useFetchAllProductsByNameOrCategoryQuery,
  useFetchAllProductsQuery,
} from "../redux/api/productsApi";
import { CgMenuGridO, CgMenu } from "react-icons/cg";
import Aside from "../components/Aside";
import { useState } from "react";
import Pagination from "../components/Pagination";
import LoadingSkeletonProducts from "../components/LoadingSkeletonProducts";

const Products = () => {
  const { inputValue } = useContext(ProductsContext);

  const [currentPage, setCurrentPage] = useState(1);

  const [grid, setGrid] = useState(true);

  const [row, setRow] = useState(false);

  const [filterProducts, setFilterProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [productsPerPage, setProductsPerPage] = useState(6);

  const { data, isError, error, isLoading } = useFetchAllProductsQuery();

  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;

  const handleRow = () => {
    setGrid(false);
    setRow(true);
  };

  const handleGrid = () => {
    setRow(false);
    setGrid(true);
  };

  return (
    <section className="min-height bg-gray flex justify-center py-7 ">
      <div className="container grid grid-cols-4 gap-4  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 items-start ">
        <Aside
          data={data}
          setFilterProducts={setFilterProducts}
          setLoading={setLoading}
          loading={loading}
        />

        {isLoading || loading ? (
          <LoadingSkeletonProducts />
        ) : (
          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div className="col-span-1  flex ">
              View as:
              <div className="flex  gap-2 ml-4 ">
                <CgMenuGridO
                  onClick={handleGrid}
                  className="bg-orange text-white text-3xl px-1"
                />
                <CgMenu
                  onClick={handleRow}
                  className="bg-orange text-white text-3xl px-1"
                />
              </div>
            </div>
            <Pagination
              total={data?.products?.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />

            {filterProducts?.length !== 0
              ? filterProducts?.map((product) => (
                  <Link key={product._id} to={`/products/${product._id}`}>
                    <CardProduct row={row} product={product} />
                  </Link>
                ))
              : data?.products
                  .slice(firstProduct, lastProduct)
                  .map((product) => (
                    <div key={product._id} className={row ? `col-span-3` : ""}>
                      <Link to={`/products/${product._id}`}>
                        <CardProduct grid={grid} product={product} row={row} />
                      </Link>
                    </div>
                  ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Products;
