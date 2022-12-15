import { useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/api/productsApi";
import notFound from "../img/not-found.jpg";
import { AiOutlineEdit } from "react-icons/ai";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const { data, error } = useGetUserQuery(user._id);

  console.log(data, error);

  return (
    <section className=" bg-gray min-h-screen ">
      <div className="md:container grid grid-cols-4 gap-4 bg-white py-10">
        <figure className="col-span-1">
          <img src={user.picture ? user.picture : notFound} alt="" />
        </figure>

        <div className=" flex flex-col justify-between col-span-3 ">
          <div>
            <div>
              <span htmlFor="name" className="text-sm font-thin mb-2">
                Username
              </span>
              <h3 className="text-slate capitalize text-md font-bold mb-2 p-2 border border-slate/50">
                {user.name}
              </h3>
            </div>
            <div>
              <span htmlFor="name" className="text-sm font-thin mb-2">
                Email
              </span>
              <h3 className="text-slate text-md font-bold mb-2 p-2 border border-slate/50">
                {user.email}
              </h3>
            </div>
          </div>

          <button className=" flex w-fit ml-auto text-dark text-end font-semibold  ">
            <AiOutlineEdit className="text-xl" />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};
export default Profile;
