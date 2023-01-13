import { Link } from "react-router-dom";

const TitleComponent = ({ title, icon, text, status }) => {
  return (
    <section className="flex justify-center items-center min-height">
      <div className="text-center leading-6 text-dark  font-nunito  ">
        <i
          className={`flex justify-center    text-7xl mb-6 ${
            status ? "text-green" : "text-red"
          }`}
        >
          {icon}
        </i>
        <h2 className="font-black text-4xl mb-4 uppercase">{title}</h2>

        <div className="flex flex-col  justify-between  items-center ">
          {/* <Link
            to="/"
            className="flex flex-1   gap-4 w-full justify-center items-center font-semibold hover:text-orange duration-200"
          >
            <HiOutlineArrowNarrowLeft className="text-2xl" />
            <p>Go back</p>
          </Link> */}
          <p className="text-slate text-xl  mb-4 max-w-md  ">{text}</p>

          <Link to="/" className="flex-1">
            <button
              className={`px-6 py-2 text-white  font-bold uppercase ${
                status ? "bg-green" : "text-red"
              }`}
            >
              continue shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default TitleComponent;
