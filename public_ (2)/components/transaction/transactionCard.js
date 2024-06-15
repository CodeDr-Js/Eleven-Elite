import React from 'react';
import "../color/color.css"
import "./index.css"

const TransactionCard = ({id, type, amount, date, status, statusStyle, statusIcon}) => {
  function formatDateAndTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    
    const date = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    const time = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const newDate = date + " " + time
    return newDate;
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className='container mb-3'>
        <div className='main-color rounded-4 ps-4 pe-4 pt-3 pb-1'>
            <div className='bg-transparent d-flex'>
                <p className='bg-transparent'>{capitalizeFirstLetter(type)}</p>
                <p className='bg-transparent ms-auto fw-bold'>$ {amount}</p>
            </div>
            <div className='bg-transparent text-primary'>{id}</div>
           
            <div className='bg-transparent d-flex'>
            <p className='bg-transparent opacity-50'>{formatDateAndTime(date)}</p>
            {status === "success"? (<p className={`bg-transparent ms-auto text-success fw-bold ${statusStyle}`}>{status}</p>) : " "}
            {status === "declined"? (<p className={`bg-transparent ms-auto text-secondary fw-bold ${statusStyle}`}>{status}</p>) : " "}
            {status === "cancel"? (<p className={`bg-transparent ms-auto text-dark fw-bold ${statusStyle}`}>{status}</p>) : " "}
            {status === "pending"? (<p className={`bg-transparent ms-auto text-warning fw-bold ${statusStyle}`}>{status}</p>) : " "}
            
            
            </div>
        </div>
    </div>
  )
}

export default TransactionCard