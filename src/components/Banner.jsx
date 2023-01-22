import banner from "../img/banner.jpg";

const Banner = () => {
  return (
    <section className=" min-h-[30vh] overflow-hidden relative mb-20 rounded-lg ">
      <img
        className=" absolute w-full  h-[100%] object-cover"
        src={banner}
        alt="hombre haciendo curl de biceps con barra"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white ">
        <span className="text-sm  font-semibold mb-2">Join Us Now</span>
        <h3 className="text-2xl md:text-4xl font-bold mb-2">
          Get upto 20% discount
        </h3>
        <p className="text-xs md:text-xl font-semibold">
          In order to help you take this path and start channging your life
        </p>
      </div>
    </section>
  );
};
export default Banner;
