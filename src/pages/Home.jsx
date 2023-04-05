import Services from "../components/Services";
import Categories from "../components/Categories";
import Banner from "../components/Banner";

import React from "react";

import Hero from "../components/Hero";

import Carrusel from "../components/Carrusel";
import Suscribe from "../components/Suscribe";

const Home = () => {
  return (
    <>
      <Hero />

      <main className="md:container">
        <Services />
        <Categories />

        <Carrusel title="Top Rated Products" />

        <Banner />
        <Suscribe />
      </main>
    </>
  );
};
export default Home;
