import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartSelector } from "../redux/shoppingCartRedux";
import { useGetFavProductsQuery } from "../redux/api/productsApi";

const WishList = () => {
  const user = useSelector((state) => state.auth.user);

  const { data } = useGetFavProductsQuery(user?._id);

  return (
    <Link to="/wishList" className="text-slate-900  text-3xl relative">
      <AiOutlineHeart />
      <span className="absolute flex justify-center items-center text-white bg-orange h-[25px] w-[25px] rounded-full text-sm p-2 top-[-5px] right-[-15px]   ">
        {data ? data?.result?.length : 0}
      </span>
    </Link>
  );
};
export default WishList;
