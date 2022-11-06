import { Button } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
// import ProductsList from "../components/ProductsList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span>Let´s do it</span>

          <h1>Start working out today</h1>
          <p>
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
