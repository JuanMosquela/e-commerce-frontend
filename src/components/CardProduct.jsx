import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const CardProduct = ({ product, grid, row }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      // className={isHovered ? "product-card hovered" : "product-card"}
      className={
        row
          ? `flex items-center shadow-md rounded overflow-hidden`
          : "shadow-md rounded overflow-hidden"
      }
    >
      <div className="relative flex-1">
        <img
          className="object-contain h-[400px] m-auto"
          src={product.pictureURL[0]}
          alt={product.title}
        />
        <div className="group  flex items-center justify-center gap-2 absolute hover:bg-dark inset-0 hover:bg-opacity-40 opacity-0 hover:opacity-100  ease-in duration-200">
          <AiOutlineHeart className="bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
          <BiSearch className="bg-orange hover:bg-orange ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
        </div>
      </div>

      <div className="px-4 py-2 flex-1">
        <h4 className="text-sm md:text-md lg:text-[16px] font-thin text-slate capitalize overflow-hidden whitespace-nowrap mb-4 ">
          {product.title.toLowerCase()}
        </h4>
        <h5 className=" text-xl text-gray-600 font-bold ">$ {product.price}</h5>
        {row && <p>{product.description}</p>}
      </div>
    </div>
  );
};
export default CardProduct;
