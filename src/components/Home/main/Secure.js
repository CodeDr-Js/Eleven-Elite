import React from 'react'

const Secure = ({home, away, league, hflag, aflag, odd, score, time, style, text, FS, onClick, e, s
}) => {
  return (
    <div>
        <div className="container bg-transparent mt-4">
        <p className="ps-3">Secured Bet 👑</p>
        <div className="m-color rounded-4 p-3">
          <div className=" bg-transparent d-flex justify-content-between">
            <div className=" bg-transparent ps-3 d-flex flex-column align-items-center ">
              <div
                className= {`rounded-circle mb-2 ${e}`}  
                style={{ width: "60px", height: "60px" }}
              >
                <img className=" bg-transparent" src={hflag} style={{ width: "60px", height: "60px" }} />
              </div>
              <p className=" bg-transparent"> {home}</p>
            </div>
            <div className=" bg-transparent d-flex flex-column align-items-center mt-1">
              <p className=" bg-transparent opacity">{league}</p>
              <p className={`bg-transparent ${FS}`}> {time}</p>
            </div>
            <div className=" bg-transparent pe-3 d-flex flex-column align-items-center">
              <div
                className={`rounded-circle mb-2 ${s}`}
                style={{ width: "60px", height: "60px" }}
              >
                <img className=" bg-transparent" src={aflag} style={{ width: "60px", height: "60px" }} />
              </div>
              <p className=" bg-transparent"> {away}</p>
            </div>
          </div>

          <div className=" bg-transparent d-flex justify-content-between">
            <div
              className=" white text-dark ps-3 pe-3 fw-bold rounded-3 d-flex flex-column align-items-center line-height"
              style={{ width: "30%", height: "50px" }}
            >
              <p className=" bg-transparent text-dark mt-3">Prediction</p>
              <p className=" bg-transparent text-dark ">{score}</p>
            </div>
            <div
              className="  pink text-dark ps-3 pe-3 fw-bold rounded-3"
              style={{ width: "30%", height: "50px" }}
            >
              <div className="bg-transparent mt-3  d-flex flex-column align-items-center line-height">
                <p className=" bg-transparent ps-2">
                  Profit <span className="text-white bg-transparent">🔥</span>
                </p>
                <p className=" bg-transparent">{odd}%</p>
              </div>
            </div>
            <button
              className={`blue border-0 text-white ps-3 pe-3 fw-bold rounded-3 ${style}`}
              style={{ width: "30%", height: "50px" }} onClick={onClick}
            >
              {text}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Secure