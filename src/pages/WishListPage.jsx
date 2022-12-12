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
    <section className="md:container pt-10 ">
      <h2 className="text-slate text-md font-semibold mb-4">Your Wishlist</h2>
      <div className="min-h-[100vh] grid grid-cols-4 gap-4">
        {data?.result?.map((product) => (
          <CardProduct key={product._id} product={product} addedToFavs={true} />
        ))}
      </div>
    </section>
  );
};
export default WishListPage;
