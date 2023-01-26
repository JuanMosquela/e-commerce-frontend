import { useSelector } from "react-redux";
import { useGetCartQuery } from "../redux/api/productsApi";

const CheckoutProducts = () => {
  const { _id } = useSelector((state) => state.auth.user.cart);

  console.log(_id);

  const { data, error } = useGetCartQuery(_id);
  console.log(data, error);

  return (
    <div>
      <div className="mb-8">
        {data?.result?.items.map((product) => (
          <div className="flex gap-4 items-center mb-4  ">
            <figure className=" relative">
              <img
                className="w-[160px] object-fit"
                src={product?.item?.pictureURL[0]}
                alt={product?.item?.title}
              />
            </figure>
            <div className="md:p-4 relative w-full">
              <h4 className="text-md text-dark font-semibold">
                {product?.item?.title}
              </h4>
              <span>$ {product?.total}</span>
              <span className="absolute top-0 right-0 bg-orange text-white w-5 h-5 flex items-center justify-center rounded-full">
                {product?.quantity}
              </span>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center w-full">
          <p>SubTotal:</p>
          <span>$ {data?.result?.subTotal}</span>
        </div>
      </div>

      <button className="text-white uppercase bg-orange rounded-md  h-[50px] w-full">
        Purchase
      </button>
    </div>
  );
};
export default CheckoutProducts;
