import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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

  return (
    <div className="col-span-2 ">
      <button
        className=" py-2 px-4 mx-2 bg-orange text-white rounded-md font-bold disabled:opacity-75"
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        <p className="flex items-center gap-2">
          <MdKeyboardArrowLeft /> prev
        </p>
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className="py-2 px-4 mx-2 bg-orange text-white rounded-md font-bold"
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className=" py-2 px-4 mx-2 bg-orange text-white rounded-md font-bold disabled:opacity-75"
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === 4}
      >
        <p className="flex items-center gap-2">
          next <MdKeyboardArrowRight />
        </p>
      </button>
    </div>
  );
};

export default Pagination;
