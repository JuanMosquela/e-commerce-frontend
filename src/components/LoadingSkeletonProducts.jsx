const LoadingSkeletonProducts = () => {
  const newArray = [0, 0, 0, 0, 0, 0];

  return (
    <div className="col-span-3 grid grid-cols-3 gap-4">
      {newArray?.map((item) => (
        <div className="animate-pulse flex-1 bg-white">
          <div className="  p-4 h-[320px] mb-4  ">
            <div className="w-full h-[100%] bg-gray"></div>
          </div>
          <div className="flex flex-col space-y-3 px-4 pt-2 pb-8">
            <div className="w-64 bg-gray h-4 rounded-md "></div>
            <div className="w-48 bg-gray h-4 rounded-md "></div>
            <div className="w-24 bg-gray h-4 rounded-md "></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LoadingSkeletonProducts;
