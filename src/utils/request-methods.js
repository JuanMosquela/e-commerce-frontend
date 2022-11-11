import axios from "axios";

export const BASE_URL = "https://fit-commerce-api.onrender.com/api";

const register = async (values) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, {
    name: values.name,
    email: values.email,
    password: values.password,
  });

  // if (data) localStorage.setItem("user", JSON.stringify(data));

  return data;
};

const login = async (values) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, {
    email: values.email,
    password: values.password,
  });

  return data;
};

const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response;
};

const publicRequest = {
  register,
  login,
  getProducts,
};

export default publicRequest;
