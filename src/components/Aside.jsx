import { Rating, Slider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrice, addRating, reset } from "../redux/searchFilterRedux";
import publicRequest from "../utils/request-methods";
import { CheckboxBranch, CheckboxCategory } from "./CheckboxComponent";
import { IoIosOptions } from "react-icons/io";

const Aside = ({
  data: { products },
  setFilterProducts,
  loading,
  setLoading,
}) => {
  const [price, setPrice] = useState([20, 100]);

  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filter);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
    dispatch(addPrice(newValue));
  };

  const handleFilters = async () => {
    setLoading(true);
    try {
      const { findProducts } = await publicRequest.getFilterProducts(filters);

      setFilterProducts(findProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(filters);

  return (
    <div className="col-span-1 bg-white rounded-sm shadow-lg overflow-hidden h-fit ">
      <div className=" divide-y divide-gray/30 px-6 py-4 ">
        <h3 className="flex  items-center justify-between text-slate font-bold uppercase mb-4 pt-6">
          search filters
          <IoIosOptions />
        </h3>
        <div>
          <h3 className="text-slate font-bold uppercase mb-4 pt-6">
            By Categories
          </h3>
          <CheckboxCategory products={products} />
        </div>
        <div>
          <h3 className="text-slate font-bold uppercase mb-4 pt-6">
            By Branch
          </h3>
          <CheckboxBranch products={products} />
        </div>
        <div>
          <h3 className="text-slate font-bold uppercase mb-4 pt-6">By price</h3>
          <div className="flex items-center mb-3 gap-4">
            <Slider
              defaultValue={200}
              getAriaLabel={() => "Price range"}
              value={filters.price}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate font-bold uppercase mb-4 pt-6">
            By rating
          </h3>
          <Rating
            name="simple-controlled"
            value={filters.rating}
            onChange={(event, newValue) => dispatch(addRating(newValue))}
          />
        </div>
      </div>

      <div className="flex">
        <button
          onClick={handleFilters}
          className="bg-orange px-4 py-2 rounded-md text-white font-bold block mx-auto mb-4"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};
export default Aside;
