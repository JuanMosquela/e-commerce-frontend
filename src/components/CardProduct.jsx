import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Rating } from "@mui/material";

const CardProduct = ({ product, row, grid }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={
        row
          ? `flex items-center shadow-md rounded overflow-hidden`
          : "shadow-md rounded overflow-hidden"
      }
    >
      <div className="relative flex-1">
        <img
          className="object-contain h-[320px] m-auto"
          src={product.pictureURL[0]}
          alt={product.title}
        />
        <div className="group  flex items-center justify-center gap-2 absolute hover:bg-dark inset-0 hover:bg-opacity-40 opacity-0 hover:opacity-100  ease-in duration-200">
          <AiOutlineHeart className="bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
          <BiSearch className="bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
        </div>
      </div>

      <div className="px-4 py-2 flex-1">
        <h4 className="text-sm md:text-md lg:text-[16px] font-semibold text-slate capitalize overflow-hidden whitespace-nowrap mb-4 ">
          {product.title.toLowerCase()}
        </h4>
        <Rating
          name="read-only"
          value={product.rating}
          precision={0.5}
          readOnly
        />
        <h5 className=" text-xl text-gray-600 font-bold ">$ {product.price}</h5>
        {row && (
          <>
            <p className="text-slate font-thin pt-2 mb-4">
              {product.description.slice(0, 225)}...
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
