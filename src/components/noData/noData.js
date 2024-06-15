import React from 'react';
import nodata from '../../assets/images/nodata.png';
import nodata1 from '../../assets/images/nodata1.png';
import nodata2 from '../../assets/images/nodata2.png';
import nodata3 from '../../assets/images/nodata3.png';
import nodata4 from '../../assets/images/nodata4.png';
import "./index.css";


const NoData = () => {
  return (
    
    <div className='mh-100 d-flex flex-column align-items-center justify-content-center nodata-div'>
        <img className='opacity-25' src={nodata4} alt='nodataLogo'style={{width:"170px"}}/>
        <p className='fw-bold opacity-50'>No Data</p>
    </div>
  )
}

export default NoData