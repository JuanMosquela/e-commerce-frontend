import { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchAllProductsQuery,
  useFetchAllReviewsQuery,
} from "../redux/productsApi";
import { addToCart } from "../redux/shoppingCartRedux";
import CardProduct from "./CardProduct";
import RatingComponent from "./RatingComponent";
import { Rating } from "@mui/material";

const ProductDetail = ({ data }) => {
  const [pictureIndex, setPictureIndex] = useState(0);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userLogin);

  const { data: dataReviews } = useFetchAllReviewsQuery(data._id);

  const obj = {
    product: data,
    counter: counter,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userReview = {
      user,
      comment,
      value,
    };

    console.log(userReview);
  };

  const handleChange = (e) => {
    setCounter(Number(e.target.value));
  };

  const handleClick = (obj) => {
    console.log(obj.counter);
    dispatch(addToCart(obj));
  };
  const productStock = [];

  for (let i = 1; i <= data.stock; i++) {
    productStock.push(i);
  }

  return (
    <div className="container grid grid-cols-4 min-h-full justify-center mt-[8rem] gap-4 mb-10 ">
      <div className="flex flex-col col-span-2 gap-4">
        <figure className="w-full">
          <img
            className="m-auto h-[500px] object-contain rounded-sm shadow-md"
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
      <div className="product-info  col-span-2 leading-10">
        <h3 className="text-4xl font-semibold ">{data.title}</h3>
        <Rating
          className="read-only"
          value={data.rating}
          precision={0.5}
          readOnly
        />
        <span className="text-sm rounded-xl bg-orange text-white font-bold px-6 py-2">
          {data.branch}
        </span>
        <h4 className="">
          {" "}
          <span className="text-slate font-semibold text-sm capitalize">
            categorias:
          </span>{" "}
          {data.category}
        </h4>

        <div className="mb-4 flex gap-2">
          <p className="text-md font-semibold text-slate">Disponibilidad:</p>
          <p className="text-sm font-thin">
            {data.stock === 0 ? "No stock" : `In Stock`}
          </p>
        </div>

        <span className="block mb-4 text-slate-900 text-2xl">
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
              className=" px-2 py-1 w-full rounded-sm hover:cursor-pointer"
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
            className="flex items-center gap-2 px-8 py-2 text-white text-md  uppercase bg-orange hover:shadow-lg ease-in duration-100 rounded-md"
            onClick={() => handleClick(obj)}
          >
            <BsFillCartPlusFill />
            Add to Cart
          </button>
          <button
            className="flex items-center gap-2 px-8 py-2 text-slate-900 border border-slate-400 text-md  uppercase  rounded-md"
            onClick={() => handleClick(obj)}
          >
            <AiOutlineHeart />
            Wishlist
          </button>
        </div>
      </div>

      <h3 className="text-slate-900 text:2xl font-semibold mb-2 col-span-1 ">
        Description :
      </h3>
      <div className=" text-sm text-gray-900 col-span-3 mb-10">
        <p className="mb-6 text-slate font-thin ">{data.description}</p>
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(data.subCategory).map((cat) => (
            <li className="text-slate font-thin capitalize">
              <span className="font-semibold text-sm">{cat[0]}: </span> {cat[1]}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <h3 className="text-md text-slate font-semibold mb-4">Reviews</h3>
            <div className="flex flex-col gap-2 max-h-[280px] overflow-scroll">
              {dataReviews?.productReviews?.map((review) => (
                <div className="bg-slate/10 rounded-md p-2">
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
              <RatingComponent
                value={value}
                setValue={setValue}
                hover={hover}
                setHover={setHover}
              />
              <button
                type="submit"
                className="bg-orange text-white font-semibold text-md px-4 py-2 mt-6 rounded-md"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
