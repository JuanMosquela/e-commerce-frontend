import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { registerSchemas } from "../schemas/registerSchemas";

import { useDispatch, useSelector } from "react-redux";
import { currentUser, signUpUser } from "../redux/authSliceRedux";
import { CardActions, CircularProgress } from "@mui/material";
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

  const onSubmit = async (values) => {
    try {
      await dispatch(signUpUser(values));
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, { position: "top-right" });
    } finally {
      resetForm();
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchemas,
    onSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-black">
      <form
        className="w-[400px] bg-white py-10 px-5"
        method="post"
        onSubmit={handleSubmit}
      >
        <h2 className="text-slate-900 text-5xl mb-8">Register</h2>
        <div className="relative mb-4 min-h-[60px]">
          <input
            className="w-full py-1 text-md outline-none border-orange-200 border-b-2 "
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            type="text"
            name="name"
            placeholder="UserName"
          />
          {errors.name && touched.name && (
            <p className="pt-2 text-red-500 text-sm font-semibold">
              {errors.name}
            </p>
          )}
        </div>
        <div className="relative mb-4 min-h-[60px]">
          <input
            className="w-full py-1 text-md outline-none border-orange-200 border-b-2 "
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="text"
            name="email"
            placeholder="Email Adress"
          />
          {errors.email && touched.email && (
            <p className="pt-2 text-red-500 text-sm font-semibold">
              {errors.email}
            </p>
          )}
        </div>
        <div className="relative mb-4 min-h-[60px]">
          <input
            className="w-full py-1 text-md outline-none border-orange-200 border-b-2 "
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
            <p className="pt-2 text-red-500 text-sm font-semibold">
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className=" block w-full bg-orange-400 text-white rounded-md p-1 mb-6 "
        >
          {isSubmitting ? (
            <span className="text-2xl">
              Submiting
              <CircularProgress
                size="2rem"
                sx={{ color: "rgba(255,255,255,.7)" }}
              />
            </span>
          ) : (
            <span className="text-xl">Submit</span>
          )}
        </button>

        <p className="text-slate-700">
          Already have and account?
          <br />
          <span className="line">
            <Link className="text-orange-500" to="/login">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default Register;
