import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProductToCartMutation,
  useAddToFavMutation,
} from "../redux/api/productsApi";
import { addToCart } from "../redux/shoppingCartRedux";
import { CircularProgress, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Reviews from "./Reviews";

const ProductDetail = ({ data }) => {
  const [pictureIndex, setPictureIndex] = useState(0);

  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const [addProductToCart, { isLoading: addProductLoading }] =
    useAddProductToCartMutation();

  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [buttonClicked, setButtonClicked] = useState(false);

  const [addToFav, { isLoading: favLoading }] = useAddToFavMutation();

  const obj = {
    product: data,
    counter: counter,
  };

  const handleFav = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (!auth.token) {
      toast.error("Debes estar autenticado");
      navigate("/login");
      return;
    }

    const newFavProduct = {
      id: data._id,
      name: auth.user.name,
    };

    addToFav(newFavProduct);

    toast.info("Product added to fav");
  };

  const handleChange = (e) => setCounter(Number(e.target.value));

  const handleClick = (obj) => {
    if (data.stock === 0) {
      toast.error("Product with no Stock");
      return;
    }
    dispatch(addToCart(obj));
    addProductToCart({
      product: data._id,
      quantity: counter,
    });
  };

  const productStock = [];

  for (let i = 1; i <= data.stock; i++) {
    productStock.push(i);
  }

  return (
    <div className="container grid grid-cols-4 min-h-full justify-center mt-[8rem] gap-4 mb-10 ">
      <div className="flex flex-col col-span-2 w-[600px] gap-4 ">
        <figure className="w-full ">
          <img
            className="m-auto h-[500px] w-full object-cover rounded-sm"
            src={data.pictureURL[pictureIndex]}
            alt=""
          />
        </figure>
        <div className="grid grid-cols-4 items-center gap-1 ">
          {data.pictureURL.map((picture, index) => (
            <img
              className="gap-2 object-contain h-[200px] hover:scale-[1.1] p-1 ease-in duration-100 hover:shadow-md"
              key={picture}
              onMouseOver={() => setPictureIndex(index)}
              src={picture}
              alt="product"
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 font-nunito">
        <h4 className="inline text-2xl  text-orange font-bold mb-4 ">
          {data.branch}
        </h4>
        <h3 className=" max-w-[600px] text-5xl text-dark mb-4 leading-[4rem] font-black ">
          {data.title}
        </h3>
        <Rating
          className="mb-4"
          name="size-large"
          size="large"
          value={data.rating}
          precision={0.5}
          readOnly
        />

        <span className="flex  items-center  text-white font-semibold text-sm mb-4 ">
          {data.stock === 0 ? (
            <p className="bg-red px-2 py-1 rounded-md ">No stock</p>
          ) : (
            <p className="bg-blue px-2 py-1 rounded-md  ">En Stock</p>
          )}
        </span>

        <p className="mb-6 text-slate  font-semibold font-nunito  ">
          {data.description.slice(0, 320)}...
        </p>

        <span className="block mb-4 text-dark text-3xl font-bold">
          $ {data.price}
        </span>

        <div className="mb-4 max-w-[100px]">
          {productStock.length === 0 ? (
            <select
              className=" px-2 py-1 w-full rounded-sm hover:cursor-pointer"
              disabled
            >
              <option value="0">0</option>
            </select>
          ) : (
            <select
              onChange={(e) => handleChange(e)}
              className=" p-2 w-full rounded-md hover:cursor-pointer bg-gray border-2 border-orange text-slate"
            >
              {productStock.map((qty, index) => (
                <option key={index} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-4">
          <button
            className="flex items-center justify-center gap-2 min-w-[180px]  py-2 text-white text-md  uppercase bg-orange hover:shadow-lg ease-in duration-100 rounded-md"
            onClick={() => handleClick(obj)}
          >
            {addProductLoading ? (
              <CircularProgress
                sx={{ color: "rgba(255,255,255,.8)" }}
                size="1.5rem"
              />
            ) : (
              <>
                <BsFillCartPlusFill />
                Add to Cart
              </>
            )}
          </button>
          <button
            className="flex items-center justify-center gap-2 min-w-[180px] px-8 py-2 text-dark border border-slate text-md  uppercase  rounded-md"
            onClick={handleFav}
          >
            {favLoading ? (
              <CircularProgress
                sx={{ color: "rgba(000,000,000,.8)" }}
                size="1.5rem"
              />
            ) : (
              <>
                <AiOutlineHeart />
                WishList
              </>
            )}
          </button>
        </div>
      </div>

      {auth.user._id === data.boughtBy && <Reviews data={data} auth={auth} />}
    </div>
  );
};
export default ProductDetail;
