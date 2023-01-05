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
  country: yup.string().required("Country is required"),
  postalCode: yup.number().required("Postal Code is required"),
  phone: yup.number().required("Phone number is required"),
});
