import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProductToCartMutation,
  useAddToFavMutation,
  useCreateReviewMutation,
  useFetchAllReviewsQuery,
} from "../redux/api/productsApi";
import { addToCart } from "../redux/shoppingCartRedux";

import RatingComponent from "./RatingComponent";
import { CircularProgress, Rating } from "@mui/material";
import { useContext } from "react";
import { GoogleContext } from "../context/GoogleProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = ({ data }) => {
  const [pictureIndex, setPictureIndex] = useState(0);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const [addProductToCart, { isLoading: addProductLoading }] =
    useAddProductToCartMutation();

  const auth = useSelector((state) => state.auth);

  const { googleUser } = useContext(GoogleContext);

  const { data: dataReviews } = useFetchAllReviewsQuery(data._id);

  const navigate = useNavigate();

  const [buttonClicked, setButtonClicked] = useState(false);

  const [createReview, { data: reviewData, isLoading, error }] =
    useCreateReviewMutation();
  console.log(reviewData, error);

  const [addToFav, { isLoading: favLoading }] = useAddToFavMutation();

  const obj = {
    product: data,
    counter: counter,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!auth.token) {
      toast.error("Debes estar autenticado");
      navigate("/login");
      return;
    }

    createReview({
      id: data._id,
      user: auth?.user.name,
      comment,
      value,
    });

    if (!isLoading) e.target.reset();
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

    if (!isLoading) {
      console.log(data);
    }

    toast.info("Product added to fav");
  };

  const handleChange = (e) => setCounter(Number(e.target.value));

  const handleClick = (obj) => {
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

  useEffect(() => {
    if (reviewData && !isLoading) {
      toast.success("Product reviewed");
    }

    if (error?.status === 501) {
      toast.error(`${error?.data?.msg}`);
    }
  }, [error, reviewData]);

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

        {/* <h4 className="">
          {" "}
          <span className="text-slate font-semibold text-sm capitalize">
            categoria
          </span>{" "}
          {data.category}
        </h4> */}

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

      <h3 className="text-slate-900 text:2xl font-semibold mb-2 col-span-1 ">
        Description :
      </h3>
      {/* <div className=" text-sm text-gray-900 col-span-3 mb-10">
        <p className="mb-6 text-slate font-thin ">{data.description}</p>
        {data.subCategory && (
          <ul className="grid grid-cols-2 gap-4">
            {Object.entries(data.subCategory).map((cat, index) => (
              <li key={index} className="text-slate font-thin capitalize">
                <span className="font-semibold text-sm">{cat[0]}: </span>{" "}
                {cat[1]}
              </li>
            ))}
          </ul>
        )}
      </div> */}
      <div className="col-span-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <h3 className="text-md text-slate font-semibold mb-4">Reviews</h3>
            {dataReviews?.productReviews?.length === 0 ? (
              <p>Todavia no hay comentarios</p>
            ) : (
              <div className="flex flex-col-reverse  gap-2  ">
                {dataReviews?.productReviews?.map((review, index) => (
                  <div key={index} className="bg-slate/10 rounded-md p-2">
                    <div className="flex items-center gap-2">
                      <h4>{review.user}</h4>
                      <Rating
                        className="read-only"
                        value={review.ratings}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p className="text-md">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <form action="" onSubmit={handleSubmit}>
              <h3 className="text-md text-slate font-semibold">
                Deja un comentario
              </h3>
              <textarea
                className="bg-slate/10 p-2 text-md w-full outline-none mt-4 resize-none rounded-md"
                name="textarea"
                rows="7"
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deja un comentario"
              ></textarea>
              <div className="flex items-center justify-between">
                <RatingComponent
                  value={value}
                  setValue={setValue}
                  hover={hover}
                  setHover={setHover}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange flex justify-center items-center  px-6 gap-3 text-white font-semibold text-md w-[100px]  py-2 mt-6 rounded-md"
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size="1.5rem"
                        sx={{ color: "rgba(255,255,255)" }}
                      />
                    </>
                  ) : (
                    "Enviar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
