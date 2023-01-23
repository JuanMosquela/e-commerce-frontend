import { CircularProgress, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { CgMenuGridO, CgMenu } from "react-icons/cg";
import Aside from "../components/Aside";
import { useState } from "react";
import Pagination from "../components/Pagination";
import LoadingSkeletonProducts from "../components/LoadingSkeletonProducts";
import { useDispatch, useSelector } from "react-redux";
import { addSorting } from "../redux/searchFilterRedux";
import axios from "axios";

const Products = () => {
  const filters = useSelector((state) => state.filter);

  const { category, branch, rating, min_price, max_price, sort, page } =
    filters;

  const [grid, setGrid] = useState(true);

  const [data, setData] = useState([]);

  const [row, setRow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage, setProductsPerPage] = useState(6);

  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();

  const query = location.search.split("=")[1];

  const [error, setError] = useState("");

  console.log(filters);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `https://fit-commerce-api.onrender.com/api/products?category=${
            query || category
          }&branch=${branch}&rating=${rating}&min_price=${min_price}&max_price=${max_price}&sort=${sort}&page=${page}&limit=6`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };
    fetchProducts();
  }, [filters]);

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

  const handleChange = (e) => {
    setSortBy(e.target.value);
    dispatch(addSorting(e.target.value));
  };

  const sortItems = [
    {
      key: "Cheapest",
      value: "price",
    },
    {
      key: "More Expensive",
      value: "-price",
    },
  ];

  console.log(data);

  return (
    <section className="min-height bg-gray flex justify-center py-7 ">
      <div className="px-4 md:px-0 md:container grid  md:grid-cols-4 gap-4  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 items-start ">
        <Aside />

        {loading ? (
          <LoadingSkeletonProducts />
        ) : (
          <div className=" col-span-4 md:col-span-3 md:grid md:grid-cols-3 md:gap-4 ">
            <div className="col-span-4 md:col-span-3 grid grid-cols-3 bg-white py-2 md:px-2">
              <div className="flex flex-col md:flex-row px-2 md:items-center md:gap-2 ">
                View as:
                <div className="flex  md:gap-2  ">
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
                total={data?.total}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
              <Select
                className="w-[200px] ml-auto "
                labelId="demo-select-small"
                id="demo-select-small"
                label="Sort By"
                value={sortBy}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {sortItems.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.key}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {data &&
              data?.products?.map((product) => (
                <div key={product._id} className={row ? `  md:col-span-3` : ""}>
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
