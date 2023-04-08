const CheckoutProducts = ({ data }) => {
  return (
    <div className=" relative ">
      <div className="mb-8 w-[400px] border border-slate/40 rounded-md  p-4   flex flex-col justify-between  h-[100%] ">
        <div>
          <h2 className="text-dark text-xl font-bold uppercase mb-3">
            Order Summary
          </h2>
          <div>
            {data?.result?.items.map((product) => (
              <div key={product._id} className="flex gap-4 items-center mb-6  ">
                <figure className=" relative">
                  <img
                    className="w-[160px] object-fit"
                    src={product?.item?.pictureURL[0]}
                    alt={product?.item?.title}
                  />
                </figure>
                <div className="md:p-4 w-full">
                  <h4 className="text-md text-dark font-semibold">
                    {product?.item?.title}
                  </h4>
                  <span>$ {product?.total}</span>
                </div>
                <span className=" bg-orange text-white w-6 h-6 flex items-center justify-center p-2 rounded-full">
                  {product?.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex justify-between  items-center w-full ">
          <p className="text-semibold texzt-dark text-xl">SubTotal:</p>
          <span className="text-2xl font-bold text-dark">
            $ {data?.result?.subTotal}
          </span>
        </div>
      </div>
    </div>
  );
};
export default CheckoutProducts;
