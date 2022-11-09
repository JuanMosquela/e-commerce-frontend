import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { loginSchemas } from "../schemas/loginSchemas";
import { publicRequest } from "../utils/request-methods";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await publicRequest.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (data.token) {
        setAuth(data.token);
        navigate(from, { replace: true });
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      setError(data.msg);
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
        {error && <p>{error}</p>}
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
        <button type="submit" disabled={loading}>
          {loading ? (
            <CircularProgress sx={{ color: "rgba(255,255,255,.5)" }} />
          ) : (
            "Login"
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
