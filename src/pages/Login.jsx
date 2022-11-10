import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../redux/authSliceRedux";

import { loginSchemas } from "../schemas/loginSchemas";
import publicRequest from "../utils/request-methods.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = await dispatch(signIn(values));
      console.log(data);
      if (data.payload?.token) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
    } finally {
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchemas,
      onSubmit,
    });

  return (
    <div className="form-container">
      <form method="post" onSubmit={handleSubmit}>
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
            type="text"
            name="password"
          />
          {errors.password && touched.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>
        <button type="submit" disabled={loading} style={{ fontSize: "2rem" }}>
          {loading ? (
            <>
              <span style={{ marginRight: "10px" }}>Loading</span>
              <CircularProgress
                sx={{ color: "rgba(255,255,255,.8)" }}
                size="2rem"
              />
            </>
          ) : (
            <span>Login</span>
          )}
        </button>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default Login;
