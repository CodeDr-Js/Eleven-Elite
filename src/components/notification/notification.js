import React, { useContext, useEffect, useState } from "react";
import "../color/color.css";
import "./index.css";
import ArrowNav from "../arrowNav/ArrowNav";
import NotificationNav from "./NotificationNav/NotificationNav";
import NotificationCardnew from "./NotificationCard-new";
import Cookies  from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API } from "../api-service/api-service";
import { DataContext } from "../APIs/Api";
import NoData from "../noData/noData";
import Spinner from "../spinner/Spinner";
import Loader from "../loader/loader";


const Notification = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("new");
  const { setActiveToken, notification, setNotification } =
    useContext(DataContext);
  const token = Cookies.get("auth-token");
  const [loadings, setLoadings] = useState(false)
//  console.log(notification);
  useEffect(() => {
    if (!token) {
      Cookies.remove("auth-token");
      navigate("/login");
      setActiveToken("");
    } else {
      setActiveToken(token);
    }
  }, [token]);

  useEffect(() => {
    setLoadings(true);
    if(notification !== null) {
      setLoadings(false)
    }
   }, [notification])

  useEffect(() => {
 
    if (notification === null) {
      API.notification(token)
        .then((result) => {
        //  console.log(result);
          if (result.success) {
           
            setNotification(result.activities.notification);
          }
        })
        .catch((err) => console.log(err));
    } else {
    //  console.log("Notification is found in useContext");
    }
  }, []);

  // useEffect(() => {
  //   API.notification(token["auth-token"])
  //   .then((result) => {
  //     console.log(result);
  //     if(result.success) {
  //       setNotification(result.activities.notification)
  //     }
  //   })
  //   .catch((err) => console.log(err))
  // }, [])

  // const seen = notification !== null ?  Object.entries(notification.seen).map(([key, value]) => {
  //   console.log("Key is :", key, value);
  // }) :""
  const seen = () =>
    notification.seen.map((item) => {
      return Object.entries(item).map(([key, value]) => {
      //  console.log("keys is:.. ", key, value);
        return (
          <>
            <NotificationCardnew
              date={key}
              header={value.header}
              body={value.message}
            />
          </>
        );
      });
    });
  const unseen = () =>
    notification.unseen.map((item) => {
      return Object.entries(item).map(([key, value]) => {
       // console.log("keys is:.. ", key, value);
        return (
          <>
            <NotificationCardnew
              date={key}
              header={value.header}
              body={value.message}
            />
          </>
        );
      });
    });

  return (
    <div>
      <div className="fixed-top">

      <ArrowNav name="Notice" />

      {loadings? (<Loader/>) :""}

      <div className="container">
        <NotificationNav
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </div>
      </div>

      <div className="notice-div">
         
      {/* {!notification === null ? notification.unseen :""} */}
      {notification === null ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          {activeButton === "new" ? (
            notification !== null ? (
              notification.unseen[0] ? (
                unseen()
              ) : (
                <NoData />
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {activeButton === "read" ? (
            notification !== null ? (
              notification.seen[0] ? (
                seen()
              ) : (
                <NoData />
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      )}

      {/* // <div className='history-card-main-div'>
      //   {activeButton === "unsettled" ? <HistoryCard loading={loading} openBet={openBet} setOpenBet={setOpenBet} setSettled={setSettled} setActivities={setActivities} activities={activities} setActivities_g={setActivities_g}/>  : ""}
      //   {activeButton === "settled" ? <HistoryCardSettled loading={loading} settled={settled} activities={activities} setActivities_g={setActivities_g}/> : ""}
      // </div> */}
      </div>
    </div>
  );
};

export default Notification;
