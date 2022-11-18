import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const CardProduct = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      // className={isHovered ? "product-card hovered" : "product-card"}
      className="bg-white  shadow rounded overflow-hidden  "
      onMouseEnter={() => setIsHovered((prev) => !prev)}
      onMouseLeave={() => setIsHovered((prev) => !prev)}
    >
      <div className="relative">
        <img
          className="object-contain h-[400px]  m-auto"
          src={product.pictureURL[0]}
          alt={product.title}
        />
        <div className=" flex items-center justify-center gap-2 absolute hover:bg-black inset-0 hover:bg-opacity-40 opacity-0 hover:opacity-100  ease-in duration-200">
          <AiOutlineHeart className="bg-orange-500 hover:bg-orange-700 ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
          <BiSearch className="bg-orange-500 hover:bg-orange-700 ease-in duration-100 rounded-full h-8 w-9 text-white flex items-center justify-center p-2  " />
        </div>
      </div>

      <div className="px-4 py-2">
        <h4 className=" md:min-h-[40px] text-sm md:text-md lg:text-[16px] mb-2 font-semibold text-slate-900 ">
          {product.title.toLowerCase()}
        </h4>
        <h5 className=" text-sm text-gray-600 font-semibold ">
          $ {product.price}
        </h5>
      </div>
    </div>
  );
};
export default CardProduct;
