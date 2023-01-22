import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import OrderSkeleton from "../components/OrderSkeleton";
import { useGetOrdersQuery } from "../redux/api/productsApi";

const Orders = () => {
  const { id } = useSelector((state) => state.auth.user);

  const { data, error, isLoading } = useGetOrdersQuery(id);

  return (
    <section className="md:container min-height md:my-10">
      <div className=" flex flex-col gap-6">
        {!data
          ? Array(2)
              .fill()
              .map((card) => <OrderSkeleton />)
          : data?.map((order) => (
              <div className="border border-slate" key={order._id}>
                <div>
                  <h2 className="bg-gray p-2 text-lg ">Order Details</h2>
                  <ul className="flex flex-col gap-2 p-4">
                    <li>Order id: {order?.orderId}</li>
                    <li>User Email: {order?.email}</li>
                    <li className=" inline  ">
                      Order Status:{" "}
                      <span className="bg-blue px-2 py-1 text-white  rounded-md text-sm">
                        {order?.orderStatus}
                      </span>
                    </li>
                    <li>Created At: {order?.createdAt}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="bg-gray p-2 text-lg ">Delivered Details</h2>
                  {order?.products?.map((item) => (
                    <div className="flex gap-4 p-4" key={item._id}>
                      <img
                        className="w-64"
                        src={item.product.pictureURL}
                        alt={item.product.title}
                      />
                      <div>
                        <h2>{item?.product.title}</h2>
                        <div>
                          <h1>{item?.quantity}</h1>
                          <span>${item?.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="bg-gray p-2 text-lg ">Order Total</h2>
                  <div className=" p-4">
                    <span>Subtotal: ${order?.transactionAmount}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};
export default Orders;
