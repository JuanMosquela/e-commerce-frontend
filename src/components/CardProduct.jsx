import { useState } from "react";
import { AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useAddToFavMutation,
  useRemoveFavMutation,
} from "../redux/api/productsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ product, row, grid, addedToFavs }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const [buttonClicked, setButtonClicked] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [addToFav, { data, isLoading, error }] = useAddToFavMutation();

  const [removeFav] = useRemoveFavMutation();

  const handleFav = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (!auth.token) {
      navigate("/login");

      toast.error("Debes estar autenticado");
      return;
    }

    const newFavProduct = {
      id: product._id,
      name: auth.user,
    };

    addToFav(newFavProduct);

    if (!isLoading) {
      console.log(data);
    }

    toast.info("Product added to fav");
  };

  const handleFavDelete = (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (!auth.token) {
      toast.error("Debes estar autenticado");
      return;
    }

    const newFavProduct = {
      id: product._id,
      name: auth.user,
    };

    removeFav(newFavProduct);

    toast.info("Product removed from fav");
  };

  console.log(product);

  return (
    <div
      className={
        row
          ? `flex items-center shadow-md rounded overflow-hidden bg-white h-[450px]`
          : "shadow-md rounded overflow-hidden bg-white  h-[450px]"
      }
    >
      <div className="relative flex-1">
        <img
          className="object-contain h-[320px] m-auto"
          src={product?.pictureURL[0]}
          alt={product?.title}
        />
        <div className="group  flex items-center justify-center gap-2 absolute hover:bg-dark inset-0 hover:bg-opacity-40 opacity-0 hover:opacity-100  ease-in duration-200">
          {addedToFavs ? (
            <AiOutlineDelete
              onClick={handleFavDelete}
              className="bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2 "
            />
          ) : (
            <AiOutlineHeart
              onClick={handleFav}
              className=" bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2 "
            />
          )}
          <BiSearch className="bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
        </div>
      </div>

      <div className="px-4 py-2 flex-1">
        <h4 className="text-sm md:text-md lg:text-[16px] font-semibold text-slate capitalize overflow-hidden whitespace-nowrap mb-2 ">
          {product?.title.toLowerCase()}
        </h4>
        <Rating
          name="read-only"
          value={product?.rating}
          precision={0.5}
          readOnly
        />
        <h5 className=" text-xl text-slate font-bold ">$ {product?.price}</h5>
        {row && (
          <>
            <p className="text-slate font-thin pt-2 mb-4">
              {product?.description.slice(0, 225)}...
            </p>
            <p className="text-white bg-orange rounded-md px-4 py-1 inline-block font-bold text-sm">
              Leer mas
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default CardProduct;
