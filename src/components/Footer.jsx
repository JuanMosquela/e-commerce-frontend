import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="pb-10">
      <div className="container grid grid-cols-5">
        <div>
          <Link
            className=" py-1  font-bold uppercase text-sm md:text-md lg:text-xl text-black  "
            to="/"
          >
            <span className="text-orange-400 text-xl font-bold">physical </span>
            point
          </Link>
        </div>
        <ul className=" flex flex-col gap-3 ">
          <li className="uppercase text-slate-700 text-sm font-semibold">
            solutions
          </li>
          <li className="capitalize text-slate-700 text-sm">marketing</li>
          <li className="capitalize text-slate-700 text-sm">analytics</li>
          <li className="capitalize text-slate-700 text-sm">commerce</li>
          <li className="capitalize text-slate-700 text-sm">insights</li>
        </ul>
        <ul className="flex flex-col gap-3">
          <li className="uppercase text-slate-700 text-sm font-semibold">
            solutions
          </li>
          <li className="capitalize text-slate-700 text-sm">marketing</li>
          <li className="capitalize text-slate-700 text-sm">analytics</li>
          <li className="capitalize text-slate-700 text-sm">commerce</li>
          <li className="capitalize text-slate-700 text-sm">insights</li>
        </ul>
        <ul className=" flex flex-col gap-3 ">
          <li className="uppercase text-slate-700 text-sm font-semibold">
            solutions
          </li>
          <li className="capitalize text-slate-700 text-sm">marketing</li>
          <li className="capitalize text-slate-700 text-sm">analytics</li>
          <li className="capitalize text-slate-700 text-sm">commerce</li>
          <li className="capitalize text-slate-700 text-sm">insights</li>
        </ul>
        <ul className=" flex flex-col gap-3">
          <li className="uppercase text-slate-700 text-sm font-semibold">
            solutions
          </li>
          <li className="capitalize text-slate-700 text-sm">marketing</li>
          <li className="capitalize text-slate-700 text-sm">analytics</li>
          <li className="capitalize text-slate-700 text-sm">commerce</li>
          <li className="capitalize text-slate-700 text-sm">insights</li>
        </ul>
      </div>
    </section>
  );
};
export default Footer;
