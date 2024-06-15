// CarouselComponent.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselComponent.css"; // Custom CSS file to override styles
import flier1 from "../../../assets/images/flier1.jpg";
import flier2 from "../../../assets/images/flier2.jpg";
import flier3 from "../../../assets/images/flier3.jpg";
import flier4 from "../../../assets/images/flier4.jpg";

const CarouselComponent = () => {
  const settings = {
    dots: false, // Set to true if you want to keep the dots navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className="container">
        <img
          className="w-100 rounded-3 mt mb-3"
          style={{ height: "80px" }}
          src={flier1}
          alt=""
        />
      </div>
      <div className="container">
        <img
          className="w-100 rounded-3 mt "
          style={{ height: "80px" }}
          src={flier2}
          alt=""
        />
      </div>
      <div className="container">
        <img
          className="w-100 rounded-3 mt"
          style={{ height: "80px" }}
          src={flier3}
          alt=""
        />
      </div>
      <div className="container">
        <img
          className="w-100 rounded-3 mt "
          style={{ height: "80px" }}
          src={flier4}
          alt=""
        />
      </div>

      {/* <div>
        <img
          className="d-block border-none w-100 bg-danger me-4 ms-4 rounded-2  mt-3"
          style={{ height: "70px" }}
          src={flier2}
          alt=""
        />
      </div>
      <div>
        <img
          className="d-block border-none w-100 bg-danger me-4 ms-4 rounded-2  mt-3"
          style={{ height: "70px" }}
          src={flier3}
          alt=""
        />
      </div>
      <div>
        <img
          className="d-block border-none w-100 ms-4 me-4 bg-danger rounded-2  mt-3"
          style={{ height: "70px" }}
          src={flier4}
          alt=""
        />
      </div> */}
    </Slider>
  );
};

export default CarouselComponent;
