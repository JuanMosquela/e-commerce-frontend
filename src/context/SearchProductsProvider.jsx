import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../utils/request-methods";

export const ProductsContext = createContext();

const SearchProductsProvider = ({ children }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const [loading, setLoading] = useState(true);

  const [searchedProducts, setSearchedProducts] = useState(null);

  const handleInput = (value) => {
    setInputValue(value);
  };

  const handleClick = async (value) => {
    try {
      const { data } = await publicRequest.get(
        value ? `/search/products/${inputValue}` : `/products`
      );
      setSearchedProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInputValue("");
      navigate("/products");
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        handleClick,
        inputValue,
        searchedProducts,
        handleInput,
        loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default SearchProductsProvider;
