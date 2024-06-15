import React, { useEffect, useState } from "react";
import ArrowNav from "../arrowNav/ArrowNav";
import "./index.css";
const TransactionHeader = ({handleSearch, setValue, value, isLoading}) => {
  const [values, setValues] = useState({
    filter_date: getFormattedDate(),
    transaction_type: "withdraw",
  });

  
  // useEffect(()=> {setValue({...values})}, [values])

  // console.log(value);

  function getFormattedDate() {
    // const currentDate = new Date();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the correct month index (January is 0)
    // const day = String(currentDate.getDate()).padStart(2, '0');
    // const year = currentDate.getFullYear();
    // return `${month}/${day}/${year}`;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to get the correct month index (January is 0)
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }


  return (
    <>
      <div>
        <ArrowNav name="Transactions" />
      </div>

      <div className="d-flex justify-content-around  pt-4">
        <input
          type="date"
          className="btn btn-primary text-white rounded-3 p-3 fw-bold opacity-75 border-0 shadow-lg"
          name="filter_date"
          value={values.filter_date}
          onChange={(e) => setValues({ ...values, filter_date: e.target.value })}
        />
        <select
          name="transaction_type"
          onChange={(e) => setValues({ ...values, transaction_type: e.target.value })}
          className="rounded-3 border-0 bg-primary opacity-75 ps-2 pe-1 option-div "
        >
          <option value="withdraw" className="main-color border-0 text-font">
            Withdraw
          </option>
          <option value="deposit" className="main-color text-font">
            Deposit
          </option>
          <option value="balance_charge" className="main-color text-font">
            Bal. Charge
          </option>
        </select>
        {isLoading? (<button className="btn btn-primary opacity-50 disabled text-warning">Loading...</button>) : (<button className="btn btn-primary opacity-75" onClick={() => handleSearch(values)}>Search</button>)}
        
      </div>
    </>
  );
};

export default TransactionHeader;
