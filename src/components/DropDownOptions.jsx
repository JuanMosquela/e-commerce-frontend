import { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
import useOnClickOutside from "../hooks/useClickOutside";
import "../input.css";

const DropDownOptions = ({ product }) => {
  const [open, setOpen] = useState(false);

  const options = useRef();

  const res = useOnClickOutside(options, open, setOpen);

  console.log(res);

  return (
    <div ref={options}>
      <SlOptionsVertical onClick={() => setOpen((prev) => !prev)} />

      {open && (
        <ul className=" z-20 absolute top-2 right-[-15px] bg-white shadow-md px-2 py-2 rounded-sm ">
          <Link to={`/user-products/view/${product._id}`}>
            <li className="flex items-center py-1 gap-3 cursor-pointer hover:bg-gray ">
              <AiOutlineEye />
              <p>View</p>
            </li>
          </Link>
          <li className="flex items-center py-1 gap-3 cursor-pointer hover:bg-gray">
            <AiFillEdit />
            Edit
          </li>
          <li className="flex items-center py-1 gap-3 cursor-pointer hover:bg-gray">
            <AiOutlineDelete />
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};
export default DropDownOptions;
