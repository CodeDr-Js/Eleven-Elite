import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../APIs/Api";


//const [data, allData, activeToken, activities, user] = useContext(DataContext);

const authentication = (activeToken, navigate) => {
  if (activeToken === "") {
    //console.log("Your token is", activeToken);
    navigate("/login");
  } else {
  }
};


export {authentication}