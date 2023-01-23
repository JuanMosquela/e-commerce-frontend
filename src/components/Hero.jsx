const Hero = () => {
  return (
    <section className="bg-hero min-height md:min-h-[75vh]   flex flex-col justify-center   text-center md:text-left  bg-cover  relative ">
      <div className="md:absolute top-[25%] left-[10%] m-w-sm md:max-w-[700px]  ">
        <span className="text-orange text-sm md:text-xl font-bold">
          Let´s do it
        </span>

        <h1 className="text-white text-5xl md:text-6xl xl:text-7xl font-extrabold font-montserrat mb-4 py-4 ">
          Start{" "}
          <span className="text-orange text-5xl md:text-6xl xl:text-7xl font-bold">
            working
          </span>{" "}
          out right{" "}
          <span className="text-orange text-5xl md:text-6xl xl:text-7xl font-bold">
            now
          </span>
        </h1>
        <p className="text-white text-xl sm:text-lg md:text-xl font-thin font-nunito ">
          We have all kinds of higth quality products that will help you reach
          your goals, not only in the gym but in life
        </p>
      </div>
    </section>
  );
};
export default Hero;
