import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdatePictureMutation,
} from "../redux/api/productsApi";
import notFound from "../img/not-found.jpg";
import FormModal from "../components/FormModal";
import { TextField } from "@mui/material";
import { BsFillCloudPlusFill } from "react-icons/bs";
import FileUpload from "../components/FileUpload";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const { data: userInfo, error, isError } = useGetUserQuery(user._id);

  console.log(userInfo);

  return (
    <section className=" ">
      <div className="md:container min-h-screen  gap-4 bg-white py-10 flex ">
        {/* <figure className="relative cursor-pointer  ">
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
        </figure> */}

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
        {/* <div className="flex flex-col flex-1 gap-4    ">
          <TextField
            className="w-full"
            id="filled-basic"
            label="Name"
            variant="filled"
            defaultValue={userInfo?.user.name}
          />
          <TextField
            className="w-full"
            id="filled-basic"
            label="Email"
            variant="filled"
            defaultValue={userInfo?.user.email}
          />

          <TextField
            className="w-full"
            id="filled-multiline-static"
            label="Add a description"
            multiline
            rows={6}
            variant="filled"
          />
        </div> */}
      </div>
    </section>
  );
};
export default Profile;
