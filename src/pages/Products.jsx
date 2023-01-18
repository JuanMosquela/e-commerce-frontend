import { CircularProgress, MenuItem, Select } from "@mui/material";
import { useContext, useEffect } from "react";
import CardProduct from "../components/CardProduct";
import { Link, useParams, useSearchParams } from "react-router-dom";
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

  const { category: catParams } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://e-commerce-backend-production-e980.up.railway.app/api/products?category=${
          category || catParams
        }&branch=${branch}&rating=${rating}&min_price=${min_price}&max_price=${max_price}&sort=${sort}&page=${page}&limit=6`
      );
      setData(data);

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

  return (
    <section className="min-height bg-gray flex justify-center py-7 ">
      <div className="container grid grid-cols-4 gap-4  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 items-start ">
        <Aside />

        {loading ? (
          <LoadingSkeletonProducts />
        ) : (
          <div className="col-span-3 grid grid-cols-3 gap-4 ">
            <div className="col-span-3 grid grid-cols-3 bg-white py-2">
              <div className="flex px-2 items-center ">
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
                total={data?.total}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
              <Select
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
