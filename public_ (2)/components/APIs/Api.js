// DataContext.js
import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
import {
  retriveData,
  IDBConfig,
  saveStoreObj, // Import the new function
} from "./index_db";
import { useCookies } from "react-cookie";
import { API } from "../api-service/api-service";
import { useNavigate } from "react-router-dom";
import { getRealTimeDate, range } from "../qickfun/qickfun";

// import worker from "../../worker.js";
// import WebWorker from "../../WebWorker";

import Worker from 'web-worker';


let client_timezone,client_date_str,filterIds;


const DataContext = createContext();
const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token,setToken, removeToken] = useCookies(["auth-token"]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [checkData, setCheckData] = useState();
  const [page, setPage] = useState(1);
  const [activities_g, setActivities_g] = useState({});
  const [openBet_g, setOpenBet_g] = useState({});
  const [settled_g, setSettled_g] = useState({});
  const [user_g, setUser_g] = useState({});
  const [activeToken, setActiveToken] = useState("");
  const [result, setResult] = useState({});
  const [notification, setNotification] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [invite , setInvite] = useState(null);
  const [pending, setPending] = useState(null);
  const [loadingNew, setLoadingNew] = useState();
  
  
  const checkToken = () => {
    const token1 = token["auth-token"];
    if (token1 ) {
      //console.log("token", token1);
      setActiveToken(token1)
    } else {
      setActiveToken("");
    }

  }


  useEffect(()=> {
    checkToken();
  }, [])
  
  useEffect(() => {
    dbFetch()
  },[])


  function addHours(date,hours,action = "add") { if (action === 'remove') { date.setHours(date.getHours() - hours); } else { date.setHours(date.getHours() + hours); }; return date; }

  const dbFetch = async (req_next_date=false) => {
     try {
       // Check if data is found in IndexedDB storage

      let client = await getRealTimeDate() ;
      client_timezone=client.timezone
      let currentDateNow = new Date(client.datetime).toISOString().split("T")[0];
      
      if(req_next_date){
        let add_24 =  addHours(new Date(currentDateNow),24);
        currentDateNow=add_24.toISOString().split("T")[0]
      }
      
      // let remove_24 =  addHours(new Date(currentDateNow),24,'remove')
      // console.log({add_24,remove_24})
      // currentDateNow=remove_24.toISOString().split("T")[0]
      // currentDateNow=add_24.toISOString().split("T")[0]

      client_date_str=currentDateNow
      await retriveData(currentDateNow);
      const timeOut = setInterval(() => {if (IDBConfig.working_dir !== null) {clearInterval(timeOut);startWorker();}}, 100);

      const startWorker = ()=>{
        console.log('STARTTIng worker<<MMM')
        
        // const webWorker = new WebWorker(worker);

        const webWorker = new Worker(
          new URL('../../worker.js', import.meta.url),
          { type: 'module' }
        );
        
        // const webWorker =  WebWorker(worker);
        // const webWorker =  new WebWorker(worker);
        // const webWorker = new Worker('worker.js');
        webWorker.postMessage([currentDateNow,client_timezone,client_date_str,IDBConfig]);
      
        webWorker.addEventListener('message', (event) => {
          let webWorkerData = event.data;
          // console.log(({webWorkerData}))
          if(webWorkerData.saveStoreObj){
            console.log('SAVING STORE >><<')
            IDBConfig.working_dir=webWorkerData.saveStoreObj.working_dir
            saveStoreObj(webWorkerData.saveStoreObj.working_dir)
          }
          if(webWorkerData.lastPage) {
            IDBConfig.lastPage=true
            setCheckData(true)
            }

            if (webWorkerData.type=='setData'){
              setData(webWorkerData.data)
            }else{
              try {
                setAllData((prevData) => [...prevData, ...webWorkerData.data])
              } catch (error) {
                console.log(error)
              }
              
            }
        });

      }
       

       
     } catch (error) {console.log({error});}
 };

  
  async function getUserData() {
   
    //console.log("Token sending....", activeToken);
   
    if (activeToken) {
      //console.log("token", activeToken);
      API.retrieveData(activeToken).then((result) => {
        //console.log("Running API retrieve always",result);
        //console.log("Running API retrieve always");
        if(result.success || result.message === "success") {

          setResult(result); 
          setActivities_g(result.activities);
          setUser_g(result.user);
          setSettled_g(result.activities.bet.settled);
          setOpenBet_g(result.activities.bet.openbet);
        } else if(result.detail) {
          //console.log("removing token");
          navigate("/login")
          setActiveToken("");
          removeToken("auth-token");
          //console.log("It has removed the token and the token is :",token["auth-token"]);;

        }
       
      }).catch((err)=> console.log(err))
    } else {
      //console.log("Token not found");
      //removeToken('auth-token');
      setActiveToken("");
      setActivities_g([]);
      setUser_g([]);
    }
  }
  useEffect(() => {
    getUserData();
  }, [activeToken]);

 

  return (
    <DataContext.Provider
      value={{ data, allData, activeToken, activities_g, setActivities_g, user_g, setUser_g, openBet_g, setOpenBet_g, settled_g, setSettled_g, setActiveToken, result, setResult, notification, setNotification, promotion, setPromotion , pending, setPending , invite, setInvite, checkData, setCheckData, loadingNew, setLoadingNew }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider, IDBConfig,saveStoreObj };

