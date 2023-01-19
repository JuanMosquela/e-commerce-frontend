import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addPage } from "../redux/searchFilterRedux";

const Pagination = ({
  total,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(total / productsPerPage); i++) {
    pages.push(i);
  }

  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center">
      <button
        className="mr-1 py-1 md:py-2 md:px-4  bg-orange text-white rounded-md font-bold disabled:opacity-75"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <p className="flex items-center text-2xl gap-2">
          <MdKeyboardArrowLeft />
        </p>
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className="py-1 md:py-2 px-2 md:px-4  bg-orange text-white rounded-md font-bold"
            key={index}
            onClick={() => {
              dispatch(addPage(page));
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        );
      })}
      <button
        className="ml-1 py-1 md:py-2 md:px-4  bg-orange text-white rounded-md font-bold disabled:opacity-75"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages.length}
      >
        <p className="flex items-center text-2xl gap-2">
          <MdKeyboardArrowRight />
        </p>
      </button>
    </div>
  );
};

export default Pagination;
