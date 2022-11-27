import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../redux/authSliceRedux";
import { loginSchemas } from "../schemas/loginSchemas";
import loginBackground from "../img/login.jpg";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import publicRequest from "../utils/request-methods";
import axios from "axios";
import { GoogleContext } from "../context/GoogleProvider";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLoginWithGoogle, googleUser } = useContext(GoogleContext);
  const from = location.state?.from?.pathname || "/";

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(googleUser);

  const loading = auth.isLoading;

  useEffect(() => {
    if (auth.userLogin || googleUser?.token) navigate(from);
  }, [googleUser]);

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
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const googleUser = {
        aud: data.sub,
        name: data.name,
        email: data.email,
        picture: data.picture,
        password: data.sub,
      };

      handleLoginWithGoogle(googleUser);

      await publicRequest.login(googleUser);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-white  ">
      <div className="flex h-[540px] rounded-lg overflow-hidden relative  shadow-md ">
        <form
          className="w-[400px] bg-white py-6 px-5 "
          method="post"
          onSubmit={handleSubmit}
        >
          <h2 className="text-slate text-4xl mb-8 font-semibold">Sign In</h2>
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
              <AiFillEyeInvisible
                className="absolute right-[15px] top-0 text-2xl"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <AiFillEye
                className="absolute right-[15px] top-0 text-2xl"
                onClick={() => setVisible(!visible)}
              />
            )}
            {errors.password && touched.password && (
              <p className="pt-2 text-red text-sm font-semibold">
                {errors.password}
              </p>
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
          <p className="py-8 text-center text-slate text-xl">or</p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={login}
              className="flex items-center text-lg gap-4 shadow-sm px-4 py-2"
            >
              <FcGoogle />
              Login with Google
            </button>
          </div>

          <p className="absolute bottom-0 text-slate-700 text-sm font-thin pb-2">
            Need an Account?
            <br />
            <span>
              <Link className="text-orange text-xl font-bold" to="/register">
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
