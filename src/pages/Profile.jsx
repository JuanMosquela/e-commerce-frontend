import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdatePictureMutation,
} from "../redux/api/productsApi";
import notFound from "../img/not-found.jpg";
import FormModal from "../components/FormModal";
import { TextField } from "@mui/material";
import { BsFillCloudPlusFill } from "react-icons/bs";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const { data: userInfo, error, isError } = useGetUserQuery(user._id);

  const [updatePicture, { data: userPicture, error: pictureError }] =
    useUpdatePictureMutation();

  console.log(userPicture);

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
      <div className="md:container min-h-screen  gap-4 bg-white py-10 flex">
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

        <div className=" relative flex-1 h-[500px] bg-gray border border-dashed border-orange flex flex-col justify-center items-center  mb-6">
          <img
            className="w-full h-[100%] object-cover absolute"
            src={userPicture?.model?.picture}
            alt=""
          />
          <div className="relative mb-4 h-[80px] w-[240px]   ">
            <input
              className="relative h-[100%] w-[100%] z-20 opacity-0 cursor-pointer   "
              type="file"
              onChange={onFileChange}
            />
            <button className="flex justify-center items-center gap-4 absolute top-0 left-0 bg-orange w-[100%] h-[100%] rounded-lg shadow-lg  font-bold  text-white">
              <BsFillCloudPlusFill className="text-4xl" />
              Upload a file
            </button>
          </div>
          <p className="text-slate text-md">Support files</p>
          <span className="text-slate text-sm">PDF, JPG, PNG</span>
        </div>

        {/* <div className=" flex flex-col justify-between  ">
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
        </div> */}
        <div className="flex flex-col flex-1 gap-4    ">
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
        </div>
      </div>
    </section>
  );
};
export default Profile;
