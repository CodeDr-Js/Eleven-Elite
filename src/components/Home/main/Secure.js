import React from 'react'

const Secure = ({home, away, league, hflag, aflag, odd, score, time, style, text, FS, onClick, e, s
}) => {
  function getFirstAndSecondWords(input) {
    // Split the input string by spaces
    const words = input.split(' ');

    // Get the first and second words
    const firstWord = words[0] || '';
    const secondWord = words[1] || '';

    // Concatenate the first and second words with a space
    return `${firstWord} ${secondWord}`.trim();
}
  return (
    <div>
        <div className="container bg-transparent mt-4">
        <p className="ps-3">Secured Bet 👑</p>
        <div className="m-color rounded-4 p-3">
          {/* Start 1st */}
          <div className=" bg-transparent d-flex justify-content-between w-100">
            <div className=" bg-transparent  d-flex flex-column align-items-center secureW-1">
              <div
                className= {`rounded-circle mb-2 ${e}`}  
                style={{ width: "50px", height: "50px" }}
              >
                <img className=" bg-transparent rounded-circle" src={hflag} style={{ width: "50px", height: "50px"  }} />
              </div>
              <p className=" bg-transparent secured-font"> {home}</p>
            </div>
            <div className=" bg-transparent d-flex flex-column align-items-center mt-1 secureW-2 ">
              <p className=" bg-transparent opacity text-center">{getFirstAndSecondWords(league)}</p>
              <p style={{"fontFamily": "Orbitron, sans-serif"}} className={`bg-transparent ${FS}`}> {time}</p>
            </div>
            <div className=" bg-transparent  d-flex flex-column align-items-center secureW-1">
              <div
                className={`rounded-circle mb-2 ${s}`}
                style={{ width: "50px", height: "50px" }}
              >
                <img className=" bg-transparent rounded-circle" src={aflag} style={{ width: "50px", height: "50px" }} />
              </div>
              <p className=" bg-transparent secured-font"> {away}</p>
            </div>
          </div>
          {/* Start Here */}
          {/* <div className=" bg-transparent"  style={{"display": "flex", "justify-content": "space-between"}}>
            <div className='row bg-transparent'>
                <div className='bg-transparent'><img className=" bg-transparent" src={hflag} style={{ width: "40px", height: "40px",float:'left' }} /></div>
                <div className='bg-transparent'><p style={{"font-size":"15px"} } className=" bg-transparent"> {home}</p>  </div>
            </div>

            <div style={{"textAlign":"center"} } className=" bg-transparent  align-items-center mt-1 row">
                <p className=" bg-transparent opacity">{league}</p>
                <p style={{"font-family": "Orbitron, sans-serif",'font-size':'12px'}} className={`bg-transparent`}> {time}</p>
              </div>

            <div className='row bg-transparent'>
              <div className='bg-transparent'><img className=" bg-transparent" src={aflag} style={{ width: "40px", height: "40px", float: "right"}} /></div>
              <div className='bg-transparent'><p style={{"textAlign":"right","font-size":"15px"} } className="  bg-transparent"> {away}</p></div>
            </div>
          </div> */}

            {/* End here */}

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
                <div className='d-flex bg-transparent'>

                <p className=" bg-transparent ps-3">
                  Profit 
                  
                </p>
                <p className=" bg-transparent ps-2">🔥</p>
                </div>

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