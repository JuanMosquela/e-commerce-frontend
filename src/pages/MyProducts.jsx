import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetUserQuery,
} from "../redux/api/productsApi";

import { MdOutlineAddCircle } from "react-icons/md";

import EmptyComponent from "../components/EmptyComponent";
import { useSelector } from "react-redux";
import ProductModal from "../components/ProductModal";
import { CircularProgress } from "@mui/material";
import TitleComponent from "../components/TitleComponent";

const MyProducts = () => {
  const id = useSelector((state) => state.auth.user._id);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const { data, isLoading: userLoading } = useGetUserQuery(id);

  console.log(data?.user?.products.length);

  return (
    <section className="h-screen md:container  ">
      {userLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <CircularProgress sx={{ color: "var(--color-orange)" }} size="5rem" />
        </div>
      ) : data && data?.user?.products.length > 0 ? (
        <table className=" table-auto w-full rounded-lg bg-white shadow-md mt-5 md:mt-10 ">
          <thead className=" border-b-2 bg-dark text-white">
            <tr className="">
              <th className="py-2">Product</th>
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.user?.products.map((product) => (
              <tr
                key={product._id}
                className="text-center border-slate/20 border "
              >
                <td>
                  <img
                    className=" block mx-auto w-[45px] h-[45px] rounded-full object-cover p-1 "
                    src={product.pictureURL[0]}
                    alt={`${product.title} product`}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="relative flex gap-2 justify-center items-center ">
                    <button className="rounded-md text-xl bg-blue  w-[30px] h-[30px] cursor-pointer flex justify-center items-center">
                      <ProductModal data={product} />
                    </button>
                    <button className="rounded-md w-[30px] h-[30px] bg-red flex justify-center items-center text-xl text-white">
                      {isLoading ? (
                        <CircularProgress
                          sx={{ color: "rgba(255,255,255,.8)" }}
                          size="1rem"
                        />
                      ) : (
                        <AiOutlineDelete
                          onClick={() => deleteProduct(product._id)}
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <TitleComponent
          title="You didn't published any products yet"
          icon={<MdOutlineAddCircle />}
          text="You didn't published any products yet"
          status={false}
          actionButton={
            <Link
              to="/create-product"
              className="uppercase text-md text-orange hover:text-white hover:bg-orange flex items-center gap-2 justify-center font-bold p-1 px-2  rounded-md duration-150 "
            >
              <MdOutlineAddCircle className="text-xl" />
              Create product
            </Link>
          }
        />
      )}
    </section>
  );
};
export default MyProducts;
