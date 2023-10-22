import React from "react";
import "../styles/Search_Driver.css";
import Header2 from "./header2";

import {useNavigate} from "react-router-dom";

export const SearchDriver = () => {
  
  const navigate=useNavigate();
  const openbook=()=>{
    navigate("/construction");
  }
  const openchat=()=> {
    navigate("/construction");
  }


  return (
    <div className="search_driver">
     
    <Header2/>

    <div className="available_passenger">Available Rides!</div>

    <div className="search-frame1">
    </div>
    <div className="frame-book" onClick={openbook} >
        <div className="text-wrapper-book">Book</div>
    </div>
    <div className="frame-chat" onClick={openchat} >
        <div className="text-wrapper-chat">Chat</div>
    </div>
    

    </div>
  );
};

export default SearchDriver;
