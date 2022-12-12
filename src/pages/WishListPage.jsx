import { useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import { useGetFavProductsQuery } from "../redux/productsApi";

const WishListPage = () => {
  const id = useSelector((state) => state.auth.id);

  const [addedToFavs, setAddedToFavs] = useState(true);

  console.log(id);

  const { data } = useGetFavProductsQuery(id);

  console.log(data);

  return (
    <div className=" md:container min-h-screen">
      {data?.result?.map((product) => (
        <CardProduct key={product._id} product={product} addedToFavs={true} />
      ))}
    </div>
  );
};
export default WishListPage;
