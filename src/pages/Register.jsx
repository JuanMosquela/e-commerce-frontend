import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { registerSchemas } from "../schemas/registerSchemas";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/slices/authSliceRedux";
import { CircularProgress } from "@mui/material";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSignUpMutation } from "../redux/productsApi";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/";

  console.log(auth.isSuccess);

  const [signUp, { data, error, isLoading }] = useSignUpMutation();

  useEffect(() => {
    console.log(error);
    if (data?.user) {
      navigate("/login");
    }

    if (error?.status === 401) {
      toast.error(error?.data?.msg);
    }
  }, [data, error]);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await signUp(values);
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
    <div className="flex flex-col justify-center items-center min-h-[100vh]   bg-white">
      <form
        className="w-[400px] bg-white py-6 px-5  relative"
        method="post"
        onSubmit={handleSubmit}
      >
        <h2 className="text-slate text-4xl mb-8 font-semibold">Register</h2>
        <div className="relative mb-4 min-h-[60px]">
          <input
            className="w-full py-1 text-md outline-none border-orange border-b-2 "
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            type="text"
            name="name"
            placeholder="UserName"
          />
          {errors.name && touched.name && (
            <p className="pt-2 text-red text-sm font-semibold">{errors.name}</p>
          )}
        </div>
        <div className="relative mb-4 min-h-[60px]">
          <input
            className="w-full py-1 text-md outline-none border-orange border-b-2 "
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
            className="w-full py-1 text-md outline-none border-orange border-b-2 "
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
          disabled={isSubmitting}
          className=" block w-full bg-orange text-white rounded-md p-1 mb-[5rem] "
        >
          {isLoading ? (
            <span className="text-2xl">
              <CircularProgress
                size="1rem"
                sx={{ color: "rgba(255,255,255,.6)" }}
              />
            </span>
          ) : (
            <span className="text-xl">Submit</span>
          )}
        </button>
        <p className="absolute bottom-0 text-slate-700 text-sm font-thin">
          Already have and account?
          <br />
          <span className="line">
            <Link className="text-orange text-xl font-bold" to="/login">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default Register;
