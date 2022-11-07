import { createContext, useState } from "react";
import { publicRequest } from "../utils/request-methods";

export const ProductsContext = createContext();

const SearchProductsProvider = ({ children }) => {
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
