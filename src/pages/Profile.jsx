import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdatePictureMutation,
} from "../redux/api/productsApi";
import notFound from "../img/not-found.jpg";
import FormModal from "../components/FormModal";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const { data: userInfo, error, isError } = useGetUserQuery(user._id);

  const [updatePicture, { data: userPicture, error: pictureError }] =
    useUpdatePictureMutation();

  const onFileChange = (e) => {
    let formData = new FormData();
    formData.append("picture", e.target.files[0]);
    updatePicture({
      id: user._id,
      formData,
    });
  };

  return (
    <section className=" ">
      <div className="md:container min-h-screen  gap-4 bg-white py-10">
        <figure className="relative cursor-pointer  ">
          <img
            className="h-[500px] w-full object-cover"
            src={userInfo?.user?.picture ? userInfo?.user?.picture : notFound}
            alt=""
          />
          <input
            className="absolute top-0 left-0"
            type="file"
            onChange={onFileChange}
          />
        </figure>

        <div className=" flex flex-col justify-between  ">
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
