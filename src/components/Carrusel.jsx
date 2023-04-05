import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CardProduct from "./CardProduct";

import RatedSkeleton from "./RatedSkeleton";
import { useFetchTopRatedProductsQuery } from "../redux/api/productApi";

const Carrusel = ({ title }) => {
  const { data, error, isLoading } = useFetchTopRatedProductsQuery();

  console.log(data, error);

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
    <div className="  mb-10 min-h-[55vh]  ">
      <h2 className="text-dark text-xl font-bold font-montserrat mb-4 uppercase">
        {title}
      </h2>

      {isLoading ? (
        <RatedSkeleton />
      ) : (
        <Slider {...settings}>
          {data?.results?.map((product) => (
            <div key={product._id} className="">
              <Link to={`products/${product._id}`}>
                <CardProduct product={product} />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
export default Carrusel;
