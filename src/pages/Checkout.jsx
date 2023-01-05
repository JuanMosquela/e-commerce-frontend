import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateOrderMutation,
  useGetCartQuery,
} from "../redux/api/productsApi";
import { checkoutSchemas } from "../schemas/checkoutSchema";

const Checkout = () => {
  const { id } = useSelector((state) => state.auth.user);

  const { data: cartData } = useGetCartQuery(id);

  console.log(cartData);

  const [checked, setChecked] = useState(false);

  const countries = [
    {
      value: "Argentina",
      label: "Argentina",
    },
    {
      value: "Uruguay",
      label: "Uruguay",
    },
    {
      value: "Brasil",
      label: "Brasil",
    },
    {
      value: "Chile",
      label: "Chile",
    },
  ];
  const onSubmit = async () => {
    if (!checked) {
      return console.log("marca");
    }

    // const newOrder = {
    //   name: values.firstName,
    //   email: values.email,
    //   country: values.country,
    //   postalCode: values.postalCode,
    //   adress: "Calle falsa",
    // };

    // createOrder(newOrder);
  };

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        postalCode: "",
        phone: "",
      },
      validationSchema: checkoutSchemas,
      onSubmit,
    });

  useEffect(() => {
    console.log(Object.keys(errors).length > 0);
    if (Object.keys(errors).length > 0) {
      toast.error("Complete all fields");
    }
  }, [touched, errors]);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  return (
    <section className="min-height flex justify-center items-center bg-gray gap-4  ">
      <div className="flex gap-2">
        <form
          className="w-[700px]  p-2 bg-white rounded-md shadow-md px-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-dark text-2xl font-bold mb-6 uppercase">
            Checkout
          </h2>
          <h3 className="flex items-center text-sm text-dark font-black mb-4 gap-2 uppercase">
            Your personal information
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <TextField
              type="text"
              id="filled-basic"
              label="First Name"
              variant="filled"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              type="text"
              id="filled-basic"
              label="Second Name"
              variant="filled"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              type="email"
              id="filled-basic"
              label="Email"
              variant="filled"
              className="col-span-2"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              id="outlined-select-country"
              select
              label="Country"
              defaultValue=""
              helperText="Please select your country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              id="filled-basic"
              label="Postal Code"
              variant="filled"
              name="postalCode"
              value={values.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              type="number"
              id="filled-basic"
              label="Phone Number"
              variant="filled"
              className="col-span-2"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex gap-4 max-w-sm">
            <input
              type="checkbox"
              name="check"
              value={values.check}
              className=" scale-150 "
              onChange={() => setChecked((prev) => !prev)}
            />
            <p className="text-dark text-sm mb-2 ">
              I agree to my email adress being stored and used to recive monthly
              newsletter
            </p>
          </div>
          <button
            type="submit"
            className={" w-[100%]  bg-orange text-white rounded-md py-2    "}
          >
            {isLoading ? (
              <>
                <CircularProgress
                  sx={{ color: "rgba(255,255,255)" }}
                  size="1.5rem"
                />
              </>
            ) : (
              <p className="font-bold uppercase">Purchase</p>
            )}
          </button>
        </form>
        <div className="flex flex-col justify-between bg-white p-2 rounded-md shadow-md   ">
          <h3 className="text-md text-center font-bold  text-dark/90 border-b border-slate pb-2">
            Order Summary
          </h3>
          <div className=" divide-y divide-slate mb-2 max-h-[320px] overflow-y-scroll">
            {cartData?.result?.items?.map((item) => (
              <div key={item?.item.id} className="flex gap-4 py-2 px-2  ">
                <img
                  className="w-20 bg-fit "
                  src={item?.item.pictureURL[0]}
                  alt={item.item.title}
                />
                <div className="w-full">
                  <span className="">{item?.item.branch}</span>
                  <h4 className="text-dark font-bold mb-2">
                    {item?.item.title}
                  </h4>
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
            <h4 className="flex w-full justify-between text-dark/90 font-bold text-md">
              Total Quantity:{" "}
              <span className="text-dark font-bold ">
                x {cartData?.result.totalQty}
              </span>
            </h4>
            <h4 className="flex w-full justify-between text-dark/90 font-bold text-md">
              Cart Total:{" "}
              <span className="text-dark font-bold ">
                $ {cartData?.result.subTotal}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Checkout;