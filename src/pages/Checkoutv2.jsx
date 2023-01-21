import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import mercadopagobtn from "../img/mercado-pago.svg";

const Checkoutv2 = () => {
  const location = useLocation();

  const { initPoint, cart, values } = location.state;

  console.log(location);

  console.log(cart);

  const navigate = useNavigate();

  return (
    <section className="h-screen flex justify-center md:pt-10 bg-gray    ">
      <div className="md:container  w-full  px-4  flex gap-4 h-fit ">
        <div className=" flex-1 border border-slate/40 p-4 bg-white">
          <h1 className="text-dark text-xl mb-4 uppercase font-bold">
            Checkout
          </h1>
          <h2 className="text-dark text-md mb-4 uppercase font-bold">
            Order Summary
          </h2>

          <div className="max-h-[400px] overflow-y-scroll ">
            {cart.items.map((product) => (
              <div className="flex gap-4  ">
                <img
                  className="w-[200px] object-fit"
                  src={product.item.pictureURL[0]}
                  alt={product.item.title}
                />
                <div className="md:p-4">
                  <h4>{product.item.title}</h4>
                  <p>{product.item.branch}</p>
                  <span>{product.quantity}</span> x <span>{product.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-slate/40 p-4 bg-white ">
          <h2 className="text-dark text-md mb-4 uppercase font-bold">
            Checkout Confirmation
          </h2>
          <ul className="mb-4">
            {Object.entries(values).map((value, index) => (
              <li className="flex gap-2 text-md text-slate">
                {value[0]}: <p className="text-dark">{value[1]}</p>
              </li>
            ))}
          </ul>
          <ul className="mb-4 ">
            <li>SubTotal: ${cart.subTotal.toFixed(2)}</li>
            <li>Shipping: Free</li>

            <li className="flex gap-2 text-md ">
              Total Amount: <span>{cart.totalQty}</span>
            </li>
          </ul>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-dark ">Total:</h4>
            <span className="text-dark text-xl">
              ${cart.subTotal.toFixed(2)}
            </span>
          </div>
          <a
            className="flex w-fit items-center gap-2 bg-[#00B1EA] px-4 py-1 rounded-md text-white font-bold "
            rel="stylesheet"
            href={`${initPoint}`}
          >
            <img src={mercadopagobtn} alt="button" />
            Pagar con Mercado Pago
          </a>
        </div>
      </div>
    </section>
  );
};
export default Checkoutv2;
