import { right } from '@popperjs/core'
import React from 'react'
import '../../font.css'

const Secure = ({home, away, league, hflag, aflag, odd, score, time, style, text, FS, onClick, e, s
}) => {
  return (
    <div>
        <div className="container bg-transparent mt-4">
        <p className="ps-3">Secured Bet 👑</p>
        
        <div className="m-color rounded-4 p-3">
          

          <div className=" bg-transparent"  style={{"display": "flex", "justify-content": "space-between"}}>
            <div className='row bg-transparent'>
                <div className='bg-transparent'><img className=" bg-transparent" src={hflag} style={{ width: "40px", height: "40px",float:'left' }} /></div>
                <div className='bg-transparent'><p style={{"font-size":"15px"} } className=" bg-transparent"> {home}</p>  </div>
            </div>

            <div style={{"textAlign":"center"} } className=" bg-transparent  align-items-center mt-1 row">
                <p className=" bg-transparent opacity">{league}</p>
                <p style={{"font-family": "Orbitron, sans-serif",'font-size':'12px'}} className={`bg-transparent`}> {time}</p>
              </div>

            <div className='row bg-transparent'>
              <div className='bg-transparent'><img className=" bg-transparent" src={aflag} style={{ width: "40px", height: "40px", float:right}} /></div>
              <div className='bg-transparent'><p style={{"textAlign":"right","font-size":"15px"} } className="  bg-transparent"> {away}</p></div>
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