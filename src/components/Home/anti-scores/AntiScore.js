import React, { useContext, useEffect, useState } from "react";
import NavBar_Anti from "./NavBar-Anti";
import ScoreAnti from "./Score-Anti";
// import Footer from "./footer";
import { DataContext } from "../../APIs/Api";
import { useNavigate } from "react-router-dom";
import Cookies  from "js-cookie";
import "../../largeScreen/large.css";
import Loader from "../../loader/loader";

const AntiScore = () => {
  const navigate = useNavigate();
   const { data, allData, activeToken, activities_g, user } =
     useContext(DataContext);
  const token = Cookies.get("auth-token");
  const [loadings, setLoadings] = useState(false);
  useEffect(() => {
    setLoadings(true);
    if(!Array.isArray(activities_g) ) {
      setLoadings(false)
    }
   }, [activities_g])

  //Checking for token/Activ
  useEffect(() => {
    
    if (!token) {
//      console.log("Your token is", token1);
      navigate("/login");
    } else {
    }
  }, [token]);
   
  return (
    <div>
      {loadings?(<Loader/>):""}
      <NavBar_Anti />
      <ScoreAnti />
    </div>
  );
};

export default AntiScore;
