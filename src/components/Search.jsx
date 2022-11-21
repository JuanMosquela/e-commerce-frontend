import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/SearchProductsProvider";
import { useFetchAllProductsByNameOrCategoryQuery } from "../redux/productsApi";
import { BASE_URL } from "../utils/request-methods";

const Search = () => {
  const { handleInput } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <div className="w-[600px] flex justify-between items-center">
      <input
        onChange={(e) => handleInput(e.target.value)}
        className="rounded-sm w-full border-1 bg-gray/10 ease-in duration-100  text-slate-900 p-2 outline-none "
        type="text"
        placeholder="Search products ..."
      />
      <button
        onClick={handleSubmit}
        className="bg-orange text-white px-6 py-2 flex gap-2 items-center hover:cursoir-pointer hover:bg-orange-300 ease-in duration-200"
      >
        <AiOutlineSearch />
        Search
      </button>
    </div>
  );
};
export default Search;
