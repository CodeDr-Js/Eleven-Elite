import React from "react";
import "./reward.css";
import Bonus from "../../assets/icons/Captureuu-removebg-preview.png";
import bonus1 from "../../assets/icons/Captureyt-removebg-preview.png";

const Reward = ({bonus, setLoading, loading, success,  setSuccess}) => {
   const handleClose = () => {
    setLoading(false);
    // setSuccess(null)
   }
  return (
    <div className="container1">
       
        <div className="bg-transparent d-flex flex-column align-items-center vh-100 justify-content-center ">
        <i
          id=""
          onClick={handleClose}
          className="fa fa-close fa-fw fa-2x pb-3 opacity-50  bg-transparent"
        ></i>
        <img className="bg-transparent" src={Bonus} alt="reward" />
        <p className="fw-bold text-warning reward-text bg-transparent">
        Congratulations to obtain{" "}
       </p>
        <p className="fw-bold text-warning reward-text-1 bg-transparent">$ {bonus}</p>
        </div>
     
  </div>
    // <div className="bg-transparent d-flex flex-column align-items-center vh-100 justify-content-center opacity-50">
    //   <div className="bg-transparent 2222">
    //     <img className="bg-transparent" src={bonus} alt="reward" />
    //   </div>
    //   <p className="fw-bold reward-text bg-transparent">
    //     Congratulations to obtain{" "}
    //   </p>
    //   <p className="fw-bold reward-text-1 bg-transparent">$3</p>
    // </div>
  );
};

export default Reward;
