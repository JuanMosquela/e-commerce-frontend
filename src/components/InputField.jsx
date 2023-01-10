import { TextField } from "@mui/material";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  console.log(meta);
  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.error && meta.touched ? true : false}
      helperText={meta.error && meta.touched && meta.error}
    />
  );
};
export default InputField;
