import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/shoppingCartRedux";

const ProductDetail = ({ productDetail }) => {
  const cart = useSelector((state) => state);

  const [pictureIndex, setPictureIndex] = useState(0);

  const [counter, setCounter] = useState(1);

  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const obj = {
    product: productDetail,
    counter: counter,
  };

  const handleChange = (e) => {
    setCounter(Number(e.target.value));
  };

  const handleClick = (obj) => {
    dispatch(addToCart(obj));
  };
  const productStock = [];

  for (let i = 1; i <= productDetail.stock; i++) {
    productStock.push(i);
  }

  return (
    <div className="product-detail">
      <div className="pictures-wrapper">
        <figure className="main-picture">
          <img src={productDetail.pictureURL[pictureIndex]} alt="" />
        </figure>
        <div className="picture-options">
          {productDetail.pictureURL.map((picture, index) => (
            <img
              key={index}
              onMouseOver={() => setPictureIndex(index)}
              src={picture}
              alt="product"
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h4>{productDetail.category}</h4>
        <h3>{productDetail.title}</h3>
        <p>
          {view
            ? productDetail.description
            : productDetail.description?.substring(0, 500)}
          ..
        </p>
        <button className="readmore" onClick={() => setView(!view)}>
          {view ? "Hide text" : "Read more"}
        </button>

        <span className="price">$ {productDetail.price}</span>
        <div className="button-wrapper">
          {productStock.length === 0 ? (
            <div>no hay stock</div>
          ) : (
            <select onChange={(e) => handleChange(e)} className="button-group">
              {productStock.map((qty) => (
                <option value={qty}>{qty}</option>
              ))}
            </select>
          )}

          <button className="add-button" onClick={() => handleClick(obj)}>
            <BsFillCartPlusFill />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
