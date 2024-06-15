import React, { useContext, useEffect, useState } from "react";
import NavBar from "./nav-bar/NavBar";
import Ad from "./ads/Ad";
import Main from "./main/Main";
import Sport from "./sport/Sport";
import Footer from "./anti-scores/footer";
import ScoreAnti from "./anti-scores/scores";
import CarouselComponent from "./ads/ad-text";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../APIs/Api";
//import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import "../largeScreen/large.css";
import Loader from "../loader/loader";
import Reward from "../reward/reward";
import { API } from "../api-service/api-service";
import SecureCard from "./main/secureCard";
import NoData from "../noData/noData";
import nodata4 from '../../assets/images/nodata4.png';








const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, allData, activeToken, setActiveToken, activities, activities_g, user, result, getUserData, hasRunRetrieve, setHasRunRetrieve, user_g  } =
    useContext(DataContext);
    //console.log(activities_g);
  //const [token] = useCookies(["auth-token"]);
  const [loadings, setLoadings] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeButton, setActiveButton] = useState("")
  
 // console.log("Token:",activeToken);
  //Checking for token/Activ
  const token1 = Cookies.get("auth-token");

  useEffect(() => {
    if (token1) {
      //console.log("Your token is", token1);
      setActiveToken(token1)
    } else {
      navigate("/login");
    }
  }, [token1]);
  
  useEffect(()=> {
    if(!hasRunRetrieve){
      getUserData()
    }
  }, [])

  useEffect(() => {
    if(result) {
      //console.log("bonus", result.bonus);
      if(result.bonus !== undefined && Object.keys(result.bonus).includes("amount")){
       // console.log("loading bonus...");
        setLoading(true)
        API.removeBonus(token1)
        .then((result) => {
         // console.log(result);
        })
        .catch((err) => console.log(err))
      }
    }
  },[result])

  // setTimeout(() => {
  //   if(loading){
  //     setLoading(false);
  //   }
  // }, 10000);

  useEffect(()=> {setLoadings(true) 
    if(!Array.isArray(activities_g)){
    setLoadings(false)
  }},[activities_g])


  return (
    <>
    {activeButton === "" ? (<div className="main1">
      {loading? (<Reward setLoading={setLoading} bonus={result.bonus? result.bonus.amount : ""  }/>):""}
      {loadings?(<Loader/>):""}
      <NavBar />
      {/* <Ad /> */}
      <CarouselComponent />
   
      <h2 className="company-name ps-3 ">Hi {user_g.username} 👨‍💼</h2>
      <Main />
      <SecureCard/>
      {/* <Sport /> */}
      <div>
        <p className="p-3">Site Activities <span><img style={{"width":"20px"}} src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"/></span></p>
        <div className="nodata">
        <div className=' d-flex flex-column align-items-center justify-content-center '>
        <img className='opacity-25' src={nodata4} alt='nodataLogo'style={{width:"170px"}}/>
        <p className='fw-bold opacity-50'>No Data</p>
    </div>
        </div>
      </div>
      {/* <ScoreAnti /> */}
      <Footer activeButton={activeButton} setActiveButton={setActiveButton} />
    </div>
) : navigate(`/${activeButton}`)}
    
    </>
  );
};

export default Index;
