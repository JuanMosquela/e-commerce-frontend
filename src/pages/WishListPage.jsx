import { useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import EmptyComponent from "../components/EmptyComponent";
import { useGetFavProductsQuery } from "../redux/api/productsApi";

const WishListPage = () => {
  const id = useSelector((state) => state.auth.user._id);

  const [addedToFavs, setAddedToFavs] = useState(true);

  console.log(id);

  const { data } = useGetFavProductsQuery(id);

  console.log(data);

  return (
    <section className="md:container pt-10 ">
      {data?.result?.length === 0 ? (
        <EmptyComponent title="No favorites products added yet" />
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};
export default WishListPage;
