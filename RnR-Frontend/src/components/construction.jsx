import React from 'react';
import "../styles/construction.css";
import { useNavigate } from "react-router-dom";
import ucp from "../assets/uc.png"


export const UnderConstruction = () => {

    const navigate=useNavigate();
    const openlanding = () => {
    navigate("/");
    }

    return (
    <div className="under-construction">
        <img className="ucp" alt="ucp" src={ucp} />
        <button onClick={openlanding} className="backbutton">Back To Landing Page</button>
    </div>
    
    );

};

export default UnderConstruction;
