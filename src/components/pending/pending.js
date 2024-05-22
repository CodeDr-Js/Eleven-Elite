import React, { useContext, useEffect, useState } from "react";
import ArrowNav from "../arrowNav/ArrowNav";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DataContext } from "../APIs/Api";
import { API } from "../api-service/api-service";
import Loader from "../loader/loader";



const Pending = () => {
    const navigate = useNavigate();
    const { setActiveToken, pending, setPending } = useContext(DataContext);
    const [token, setToken, removeToken] = useCookies(["auth-token"]);
    const [loadings, setLoadings] = useState(false)
   // console.log(pending);
    
  
  
    useEffect(() => {
      if (!token["auth-token"]) {
        removeToken("auth-token");
        navigate("/login");
        setActiveToken("");
      } else {
        setActiveToken(token["auth-token"]);
      }
    }, []);

    useEffect(() => {
      setLoadings(true);
      if(pending !== null) {
        setLoadings(false)
      }
     }, [pending])
  
    useEffect(() => {
      
      if (pending === null) {
        API.pending(token["auth-token"])
          .then((result) => {
            console.log(result);
            if (result.success) {
           
              setPending(result);
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log(" Invite is found in useContext");

      }
    }, []);
  
    function trimTimestamp(timestamp) {
      const parts = timestamp.split('.'); // Splitting the timestamp string by '.'
      // Taking the part before the dot
      const trimmedTimestamp = parts[0];
      return trimmedTimestamp;
    }
  
  return (
    <div className="mb-5 pb-1">
    <div>
      <ArrowNav name="Pending" />
    </div>
    {loadings?(<Loader/>):""}
    <div className="container">
      <div className="mt-5 pt-2 ms-5 me-5">
        <p className="text-center text-warning">
          Pending friends are your inactive friends, they only turn <span className="text-success fw-bold">active</span> when they start betting on the platform
        </p>
      </div>

      <div className="mt-5">
        <p className="fw-bold ps-3">Inactive Friends</p>
      </div>

      <div className="main-color-5 d-flex justify-content-center text-center friend-div">
        <p className="bg-transparent user pt-3 fw-bold">User</p>
        <p className="bg-transparent amount pt-3 fw-bold">Amount</p>
        <p className="bg-transparent date pt-3 fw-bold">Date</p>
      </div>

      {pending !== null ? (Object.entries(pending.pending_friends).map(([keys,e])=> (
          <div key={keys} className="d-flex justify-content-center text-center main-color-5 opacity-50 level-div">
          <p className="bg-transparent user">{e.fields.downline_username}</p>
          <p className="bg-transparent amount">$0</p>
          <p className="bg-transparent date">{trimTimestamp(e.fields.timestamp)}</p>
        </div>
      ))) :""}

      
    </div>

    
  </div>
 
  );
};

export default Pending;
