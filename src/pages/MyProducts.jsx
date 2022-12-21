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

const MyProducts = () => {
  const id = useSelector((state) => state.auth.user._id);

  const [deleteProduct, { data: dataProduct, error }] =
    useDeleteProductMutation();

  const { data } = useGetUserQuery(id);

  return (
    <section className=" md:container min-h-screen pt-10 ">
      <div className="flex justify-between mb-6 ">
        <h2 className="text-slate text-md  font-semibold">My Products</h2>
        <Link
          to="/create-product"
          className="flex gap-2 items-center bg-orange text-white py-2 px-4 rounded-md"
        >
          <MdOutlineAddCircle className="text-xl" />
          Create product
        </Link>
      </div>

      {data?.user.products.length === 0 ? (
        <EmptyComponent title="You didn't published any products yet" />
      ) : (
        <table className=" table-auto w-full rounded-lg bg-white shadow-md">
          <thead className=" border-b-2 bg-dark text-white">
            <tr className="">
              <th className="py-2">Product</th>
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className=" ">
            {data?.user?.products.map((product) => (
              <tr
                key={product._id}
                className="text-center border-slate/20 border "
              >
                <td>
                  <img
                    className=" block mx-auto w-[45px] h-[65px] object-cover py-2"
                    src={product.pictureURL[0]}
                    alt={`${product.title} product`}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="relative flex gap-2 justify-center items-center ">
                    <div>
                      <ProductModal data={product} />
                    </div>

                    <AiOutlineDelete
                      className="text-xl bg-red text-white w-[30px] h-[30px] p-1 cursor-pointer  "
                      onClick={() => deleteProduct(product._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
export default MyProducts;
