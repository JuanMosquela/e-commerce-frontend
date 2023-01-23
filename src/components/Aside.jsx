import { Rating, Slider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaxPrice,
  addMinPrice,
  addPrice,
  addRating,
  reset,
} from "../redux/searchFilterRedux";

import { CheckboxBranch, CheckboxCategory } from "./CheckboxComponent";
import { IoIosOptions } from "react-icons/io";

const Aside = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filter);

  const [price, setPrice] = useState({
    min_price: 0,
    max_price: 200000,
  });

  const categories = ["zapatillas", "suplementos", "bolsos", "accesorios"];
  const branches = [
    "nike",
    "topper",
    "ena sport",
    "puma",
    "dribbling",
    "gilbert",
    "under armor",
    "m-wave",
    "aurora",
    "nutrilab",
    "muscletech",
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="col-span-4 md:col-span-1 bg-white rounded-sm shadow-lg overflow-hidden h-fit ">
      <div className="  divide-y divide-gray/30 px-6 py-4 ">
        <h3 className="flex  items-center justify-between text-dark font-bold uppercase mb-4 pt-6">
          search filters
          <IoIosOptions />
        </h3>
        <div>
          <CheckboxCategory open={open} items={categories} />
        </div>
        <div>
          <CheckboxBranch items={branches} />
        </div>
        <div>
          <h3 className="text-dark font-bold uppercase mb-4 pt-6">By price</h3>
          <div className="flex items-center gap-2  ">
            <input
              type="text"
              name="min_price"
              className="bg-gray w-full p-1"
              onChange={(e) => {
                setPrice({ ...price, [e.target.name]: e.target.value });
                dispatch(addMinPrice(e.target.value));
              }}
            />
            to
            <input
              type="text"
              name="max_price"
              className="bg-gray w-full p-1"
              onChange={(e) => {
                setPrice({ ...price, [e.target.name]: e.target.value });
                dispatch(addMaxPrice(e.target.value));
              }}
            />
          </div>
        </div>
        <div>
          <h3 className="text-dark font-bold uppercase mb-4 pt-6">By rating</h3>
          <Rating
            name="simple-controlled"
            value={filters?.rating}
            onChange={(event, newValue) => dispatch(addRating(newValue))}
          />
        </div>
        <button onClick={() => dispatch(reset())}>Limpiar campos</button>
      </div>
    </div>
  );
};
export default Aside;
