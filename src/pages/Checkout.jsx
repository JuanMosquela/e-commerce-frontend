import MultiStepForm, { FormStep } from "../components/MultiStepForm";
import * as yup from "yup";

import InputField from "../components/InputField";

import CheckoutProducts from "../components/CheckoutProducts";

const Checkout = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <section className="flex justify-center items-center min-height bg-gray ">
      <div className="bg-white rounded-md shadow-md px-4 py-2 w-[600px] min-h-[540px]">
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
            zipCode: "",
            identification: "",
            identificationNumber: "",
            phone: "",
            areaCode: "",
          }}
          onSubmit={async (values) =>
            sleep(300).then(() => console.log("MultiStepForm submit", values))
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
              zipCode: yup
                .string()

                .required("Zip Code is required"),
            })}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="min-h-[80px]">
                <InputField name="firstName" label="firtname" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="lastName" label="lastname" />
              </div>
              <div className="min-h-[80px] col-span-2">
                <InputField name="email" label="Email" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="streetName" label="streetname" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="streetNumber" label="streetNumber" />
              </div>
              <div className="min-h-[80px] col-span-2 ">
                <InputField name="zipCode" label="zipCode" />
              </div>
            </div>
          </FormStep>
          <FormStep
            stepName="Billing Adress"
            onSubmit={() => console.log("Step2 onSubmit")}
            validationSchema={yup.object({
              identification: yup
                .string()

                .required("ID is required"),
              identificationNumber: yup
                .string()

                .required("Street Number is required"),

              phone: yup.string().required("Phone string is required"),
              areaCode: yup.string().required(),
            })}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="min-h-[80px]">
                <InputField name="identification" label="Identification" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="identificationNumber" label="ID Number" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="areaCode" label="areaCode" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="phone" label="Phone" />
              </div>
            </div>
          </FormStep>
          <FormStep stepName="Confirm Your order">
            <CheckoutProducts />
          </FormStep>
        </MultiStepForm>
      </div>
    </section>
  );
};

export default Checkout;
