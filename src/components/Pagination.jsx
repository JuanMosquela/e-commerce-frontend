const Pagination = ({ total, productsPerPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(total / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="col-span-2">
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
    </div>
  );
};

export default Pagination;
