const RatedSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2 ">
      {Array(4)
        .fill()
        .map((item, index) => (
          <div key={index} className="flex-1 shadow p-2">
            <div className="animation-pulse bg-gray h-[320px] w-full mb-4"></div>
            <div className="flex flex-col gap-2">
              <div className="animation-puise w-64 h-4 bg-gray"></div>
              <div className="animation-puise w-40 h-4 bg-gray"></div>
              <div className="animation-puise w-20 h-4 bg-gray"></div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default RatedSkeleton;
