import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { registerSchemas } from "../schemas/registerSchemas";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/authSliceRedux";
import { CircularProgress } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { isAllOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log(auth);
    if (auth.token) navigate(from);
  }, []);

  const onSubmit = async () => {
    try {
      const data = await dispatch(signUpUser(values));

      console.log(auth.registerStatus);

      console.log(data);

      if (data.type === "success" || "success") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(`${auth.loginError.msg}`, { position: "top-right" });
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
