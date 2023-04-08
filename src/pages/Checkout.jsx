import MultiStepForm, { FormStep } from "../components/MultiStepForm";
import * as yup from "yup";

import InputField from "../components/InputField";

import CheckoutProducts from "../components/CheckoutProducts";
import { useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "../redux/api/cartApi";

const Checkout = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const { id } = useSelector((state) => state.auth.user);

  console.log(id);

  const { data, error, isLoading } = useGetCartQuery(id);

  return (
    <section className="h-screen md:container">
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <CircularProgress sx={{ color: "var(--color-orange)" }} size="5rem" />
        </div>
      ) : (
        <div className="flex justify-between md:mt-10 gap-4 ">
          <div className="w-full rounded-md  px-4 py-2 relative">
            <h2 className=" py-1  font-black uppercase text-sm md:text-md lg:text-xl text-dark mb-6   ">
              Checkout
            </h2>
            <MultiStepForm
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                streetName: "",
                streetNumber: "",
                creditCardNumber: "",
                creditCardName: "",
                expirationDate: "",
                securityCode: "",
              }}
              onSubmit={async (values) =>
                sleep(300).then(() =>
                  console.log("MultiStepForm submit", values)
                )
              }
            >
              <FormStep
                stepName="Personal Information"
                onSubmit={() => console.log("Step1 onSubmit")}
                validationSchema={yup.object({
                  firstName: yup.string().required("required"),
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
                })}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="min-h-[80px] col-span-2">
                    <InputField name="email" label="Email" />
                  </div>
                  <div className="min-h-[80px]">
                    <InputField name="firstName" label="First Name" />
                  </div>
                  <div className="min-h-[80px]">
                    <InputField name="lastName" label="Last Name" />
                  </div>
                  <div className="min-h-[80px]">
                    <InputField name="streetName" label="Street Name" />
                  </div>
                  <div className="min-h-[80px]">
                    <InputField name="streetNumber" label="Street Number" />
                  </div>
                </div>
              </FormStep>
              <FormStep
                stepName="Billing Information"
                onSubmit={() => console.log("Step2 onSubmit")}
                validationSchema={yup.object({
                  creditCardNumber: yup
                    .number()
                    .required("This field is required"),
                  creditCardName: yup
                    .string()
                    .required("This field is required"),
                })}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 min-h-[80px]">
                    <InputField
                      name="creditCardNumber"
                      label="Credit Card Number"
                    />
                  </div>
                  <div className="col-span-2 min-h-[80px]">
                    <InputField
                      name="creditCardName"
                      label="Credit Card Name"
                    />
                  </div>
                  <div className="min-h-[80px]">
                    <InputField name="expirationDate" label="Exp Date" />
                  </div>
                  <div className="min-h-[80px]">
                    <InputField name="securityCode" label="Security Code" />
                  </div>
                </div>
              </FormStep>
            </MultiStepForm>
          </div>
          <CheckoutProducts data={data} />
        </div>
      )}
    </section>
  );
};

export default Checkout;
