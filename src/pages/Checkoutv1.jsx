import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { Field, Form, Formik, useFormik } from "formik";

import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useCreatePaymentMutation,
  useGetCartQuery,
} from "../redux/api/productsApi";
import * as yup from "yup";
import axios from "axios";

const Checkoutv1 = () => {
  const navigate = useNavigate();

  const formRef = useRef();

  const { data: cartData } = useGetCartQuery();

  const [createPayment, { data, error }] = useCreatePaymentMutation();

  const handleSubmit = async (values) => {
    await createPayment({
      id: cartData?.result._id,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      streetName: values.streetName,
      streetNumber: values.streetNumber,
      zipCode: values.zipCode,
      areaCode: values.phone,
      phone: values.phone,
      identification: values.identification,
      identificationNumber: values.identificationNumber,
    });

    // const { data } = await axios.post(
    //   "http://localhost:5000/api/order/create-payment/63c9d803f87ef6c54de7c281",
    //   body,
    //   {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzlkN2Y1Zjg3ZWY2YzU0ZGU3YzI3MSIsImlhdCI6MTY3NDQwOTY5OSwiZXhwIjoxNjc1MjczNjk5fQ.UVFZqljTrIQEEOyWU4ZK52yHsUp2y5yPPy-ln2kXe4Q`,
    //     },
    //   }
    // );

    // console.log(data);

    // if (data) {
    //   navigate("/checkoutv2", {
    //     state: {
    //       initPoint: data.body.init_point,
    //       cart: cartData.result,
    //       values: formRef.current.values,
    //     },
    //   });
    // }
  };

  useEffect(() => {
    if (data) {
      navigate("/checkoutv2", {
        state: {
          initPoint: data.body.init_point,
          cart: cartData.result,
          values: formRef.current.values,
        },
      });
    }
  }, [data]);

  const currencies = ["DNI", "CBU", "CLI"];

  return (
    <section className="h-screen  flex justify-center items-center bg-gray">
      <div className="bg-white w-[70%] p-4">
        <h1 className=" py-1  font-black uppercase text-sm md:text-md lg:text-xl text-dark mb-2   ">
          Checkout
        </h1>
        <p className="text-dark text-md mb-4 flex gap-2 items-center">
          <span className="bg-dark text-white rounded-full  w-[20px] h-[20px] flex justify-center items-center ">
            1
          </span>{" "}
          Complete your personal information
        </p>

        <Formik
          innerRef={formRef}
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            streetName: "",
            streetNumber: "",
            zipCode: "",
            identification: "",
            identificationNumber: "",
            phone: "",
            areaCode: "",
          }}
          validationSchema={yup.object({
            name: yup.string().required("required"),
            lastName: yup.string().required("required"),
            email: yup.string().email().required("Email is requiered"),
            streetName: yup
              .string()
              .min(2, "Too Short!")
              .max(50, "Too Long!")
              .required("StreetName is required"),
            streetNumber: yup
              .string()

              .required("StreetNumber is required"),
            zipCode: yup
              .string()

              .required("Zip Code is required"),
            phone: yup.number().required("Phone is required"),
            areaCode: yup.number().required("Area Code is required"),
            identification: yup.string().required("ID is required"),
            identificationNumber: yup
              .number()
              .required("This field is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className=" " onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4 ">
                <div className="h-[80px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Firt Name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lastName && touched.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Zip Code"
                    type="number"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={values.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.zipCode && touched.zipCode}
                  />
                  {errors.zipCode && touched.zipCode && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Street Name"
                    type="text"
                    name="streetName"
                    placeholder="Street Name"
                    value={values.streetName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.streetName && touched.streetName}
                  />
                  {errors.streetName && touched.streetName && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.streetName}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Street Number"
                    type="number"
                    name="streetNumber"
                    placeholder="Street Number"
                    value={values.streetNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.streetNumber && touched.streetNumber}
                  />
                  {errors.streetNumber && touched.streetNumber && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.streetNumber}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Area Code"
                    type="number"
                    name="areaCode"
                    placeholder="Area Code"
                    value={values.areaCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.areaCode && touched.areaCode}
                  />
                  {errors.areaCode && touched.areaCode && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.areaCode}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Phone Number"
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone && touched.phone}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Id"
                    select
                    type="text"
                    name="identification"
                    placeholder="Id"
                    defaultValue="DNI"
                    value={values.identification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.identification && touched.identification}
                  >
                    {currencies.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.identification && touched.identification && (
                    <p className="text-red text-sm  font-bold capitalize mt-1">
                      {errors.identification}
                    </p>
                  )}
                </div>
                <div className="h-[70px]">
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Identification Number"
                    type="number"
                    name="identificationNumber"
                    placeholder="Id Number"
                    value={values.identificationNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.identificationNumber &&
                      touched.identificationNumber
                    }
                  />
                  {errors.identificationNumber &&
                    touched.identificationNumber && (
                      <p className="text-red text-sm  font-bold capitalize mt-1">
                        {errors.identificationNumber}
                      </p>
                    )}
                </div>
              </div>

              <button
                className="flex justify-center items-center bg-orange uppercase text-white text-md w-[200px] h-[45px] rounded-md"
                type="submit"
              >
                {isSubmitting ? (
                  <CircularProgress
                    sx={{ color: "rgba(255,255,255,.8)" }}
                    size="1.5rem"
                  />
                ) : (
                  "Enviar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Checkoutv1;
