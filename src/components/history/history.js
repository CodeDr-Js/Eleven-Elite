import React, { useState, useContext, useEffect } from 'react';
import HistoryHeader from './historyHeader';
import { API } from "../api-service/api-service";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SettledNav from "./settledNav";
import { DataContext } from "../APIs/Api";




const History = () => {
  const navigate = useNavigate();
  const {setActivities_g, activities_g, setActiveToken} = useContext(DataContext)
  const [token, setToken, removeToken] = useCookies(["auth-token"]);
  const [activities, setActivities] = useState({});
  const [settled, setSettled] = useState({});
  const [openBet, setOpenBet] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(activities_g);
  function getUserData() {
    const token1 = token["auth-token"];
    if (token1) {
      console.log("token", token1);
      setActiveToken(token1)
      API.retrieveData(token1)
        .then((result) => {
          console.log(result);
          setLoading(false);
          if (result.success) {
            setActivities(result.activities);
            setActivities_g(result.activities);
            setSettled(result.activities.bet.settled);
            setOpenBet(result.activities.bet.openbet);
            setUser(result.user);
          } else if (!result.success) {
            removeToken("auth-token");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setActiveToken('');
      setActivities([]);
      setUser([]);
      navigate("/login");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  // console.log(activities.wallet.bal_info.bal);

  return (
    <div className='container'>
        <HistoryHeader loading={loading} openBet={openBet} settled={settled} setOpenBet={setOpenBet} setSettled={setSettled} setActivities={setActivities} activities={activities} setActivities_g={setActivities_g}/>  
    </div>
  );
};

export default History