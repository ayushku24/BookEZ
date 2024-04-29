import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div className="col-md-9 my-auto text-center">
        <h2 style={{ color: "white" ,fontSize:"130px"}}>BookEz</h2>
        <h1 style={{ color: "white" }}>"Book your room"</h1>
        <Link to="/home">
          <button className="btn landingbtn" style={{ color: "black", backgroundColor:'white' }}>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
