import React, { useEffect, useState } from 'react';
import "./index.css";
import "../color/color.css";
import TransactionHeader from './transactionHeader';
import TransactionCard from './transactionCard';
import MySelect from '../mySelect/MySelect2';
import { API } from '../api-service/api-service';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import NoData from '../noData/noData';
import Footer from '../Home/anti-scores/footer';





const Transaction = () => {
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["auth-token"]);
  const [value, setValue] = useState({
    filter_date: getFormattedDate(),
    transaction_type: "withdraw",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("transaction")
  
 

  useEffect(() => {
    const token1 = token["auth-token"];
    if (!token1) {
      navigate("/login");
    
    } else {
     
    }
  }, []);

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



  const handleSearch = (values) => {
    console.log("The values are", values);
    setIsLoading(true);
    API.transaction(values, token['auth-token'])
    .then((result) => {
      if(result.detail){
        removeToken("auth-token")
        navigate("/login")
        
      } else if(result) {
        setData(result);
        setIsLoading(false)
        
        
      }
      console.log(result);
    })
    .catch(err => console.log("Error", err))
  }

  useEffect(()=> {
    handleSearch(value);
  }, [value])


  console.log(data);
  const transactionCard = data.map(e => {
      // if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // } else if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // } else if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // } else if(e.status === "success") {
      //   return (<><TransactionCard /></>)
      // }
      return (
        <TransactionCard key={e.id}
        id={e.sessionID} type={e.type} amount={e.amount} date={e.timestamp} status={e.status} 
        />
      )
    })
  

  return (
    <>
      {activeButton === "transaction" ? ( <div className='mb-5'>
    <div className='fixed-top container '>
    <TransactionHeader handleSearch={handleSearch} setValue={setValue} isLoading={isLoading}/>
    </div>

    <div className='' style={{marginTop:"160px"}}>
    {data[0] ? transactionCard : (<NoData/>) }

    
    </div>

    {/* <MySelect/> */}
      
    <Footer activeButton={activeButton} setActiveButton={setActiveButton} />
    </div>) : navigate(`/${activeButton}`)}
    </>
   
  )
}

export default Transaction