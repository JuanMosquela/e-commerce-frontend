import { CircularProgress } from "@mui/material";
import { useUpdateProductCartMutation } from "../redux/api/productsApi";

const CounterButton = ({ product }) => {
  const [updateProductCart, { isLoading }] = useUpdateProductCartMutation();

  const handlePlusButton = () => {
    console.log("mayus");
    updateProductCart({
      id: product?.item?._id,
      value: "asc",
    });
  };

  const handleMinusButton = () => {
    console.log("minus");
    updateProductCart({
      id: product?.item?._id,
      value: "dsc",
    });
  };

  return (
    <div className="cursor-pointer border-2 border-orange px-4 py-2 flex justify-between w-[200px] mx-auto rounded-md bg-slate/10 slate">
      <span className="text-[1.2rem] " onClick={handleMinusButton}>
        -
      </span>
      <span className="text-[1.2rem]  ">
        {isLoading ? (
          <>
            <CircularProgress
              sx={{ color: "rgba(000,000,000,.8)" }}
              size="1.5rem"
            />
          </>
        ) : (
          <p>{product?.quantity}</p>
        )}
      </span>
      <span className="text-[1.2rem]  " onClick={handlePlusButton}>
        +
      </span>
    </div>
  );
};
export default CounterButton;
