import { useState } from "react";

const CardProduct = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      // className={isHovered ? "product-card hovered" : "product-card"}
      className=" h-[400px]   rounded-sm shadow-md flex flex-col m-5 "
      onMouseEnter={() => setIsHovered((prev) => !prev)}
      onMouseLeave={() => setIsHovered((prev) => !prev)}
    >
      <img
        className=" object-contain h-[260px] m-auto "
        src={product.pictureURL[0]}
        alt={product.title}
      />
      {/* <img
        className=" object-contain absolute top-0 left-0 opacity-0 hover:opacity-100"
        src={product.pictureURL[1]}
        alt={product.title}
      /> */}

      <div className=" p-5  ">
        <h4 className=" text-[14px] sm:text-[18px] md:text-[14px] lg:text-[14px] font-bold text-slate-900 ">
          {product.title.toLowerCase()}
        </h4>
        <h5 className="  ">$ {product.price}</h5>
      </div>
    </div>
  );
};
export default CardProduct;
