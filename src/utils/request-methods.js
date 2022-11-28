import axios from "axios";

export const BASE_URL = "https://fit-commerce-api.onrender.com/api";

const register = async (values) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, {
    name: values.name,
    email: values.email,
    password: values.password,
  });

  return data;
};

const login = async (values) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, values);

  return data;
};

const getProducts = async (value) => {
  const response = await axios.get(
    value ? `${BASE_URL}/?search=${value}` : `${BASE_URL}/products`
  );
  return response;
};

const getFilterProducts = async (values) => {
  console.log(values);
  // const response = await axios.get(
  //   value ? `${BASE_URL}/?search=${value}` : `${BASE_URL}/products`
  // );
};

const publicRequest = {
  register,
  login,
  getProducts,
  getFilterProducts,
};

export default publicRequest;
