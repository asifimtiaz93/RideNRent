import React from "react";
import "../styles/Search_Passenger.css";
import Header2 from "./header2";

import {useNavigate} from "react-router-dom";

export const SearchPassenger = () => {
  
  const navigate=useNavigate();
  const openbook=()=>{
    navigate("/construction");
  }
  const openchat=()=> {
    navigate("/construction");
  }

  return (
    <div className="search_passenger">
     
    <Header2/>

    <div className="available_driver">Available Rides!</div>

    <div className="search-frame2">
    </div>
    <div className="frame-book1" onClick={openbook} >
        <div className="text-wrapper-book1">Book</div>
    </div>
    <div className="frame-chat1" onClick={openchat} >
        <div className="text-wrapper-chat1">Chat</div>
    </div>
    

    </div>
  );
};

export default SearchPassenger;
