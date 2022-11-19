import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <div className="w-[600px] flex justify-between items-center">
      <input
        className="rounded-sm w-full border-1 bg-gray/10 ease-in duration-100  text-slate-900 p-2 outline-none "
        type="text"
        placeholder="Search products ..."
      />
      <button className="bg-orange text-white px-6 py-2 flex gap-2 items-center hover:cursoir-pointer hover:bg-orange-300 ease-in duration-200">
        <AiOutlineSearch />
        Search
      </button>
    </div>
  );
};
export default Search;
