import { Link } from "react-router-dom";

const TitleComponent = ({ title, icon, text, status, actionButton }) => {
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

        <div className=" ">
          <p className="text-slate text-xl  mb-4 max-w-md block mx-auto   ">
            {text}
          </p>

          <div className="flex items-center justify-center gap-4 ">
            <Link to="/" className="">
              <button
                className={`px-6 py-2 text-white  font-bold uppercase ${
                  status ? "bg-green" : "text-red "
                }`}
              >
                continue shopping
              </button>
            </Link>
            {actionButton && actionButton}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TitleComponent;
