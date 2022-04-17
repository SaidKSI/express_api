import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Menu() {

  let navigate=useNavigate()
  return (
    <div className=" flex  justify-between ">
      <div><a href="/">Logo</a></div>
      <div className="flex  gap-12">
        <Link to={"/"}>
          <a style={{ color: "blue" }}>Home</a>
        </Link>
        <Link to={"/patients"}>
          <a style={{ color: "blue" }}>Patients</a>
        </Link>
        <Link to={"/login"}>
          <a style={{ color: "blue" }}>Login</a>
        </Link>
        <div className="cursor-pointer " onClick={()=>{
          localStorage.removeItem("user_token")
          navigate("/login")
        }}>
        Logout
        </div>
      </div>
    
    </div>
  );
}
