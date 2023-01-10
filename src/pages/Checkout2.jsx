import { ErrorMessage, Field } from "formik";
import MultiStepForm, { FormStep } from "../components/MultiStepForm";
import * as yup from "yup";
import { TextField } from "@mui/material";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "../redux/api/productsApi";
import { useSelector } from "react-redux";

const Checkout2 = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const { id } = useSelector((state) => state.auth.user);

  const cart = useSelector((state) => state.auth.user.cart);

  const { data: cartData } = useGetCartQuery(id);

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray">
      <div className="bg-white rounded-md shadow-sm px-4 py-2 w-[600px] min-h-[540px]">
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
                .min(2, "Too Short!")
                .max(8, "Too Long!")
                .required("StreetNumber is required"),
              zipCode: yup
                .string()
                .min(2, "Too Short!")
                .max(8, "Too Long!")
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
                .min(2, "Too Short!")
                .max(10, "Too Long!")

                .required("Street Number is required"),

              phone: yup.number().required("Phone number is required"),
              areaCode: yup.number().required(),
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
              <div className="min-h-[80px]">
                <InputField name="identificationNumber" label="ID Number" />
              </div>
              <div className="min-h-[80px]">
                <InputField name="areaCode" label="areaCode" />
              </div>
              <div className="min-h-[80px] col-span-2">
                <InputField name="phone" label="Phone" />
              </div>
            </div>
          </FormStep>
          <FormStep stepName="Confirm Your order">
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
                <h4 className="flex w-full justify-between text-dark font-bold text-md">
                  Cart Total:{" "}
                  <span className="text-dark font-bold ">
                    $ {cartData?.result.subTotal}
                  </span>
                </h4>
              </div>
            </div>
          </FormStep>
        </MultiStepForm>
      </div>
    </section>
  );
};

export default Checkout2;
