import * as yup from "yup";

export const checkoutSchemas = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("FirstName is required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("LastName is required"),
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
  identification: yup
    .string()

    .required("Zip Code is required"),
  identificationNumber: yup
    .string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")

    .required("Street Number is required"),

  phone: yup.number().required("Phone number is required"),
  areaCode: yup.number().required(),
});
