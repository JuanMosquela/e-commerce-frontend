import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { registerSchemas } from "../schemas/registerSchemas";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/authSliceRedux";
import { CircularProgress } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const auth = useSelector((state) => state.auth);

  const onSubmit = async () => {
    try {
      const data = await dispatch(signUpUser(values));
      console.log(auth.registerStatus);
      if (auth.registerStatus === "success") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchemas,
      onSubmit,
    });

  return (
    <div className="form-container">
      <form method="post" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Username</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            type="text"
            name="name"
          />
          {errors.name && touched.name && (
            <span className="error">{errors.name}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="text"
            name="email"
          />
          {errors.email && touched.email && (
            <span className="error">{errors.email}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type={visible ? "text" : "password"}
            name="password"
          />
          {visible ? (
            <AiOutlineEye
              className="eye-icon"
              onClick={() => setVisible(!visible)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="eye-icon"
              onClick={() => setVisible(!visible)}
            />
          )}
          {errors.password && touched.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>
        <button type="submit">
          {auth.registerStatus === "pending" ? (
            <span>
              Submiting
              <CircularProgress
                size="2rem"
                sx={{ color: "rgba(255,255,255,.7)" }}
              />
            </span>
          ) : (
            <span>Submit</span>
          )}
        </button>
        <p>
          Already have and account?
          <br />
          <span className="line">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default Register;
