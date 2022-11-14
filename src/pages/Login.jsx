import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { signIn } from "../redux/authSliceRedux";
import { loginSchemas } from "../schemas/loginSchemas";
import loginBackground from "../img/login.jpg";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(auth);

  const loading = auth.isLoading;

  useEffect(() => {
    if (auth.userLogin) navigate(from);
  }, []);

  const onSubmit = async () => {
    try {
      const data = await dispatch(signIn(values));
      console.log(data);
      if (data.payload?.token) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
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
      <div className="form-wrapper">
        <figure>
          <img src={loginBackground} alt="" />
        </figure>
        <form method="post" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
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
              <p className="error">{errors.email}</p>
            )}
          </div>
          <div className="input-group">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type="text"
              name="password"
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
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

          <p className="google">Or signIn with google account</p>

          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
