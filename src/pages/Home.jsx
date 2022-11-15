const Home = () => {
  return (
    <>
      <section
        style={{ backgroundImage: "url(../img/hero.jpg)" }}
        className=" bg-hero min-h-[65vh] bg-cover  relative "
      >
        <div className="absolute top-[50%] left-2 max-w-xl">
          <span className="bg-orange text-white">Let´s do it</span>

          <h1 className="text-white text-3xl sm:text-4xl md:text-7xl font-bold">
            Start working out today
          </h1>
          <p className="text-grey text-xl sm:text-2xl md:text-3xl font-semibold">
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
