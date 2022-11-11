import { useContext } from "react";
import { ProductsContext } from "../context/SearchProductsProvider";
import { useFetchAllProductsQuery } from "../redux/productsApi";

const Products = () => {
  const { searchedProducts, inputValue } = useContext(ProductsContext);

  // const [dataProducts, setDataProducts] = useState([]);

  // const [loading, setLoading] = useState(true);

  // const products = useSelector((state) => state.products);

  // const dispatch = useDispatch();

  const { data } = useFetchAllProductsQuery();

  console.log(data);

  return (
    <section className="container-products">
      {/* {loading ? (
        <CircularProgress />
      ) : (
        <div className="grid-container">
          {!searchedProducts
            ? data?.products?.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <CardProduct product={product} />
                </Link>
              ))
            : searchedProducts?.results?.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <CardProduct product={product} />
                </Link>
              ))}
        </div>
      )} */}
    </section>
  );
};
export default Products;
