import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import EmptyComponent from "../components/EmptyComponent";
import TitleComponent from "../components/TitleComponent";
import { useGetFavProductsQuery } from "../redux/api/favoriteApi";

const WishListPage = () => {
  const id = useSelector((state) => state.auth.user._id);

  const [addedToFavs, setAddedToFavs] = useState(true);

  console.log(id);

  const { data } = useGetFavProductsQuery(id);

  console.log(data);

  return (
    <section className="md:container  ">
      {data?.result?.length === 0 ? (
        <TitleComponent
          title="Your wishlist it´s empty"
          text="Start adding products to favorites and see your wishlist"
          icon={<AiOutlineHeart />}
          status={false}
        />
      ) : (
        <div className="mt-10">
          <h2 className="text-slate text-md font-semibold mb-4">
            Your Wishlist
          </h2>
          <div className="min-h-[100vh] grid grid-cols-4 gap-4">
            {data?.result?.map((product) => (
              <CardProduct
                key={product?._id}
                product={product}
                addedToFavs={true}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
export default WishListPage;
