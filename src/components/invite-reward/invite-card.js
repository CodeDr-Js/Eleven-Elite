import React from 'react'

const InviteCard = ({level, amount, date, status, style}) => {
  return (
    <>
    {status === "success" ? (<div className={`mt-3 light-green-1 d-flex pt-3 ps-4 pe-3 pb-1 rounded-5`}>
        <div className='bg-transparent '>  
            <p className='bg-transparent text-dark fw-bold'>{level}</p>
            <p className='bg-transparent text-dark fw-bold opacity-50'>{date}</p>
           
        </div>

        <div className='bg-transparent text-center ms-auto '>
        <p className='bg-transparent ms text-dark fw-bold'>$ {amount}</p>

            <p className='bg-transparent text-dark fw-bold '>{status}</p>
        </div>
    </div>) : ""}
    
    {status === "running" ? (<div className={`mt-3 light-green-2 d-flex pt-3 ps-4 pe-3 pb-1 rounded-5`}>
        <div className='bg-transparent '>  
            <p className='bg-transparent text-dark fw-bold'>{level}</p>
            <p className='bg-transparent text-dark fw-bold opacity-50'>{date}</p>
           
        </div>

        <div className='bg-transparent text-center ms-auto '>
        <p className='bg-transparent ms text-dark fw-bold'>$ {amount}</p>

            <p className='bg-transparent text-dark fw-bold '>{status}</p>
        </div>
    </div>) : ""}
    
    {status === "pending" ? (<div className={`mt-3 grey d-flex pt-3 ps-4 pe-3 pb-1 rounded-5`}>
        <div className='bg-transparent '>  
            <p className='bg-transparent text-dark fw-bold'>{level}</p>
            <p className='bg-transparent text-dark fw-bold opacity-50'>{date}</p>
           
        </div>

        <div className='bg-transparent text-center ms-auto '>
        <p className='bg-transparent ms text-dark fw-bold'>$ {amount}</p>

            <p className='bg-transparent text-dark fw-bold '>{status}</p>
        </div>
    </div>) : ""}
    
    </>
    
  )
}

export default InviteCard