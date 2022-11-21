import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import publicRequest from "../utils/request-methods";

export const ProductsContext = createContext();

const SearchProductsProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (value) => {
    setInputValue(value);
  };

  return (
    <ProductsContext.Provider
      value={{
        inputValue,
        handleInput,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default SearchProductsProvider;
