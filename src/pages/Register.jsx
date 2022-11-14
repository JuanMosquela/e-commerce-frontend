import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { registerSchemas } from "../schemas/registerSchemas";

import { useDispatch, useSelector } from "react-redux";
import { currentUser, signUpUser } from "../redux/authSliceRedux";
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

  console.log(auth.isSuccess);

  useEffect(() => {
    if (auth.isSuccess) navigate("/login");
    if (auth.userLogin) navigate(from);
  }, [auth]);

  useEffect(() => {}, []);

  const onSubmit = async () => {
    try {
      await dispatch(signUpUser(values));
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, { position: "top-right" });
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
      <form
        className="form-wrapper register"
        method="post"
        onSubmit={handleSubmit}
      >
        <h2>Register</h2>
        <div className="input-group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            type="text"
            name="name"
            placeholder="UserName"
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
            placeholder="Email Adress"
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
            placeholder="Password"
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
          {auth.isLoading ? (
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
