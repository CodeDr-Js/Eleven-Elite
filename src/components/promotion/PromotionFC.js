import React from "react";

const PromotionFC = ({promotion, activeButton}) => {
  console.log(promotion,activeButton);
  const splitData = (date) => {
    const splitDate = date.split(".")[0];
    return splitDate;

  }
  return (
    <div>
      <p className="ps-3 fw-bold ">Friends</p>
      {activeButton === "level-1" ? ( <div className="main-color d-flex justify-content-center text-center friend-div">
        <p className="bg-transparent user pt-3 fw-bold">User</p>
        <p className="bg-transparent amount pt-3 fw-bold">Amount</p>
        <p className="bg-transparent date pt-3 fw-bold">Date</p>
      </div>) : ""}

      {activeButton === "level-2" ? ( <div className="main-color-1 d-flex justify-content-center text-center friend-div">
        <p className="bg-transparent user pt-3 fw-bold">User</p>
        <p className="bg-transparent amount pt-3 fw-bold">Amount</p>
        <p className="bg-transparent date pt-3 fw-bold">Date</p>
      </div>) : ""}
      {activeButton === "level-3" ? ( <div className="main-color-2 d-flex justify-content-center text-center friend-div">
        <p className="bg-transparent user pt-3 fw-bold">User</p>
        <p className="bg-transparent amount pt-3 fw-bold">Amount</p>
        <p className="bg-transparent date pt-3 fw-bold">Date</p>
      </div>) : ""}
      
  
      
          {activeButton === "level-1"? (promotion ? (promotion.a_level1[0] ? (Object.entries(promotion.a_level1).map(([k,e]) => (
            <div key={k} className="d-flex justify-content-center text-center main-color opacity-50 level-div">
            <p className="bg-transparent user">{e.fields.transactionID}</p>
            <p className="bg-transparent amount">$ {e.fields.amount}</p>
            <p className="bg-transparent date">{splitData(e.fields.timestamp) }</p>
          </div>

          ))) : "") : "") : ""}
          {activeButton === "level-2"? (promotion ? (promotion.a_level2[0] ? (Object.entries(promotion.a_level2).map(([k,e]) => (
            <div key={k} className="d-flex justify-content-center text-center main-color-1 opacity-50">
            <p className="bg-transparent user">{e.fields.transactionID}</p>
            <p className="bg-transparent amount">$ {e.fields.amount}</p>
            <p className="bg-transparent date">{splitData(e.fields.timestamp) }</p>
          </div>

          ))) : "") : "") : ""}
          {activeButton === "level-3"? (promotion ? (promotion.a_level3[0] ? (Object.entries(promotion.a_level3).map(([k,e]) => (
            <div key={k} className="d-flex justify-content-center text-center main-color-2 opacity-50">
            <p className="bg-transparent user">{e.fields.transactionID}</p>
            <p className="bg-transparent amount">$ {e.fields.amount}</p>
            <p className="bg-transparent date">{splitData(e.fields.timestamp) }</p>
          </div>

          ))) : "") : "") : ""}
    </div>
  );
};

export default PromotionFC;
