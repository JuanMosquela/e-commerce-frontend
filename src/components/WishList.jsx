import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartSelector } from "../redux/shoppingCartRedux";
import { useGetFavProductsQuery } from "../redux/productsApi";

const WishList = () => {
  const id = useSelector((state) => state.auth.id);

  const { data } = useGetFavProductsQuery(id);

  console.log(data);

  return (
    <Link to="/wishList" className="text-slate-900  text-3xl relative">
      <AiOutlineHeart />
      <span className="absolute flex justify-center items-center text-white bg-orange h-[25px] w-[25px] rounded-full text-sm p-2 top-[-5px] right-[-15px]   ">
        {data?.result.length}
      </span>
    </Link>
  );
};
export default WishList;
