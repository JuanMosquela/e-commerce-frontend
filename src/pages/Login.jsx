import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../redux/authSliceRedux";
import { loginSchemas } from "../schemas/loginSchemas";
import loginBackground from "../img/login.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [visible, setVisible] = useState(false);
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

  // const googleAuth = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}api/auth/google/callback`,
  //     "_self"
  //   );
  // };

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
    <div className="flex justify-center items-center min-h-[100vh] bg-dark ">
      <div className="flex h-[600px] rounded-lg overflow-hidden ">
        <figure className="h-[100%]">
          <img
            src={loginBackground}
            className=" h-[100%] object-contain"
            alt=""
          />
        </figure>
        <form
          className="w-[400px] bg-white py-10 px-5 "
          method="post"
          onSubmit={handleSubmit}
        >
          <h2 className="text-slate text-5xl mb-8">Sign In</h2>
          <div className="relative mb-4 min-h-[60px]">
            <input
              className="w-full py-1 text-md outline-none border-orange border-b-2  "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="text"
              name="email"
              placeholder="Email Adress"
            />
            {errors.email && touched.email && (
              <p className="pt-2 text-red text-sm font-semibold">
                {errors.email}
              </p>
            )}
          </div>
          <div className="relative mb-4 min-h-[60px]">
            <input
              className="w-full py-1 text-md outline-none border-orange border-b-2  "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            {visible ? (
              <AiOutlineEye
                className="absolute right-[15px] top-2"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-[15px] top-2"
                onClick={() => setVisible(!visible)}
              />
            )}
            {errors.password && touched.password && (
              <p className="pt-2 text-red text-sm font-semibold">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" block w-full bg-orange text-white rounded-md p-1 "
          >
            {loading ? (
              <>
                <span style={{ marginRight: "10px" }}>Loading</span>
                <CircularProgress
                  sx={{ color: "rgba(255,255,255,.8)" }}
                  size="2rem"
                />
              </>
            ) : (
              <span className="text-2xl">Login</span>
            )}
          </button>
          <p className="py-8 text-center text-slate text-sm">or</p>
          <div className="flex justify-center">
            <GoogleLogin
              className=""
              onSuccess={(credentialResponse) => {
                const decode = jwtDecode(credentialResponse.credential);
                console.log(decode);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <p className="text-slate-700">
            Need an Account?
            <br />
            <span>
              <Link className="text-orange" to="/register">
                Sign Up
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
