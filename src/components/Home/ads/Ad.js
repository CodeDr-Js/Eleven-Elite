import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./index.css";
import flier1 from "../../../assets/images/flier1.jpg";
import flier2 from "../../../assets/images/flier2.jpg";
import flier3 from "../../../assets/images/flier3.jpg";
import flier4 from "../../../assets/images/flier4.jpg";
const Ad = () => {
  return (
    <div className="d-flex justify-content-center ad-main-div">
      <div style={{ display: "block", width: 750, padding: 30 }}>
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block border-none w-100 bg-danger rounded-2"
              style={{ height: "80px" }}
              src={flier1}
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block border-none w-100 bg-success rounded-2"
              style={{ height: "80px" }}
              src={flier2}
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block border-none w-100 bg-warning rounded-2"
              style={{ height: "80px" }}
              src={flier3}
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block border-none w-100 bg-dark rounded-2"
              style={{ height: "80px" }}
              src={flier4}
              alt=""
            />
          </Carousel.Item>
         
        </Carousel>
      </div>
    </div>
  );
};

export default Ad;

//   <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//     <ol className="carousel-indicators">
//       <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//       <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//       <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//     </ol>

//     <div className="carousel-inner">
//       <div className="carousel-item active">
//         <img src="#" className="d-block w-100" alt=""/>
//       </div>
//       <div className="carousel-item">
//         <img src="" className="d-block w-100" alt="..."/>
//       </div>
//       <div className="carousel-item">
//         <img src="" className="d-block w-100" alt=""/>
//       </div>
//     </div>

//     <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//       <span className="sr-only">Previous</span>
//     </a>

//     <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//       <span className="carousel-control-next-icon" aria-hidden="true"></span>
//       <span className="sr-only">Next</span>
//     </a>
// </div>
