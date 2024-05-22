import React from 'react'
import "../color/color.css";
import "./index.css";
import "../fontawesome/css/all.css";
import NoData from '../noData/noData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagaPhon} from '@fortawesome/free-solid-svg-icons';
import magaphone2 from "../../assets/images/megaphone2.png";
import magaphone from "../../assets/images/maga.png";


const NotificationCardnew = ({date, header, body}) => {
    function trimTimestamp(timestamp) {
        const parts = timestamp.split('.'); // Splitting the timestamp string by '.'
        // Taking the part before the dot
        const trimmedTimestamp = parts[0];
        return trimmedTimestamp;
      }
  return (
    <div className='container mb-3'>
        <div className='main-color d-flex rounded-3 p-3'>
            <div className='bg-transparent w-25'>
            <img src={magaphone} alt='magaphone' className='bg-transparent mt-5 pe-3' style={{width:"60px"}} />
           
            {/* <FontAwesomeIcon icon={faMegaphone} /> */}
            </div>
            <div className='bg-transparent'>
                <p className='bg-transparent opacity-50'>{trimTimestamp(date)}</p>
                <h5 className='bg-transparent'> {header}</h5>
                <p className='bg-transparent opacity-75'>
                    {body}</p>
            </div>

          
        </div>
    </div>
  )
}

export default NotificationCardnew