import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../redux/api/productsApi";

const Orders = () => {
  const { id } = useSelector((state) => state.auth.user);

  const { data, error, isLoading } = useGetOrdersQuery(id);

  console.log(data, error, isLoading);

  return (
    <section className="md:container min-height">
      <h1>Your orders information</h1>

      {data?.map((order) => (
        <div key={order._id}>
          <h3>Order id: {order?.orderId}</h3>

          <h2>User email: {order?.email}</h2>
          <p>Status: {order?.orderStatus}</p>

          {order?.products?.map((item) => (
            <div className="flex" key={item._id}>
              <h2>{item?.product.title}</h2>
              <div>
                <h1>{item?.quantity}</h1>
                <span>${item?.total}</span>
              </div>
            </div>
          ))}

          <span>transaction amount: {order?.transactionAmount}</span>

          <span>{order?.createdAt}</span>
        </div>
      ))}
    </section>
  );
};
export default Orders;
