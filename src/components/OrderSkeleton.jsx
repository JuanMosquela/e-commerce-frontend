const OrderSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2 shadow p-2">
      <div className="mb-4">
        <div className="bg-gray h-12 mb-4"></div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="bg-gray h-4 w-[300px]"></div>
          <div className="bg-gray h-4 w-[280px]"></div>
          <div className="bg-gray h-4 w-[280px]"></div>
          <div className="bg-gray h-4 w-[240px]"></div>
        </div>
      </div>
      <div className="bg-gray h-12 mb-4"></div>
      <div className="flex gap-4">
        <div className=" bg-gray w-[220px] h-[260px]"></div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="bg-gray h-4 w-40"></div>
          <div className="bg-gray h-4 w-20"></div>
          <div className="bg-gray h-4 w-20"></div>
        </div>
      </div>
      <div className="bg-gray h-12 mb-4"></div>
      <div className="bg-gray h-4 w-40"></div>
    </div>
  );
};
export default OrderSkeleton;
