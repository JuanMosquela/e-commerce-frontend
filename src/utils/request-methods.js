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
  const { data } = await axios.get(
    `${BASE_URL}/search/products/?category=${values.category}&branch=${values.branch}&rating=${values.rating}&min=${values.price[0]}&max=${values.price[1]}`
  );

  return data;
};

const publicRequest = {
  register,
  login,
  getProducts,
  getFilterProducts,
};

export default publicRequest;
