import { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/shoppingCartRedux";

const ProductDetail = ({ productDetail }) => {
  const [pictureIndex, setPictureIndex] = useState(0);

  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const obj = {
    product: productDetail,
    counter: counter,
  };

  const handleChange = (e) => {
    setCounter(Number(e.target.value));
  };

  const handleClick = (obj) => {
    console.log(obj.counter);
    dispatch(addToCart(obj));
  };
  const productStock = [];

  for (let i = 1; i <= productDetail.stock; i++) {
    productStock.push(i);
  }

  return (
    <div className="container grid grid-cols-2 min-h-full justify-center mt-[8rem] gap-4 ">
      <div className="flex flex-col gap-4">
        <figure className="w-full">
          <img
            className="m-auto h-[500px] object-contain rounded-sm shadow-md"
            src={productDetail.pictureURL[pictureIndex]}
            alt=""
          />
        </figure>
        <div className="grid grid-cols-4 items-center gap-1 ">
          {productDetail.pictureURL.map((picture, index) => (
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
      <div className="product-info">
        <h4>{productDetail.category}</h4>
        <h3 className="text-4xl font-semibold mb-4 ">{productDetail.title}</h3>
        <div className="flex gap-2 items-center mb-4 text-3xl text-orange">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <div className="px-2 py-1 rounded-md bg-orange-400 text-sm text-white inline">
          Zapatilla
        </div>
        <div className="flex items-center gap-2 my-2">
          <p>Branch:</p>
          <p>Topper</p>
        </div>
        <div className="mb-4 flex gap-2">
          <p className="text-sm font-thin">Availability:</p>
          <p className="text-sm font-thin">
            {productDetail.stock === 0 ? "No stock" : `In Stock`}
          </p>
        </div>

        <span className="block mb-4 text-slate-900 text-2xl">
          $ {productDetail.price}
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
      <div className="col-span-2 max-w-[1000px]">
        <h3 className="text-slate-900 text:2xl font-semibold mb-2 ">
          Description :
        </h3>
        <p className="text-sm text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
          delectus! Aliquid, nulla mollitia, quos incidunt, rem iusto voluptates
          recusandae culpa earum id dolorum tempora nemo dignissimos quia illo
          deleniti veritatis! Hic amet eveniet illum distinctio fugiat assumenda
          culpa molestias, et nam facere dolores quam, saepe cum quis, quod
          dolorem delectus. Quos et quis soluta rem esse ad debitis! Quas fuga
          adipisci ad praesentium dolores alias reiciendis et rerum commodi?
          Quidem accusamus consequuntur maiores? Reiciendis, eos dolore
          reprehenderit minus fuga aspernatur. Cumque laboriosam, ullam itaque
          dolore accusantium mollitia minus, nisi quos odio voluptatem obcaecati
          quae facilis neque doloremque. Facere aut atque dolore quos corporis
          a, neque id, at eveniet optio dolores nobis molestiae non vitae,
          fugiat rem pariatur iusto impedit sed! Similique provident ad laborum
          sint, rem odit dicta dolorum illum iure illo, praesentium
          necessitatibus quibusdam delectus pariatur libero! Culpa dolor sequi
          repellat tempore id, labore consequatur totam ea odit quibusdam,
          placeat facere asperiores officiis enim dicta molestias, dolorem atque
          maiores nihil nisi veritatis? Amet enim saepe magni libero, in quam
          quisquam neque, est voluptate porro dicta qui aperiam a nulla soluta
          vel quidem? Adipisci possimus illum, necessitatibus recusandae enim
          sequi asperiores reiciendis mollitia quaerat vitae quod.
          Necessitatibus neque in unde? Vitae quos voluptatem rerum similique
          illo earum nisi commodi recusandae perspiciatis ipsa, numquam
          doloribus natus a qui aperiam iure laboriosam veniam distinctio rem
          aspernatur. Ipsa ab architecto doloremque dolor! Voluptatum
          accusantium eum dolor neque reprehenderit obcaecati, quibusdam fugiat
          magni distinctio. Impedit ducimus necessitatibus explicabo illum unde
          provident natus quo dicta autem doloribus atque dolore quis architecto
          dolores, rem non accusamus suscipit vero eum, nemo facilis! Iste esse
          veritatis illo nobis? Debitis itaque, quos consequuntur quam
          praesentium eos veniam possimus totam doloribus magni fugit error ea
          odit est tempora delectus voluptate alias porro nobis earum
          blanditiis, accusantium eius sapiente? Tempora, fuga.
        </p>
      </div>
    </div>
  );
};
export default ProductDetail;
