const Aside = () => {
  return (
    <div className="col-span-1 bg-white rounded-sm shadow-lg overflow-hidden ">
      <div className=" divide-y divide-gray-300 px-6 py-4 ">
        <div>
          <h3 className="text-slate-900 font-bold uppercase mb-4 pt-6">
            Categories
          </h3>
          <div className="flex justify-between items-center mb-3">
            <input type="checkbox" name="cat-1" id="cat-1" />
            <label
              className="text-gray-600 ml-3 cursor-pointer"
              htmlFor="cat-1"
            >
              Proteinas
            </label>
            <div className="ml-auto text-gray-600 text-sm">(25)</div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input type="checkbox" name="cat-2" id="cat-2" />
            <label
              className="text-gray-600 ml-3 cursor-pointer"
              htmlFor="cat-2"
            >
              Zapatillas
            </label>
            <div className="ml-auto text-gray-600 text-sm">(25)</div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input type="checkbox" name="cat-3" id="cat-3" />
            <label
              className="text-gray-600 ml-3 cursor-pointer"
              htmlFor="cat-3"
            >
              Maquinas
            </label>
            <div className="ml-auto text-gray-600 text-sm">(25)</div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input type="checkbox" name="cat-4" id="cat-4" />
            <label
              className="text-gray-600 ml-3 cursor-pointer"
              htmlFor="cat-4"
            >
              Accesorios
            </label>
            <div className="ml-auto text-gray-600 text-sm">(25)</div>
          </div>
        </div>
        <div>
          <h3 className="text-slate-900 font-bold uppercase mb-4 pt-6">
            Price
          </h3>
          <div className="flex items-center mb-3 gap-4">
            <input
              className="w-full text-md border-gray-600 bg-gray-100 px-3 outline-none  "
              type="number"
              name="min"
              id="min"
              placeholder="min"
            />
            <span className="text-md text-gray-600 font-thin">-</span>
            <input
              className="w-full text-md border-gray-600 bg-gray-100 px-3 outline-none   "
              type="number"
              name="max"
              id="max"
              placeholder="max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Aside;
