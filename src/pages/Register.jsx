import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { registerSchemas } from "../schemas/registerSchemas";
import { publicRequest } from "../utils/request-methods";

const Register = () => {
  const { setAuth, auth, handleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async () => {
    // handleLogin();
    console.log(values);

    try {
      const { data } = await publicRequest.post(`/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log(data);
      if (data) navigate("/login", { replace: true });
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
            type="text"
            name="password"
          />
          {errors.password && touched.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>
        <button onClick={() => onSubmit()} type="submit">
          Register
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
