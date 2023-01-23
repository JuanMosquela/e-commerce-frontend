import Services from "../components/Services";
import Categories from "../components/Categories";
import Banner from "../components/Banner";

import React from "react";

import Hero from "../components/Hero";
import ErrorBoundary from "../utilities/ErrorBoundary";
import Carrusel from "../components/Carrusel";

const Home = () => {
  return (
    <>
      <Hero />

      <main className="md:container">
        <Services />
        <Categories />

        <ErrorBoundary>
          <Carrusel title="Top Rated Products" />
        </ErrorBoundary>

        <Banner />
      </main>
    </>
  );
};
export default Home;
