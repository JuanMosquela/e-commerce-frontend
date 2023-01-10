import * as yup from "yup";

export const checkout2Schemas = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("FirstName is required"),
  lastname: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),
  email: yup.string().email().required("This field is requiered"),
});
