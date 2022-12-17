import { BsFillCloudPlusFill } from "react-icons/bs";

const FileUpload = ({ handlePicture }) => {
  const handleUpload = (e) => {
    // let formData = new FormData();
    // formData.append("picture", e.target.files[0]);
  };

  return (
    <div className="flex-1 h-[500px] bg-gray border border-dashed border-orange p-4 flex flex-col justify-center items-center  mb-6">
      <div className="relative mb-4 h-[80px] w-[240px]   ">
        <input
          className="relative h-[100%] w-[100%] z-20 opacity-0 cursor-pointer   "
          type="file"
          onChange={handlePicture}
        />
        <button className="flex justify-center items-center gap-4 absolute top-0 left-0 bg-orange w-[100%] h-[100%] rounded-lg shadow-lg  font-bold  text-white">
          <BsFillCloudPlusFill className="text-4xl" />
          Upload a file
        </button>
      </div>
      <p className="text-slate text-md">Support files</p>
      <span className="text-slate text-sm">PDF, JPG, PNG</span>
    </div>
  );
};
export default FileUpload;
