import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

import CardProduct from "./CardProduct";

const Carrusel = ({ title, data }) => {
  console.log(data);
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className=" md:container mb-10">
      <h2 className="text-slate text-2xl font-semibold mb-">{title}</h2>

      <Slider {...settings}>
        {data?.results.map((product, index) => (
          <div key={product._id} className="md:max-w-[280px] lg:max-w-[320px]">
            <Link to={`products/${product._id}`}>
              <CardProduct product={product} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Carrusel;
