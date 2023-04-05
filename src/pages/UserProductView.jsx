import { useParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { useFetchSingleProductQuery } from "../redux/api/productApi";

const UserProductView = () => {
  const { id } = useParams();
  console.log(id);

  const { data, error } = useFetchSingleProductQuery(id);

  console.log(data?.product);

  return (
    <div>
      <CardProduct product={data?.product} />
    </div>
  );
};
export default UserProductView;
