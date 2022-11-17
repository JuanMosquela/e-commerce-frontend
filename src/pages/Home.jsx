const Home = () => {
  return (
    <>
      <section className=" bg-hero min-height md:min-h-[80vh]  flex flex-col justify-center   text-center md:text-left  bg-cover  relative ">
        <div className="md:absolute top-[25%] left-[10%] m-w-sm md:max-w-[800px]  ">
          <span className="text-orange-500 text-xl md:text-2xl font-bold">
            Let´s do it
          </span>

          <h1 className="text-white text-5xl md:text-7xl xl:text-8xl font-bold mb-6 py-4 ">
            Start working out today
          </h1>
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold ">
            We have all kinds of higth quality products that will help you reach
            your goals, not only in the gym but in life
          </p>
        </div>
      </section>

      {/* <Services /> */}
      {/* <ProductsList inputValue={inputValue} /> */}
    </>
  );
};
export default Home;
