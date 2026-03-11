import React from "react";
import "./navbar.css";
import Banner from "./Banner";
import Temples from "./Temples";
import About from "./About";
import Services from "./Services";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home" id="home">
      <div className="content">
        <Banner />
        <Temples />
        <About />
        <Services />
        <Footer />
      </div>
    </div>
  );
};

export default Home;