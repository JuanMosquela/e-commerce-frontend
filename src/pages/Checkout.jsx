import { TextField } from "@mui/material";

import { ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import CheckoutProducts from "../components/CheckoutProducts";
import MultiStepForm, { FormStep } from "../components/MultiStepForm";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Checkout = () => {
  return (
    <section className="md:container h-screen grid grid-cols-3 gap-4 md:mt-10">
      <div className="col-span-2">
        <h1>Checkout</h1>
        <MultiStepForm
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            creditCardNumber: "",
          }}
          onSubmit={async (values) =>
            sleep(300).then(() => console.log("Wizard submit", values))
          }
        >
          <FormStep
            stepName="Personal Information"
            onSubmit={() => console.log("Step1 onSubmit")}
            validationSchema={Yup.object({
              firstName: Yup.string().required("required"),
              lastName: Yup.string().required("required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("required"),
            })}
          >
            <div>
              <label htmlFor="email">Email</label>
              <Field
                className="w-full bg-gray p-2 rounded-sm hover:bg-slate/10 duration-150 outline-none focus:border focus:border-slate  "
                name="email"
                placeholder="Email"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field
                className="w-full bg-gray p-2 rounded-sm hover:bg-slate/10 duration-150 outline-none focus:border focus:border-slate  "
                name="firstName"
                placeholder="First Name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field
                className="w-full bg-gray p-2 rounded-sm hover:bg-slate/10 duration-150 outline-none focus:border focus:border-slate  "
                name="lastName"
                placeholder="Last Name"
                type="text"
              />
            </div>
          </FormStep>
          <FormStep
            stepName="Billing Information"
            onSubmit={() => console.log("Step2 onSubmit")}
            validationSchema={Yup.object({
              creditCardNumber: Yup.number(
                "credit card number required"
              ).required("required"),
            })}
          >
            <div>
              <label htmlFor="email">Credit Card</label>
              <Field
                className="w-full bg-gray p-2 rounded-sm hover:bg-slate/10 duration-150 outline-none focus:border focus:border-slate  "
                placeholder="Credit Card Number"
                type="number"
              />
            </div>
          </FormStep>
        </MultiStepForm>
      </div>
      <CheckoutProducts />
    </section>
  );
};
export default Checkout;
