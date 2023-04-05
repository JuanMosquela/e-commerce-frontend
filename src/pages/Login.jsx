import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/authSliceRedux";
import { loginSchemas } from "../schemas/loginSchemas";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { toast } from "react-toastify";
import { useSignInMutation } from "../redux/api/authApi";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [signIn, { data, isLoading, error }] = useSignInMutation();

  console.log(error);

  useEffect(() => {
    if (data?.token) {
      dispatch(setCredentials(data));
      toast.success("Logeado correctamente");
    }
    if (error?.status === 401) {
      toast.error(error.data.msg);
    }
    if (error?.status === 400) {
      toast.error("Este usuario no existe");
    }

    if (auth?.token) navigate(from);
  }, [data, error]);

  useEffect(() => {
    if (auth?.token) navigate(from);
  }, [auth]);

  const onSubmit = async () => {
    try {
      await signIn(values);
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
    <div className="flex justify-center items-center min-h-[100vh] bg-gray  ">
      <div className="flex  rounded-lg overflow-hidden relative   shadow-md ">
        <form
          className="w-[400px] bg-white py-6 px-5 "
          method="post"
          onSubmit={handleSubmit}
        >
          <Link
            className="block  text-center py-1  font-bold uppercase text-sm md:text-md lg:text-3xl text-black mb-10 "
            to="/"
          >
            <span className="text-orange text-3xl font-bold mb-4">
              physical{" "}
            </span>
            point
          </Link>
          <h2 className="text-slate text-2xl mb-8 font-semibold">Sign In</h2>
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
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bloc flex items-center justify-center w-full h-12 bg-orange hover:bg-orange/90 text-white rounded-md py-2 font-bold  "
          >
            {isLoading ? (
              <>
                <CircularProgress
                  sx={{ color: "rgba(255,255,255,.8)" }}
                  size="1.5rem"
                />
              </>
            ) : (
              <span className="text-sm uppercase">Login</span>
            )}
          </button>

          <div className=" pt-10 text-end ">
            <p className="   text-slate text-md font-thin pb-2">
              Need an Account?
              <br />
              <Link className="text-orange text-xl font-bold" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
