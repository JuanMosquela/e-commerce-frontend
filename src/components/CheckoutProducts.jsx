import { useSelector } from "react-redux";
import { useGetCartQuery } from "../redux/api/productsApi";

const CheckoutProducts = () => {
  const { id } = useSelector((state) => state.auth.user);

  const cart = useSelector((state) => state.auth.user.cart);

  const { data: cartData } = useGetCartQuery(id);
  return (
    <div className="justify-between bg-white p-2 rounded-md ">
      <div className=" divide-y divide-slate mb-2 max-h-[280px] overflow-y-scroll">
        {cartData?.result?.items?.map((item) => (
          <div key={item?.item.id} className="flex gap-4 py-2 px-2  ">
            <img
              className="w-20 bg-fit "
              src={item?.item.pictureURL[0]}
              alt={item.item.title}
            />
            <div className="w-full">
              <span className="">{item?.item.branch}</span>
              <h4 className="text-dark font-bold mb-2">{item?.item.title}</h4>
              <div className="text-right">
                <span className="text-dark font-bold">
                  $ {item?.item.price}
                </span>{" "}
                x <span>{item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex-col w-full items-end mb-4 px-4">
        <h4 className="flex w-full justify-between text-dark font-bold text-md">
          Cart Total:{" "}
          <span className="text-dark font-bold ">
            $ {cartData?.result.subTotal}
          </span>
        </h4>
      </div>
    </div>
  );
};
export default CheckoutProducts;
