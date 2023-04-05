import { useSelector } from "react-redux";

import notFound from "../img/not-found.jpg";
import FormModal from "../components/FormModal";
import { useGetUserQuery } from "../redux/api/userApi";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  console.log(user._id);

  const { data: userInfo, error, isError } = useGetUserQuery(user._id);

  return (
    <section className=" ">
      <div className="md:container min-h-screen  gap-4 bg-white py-10 flex ">
        <figure className="overflow-hidden flex-1">
          {userInfo?.user.picture ? (
            <img src={userInfo?.user.picture} alt="" className="object-fit " />
          ) : (
            <img src={notFound} alt="" className="object-fit " />
          )}
        </figure>

        <div className=" flex-1 flex-col justify-between  ">
          <div>
            <div>
              <span htmlFor="name" className="text-sm font-thin mb-2">
                Username
              </span>
              <h3 className="text-slate capitalize text-md font-bold mb-2 p-2 border border-slate/50">
                {userInfo?.user.name}
              </h3>
            </div>
            <div>
              <span htmlFor="name" className="text-sm font-thin mb-2">
                Email
              </span>
              <h3 className="text-slate text-md font-bold mb-2 p-2 border border-slate/50">
                {userInfo?.user.email}
              </h3>
            </div>
          </div>
          <FormModal data={userInfo} />
        </div>
      </div>
    </section>
  );
};
export default Profile;
