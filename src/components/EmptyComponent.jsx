import { BsBagDash } from "react-icons/bs";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const EmptyComponent = ({ title }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center leading-6 text-dark uppercase font-nunito">
        <h2 className="font-black text-4xl  ">{title}</h2>
        <BsBagDash className="mx-auto text-5xl my-6 " />
        <Link
          to="/"
          className="flex gap-4 w-full justify-center items-center font-semibold hover:text-orange duration-200"
        >
          <HiOutlineArrowNarrowLeft className="text-2xl" />
          <p>Go back</p>
        </Link>
      </div>
    </div>
  );
};
export default EmptyComponent;
