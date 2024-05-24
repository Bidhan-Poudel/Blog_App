//modules
import React from "react";
//components

//api
import classes from '../components/navbar/navbar.module.css';
import CardContainer from "../components/Container/CardContainer";
import BlogModal from "../components/modal/createEditModal";
import Navbar from "../components/navbar/navbar";

const Dashboard = async () => {
  return (
    <>
    <div style={{display:"flex"}}>
    <Navbar name="Dashboard"/>
    <div className={classes.content}>
      <div style={{display: "flex", flexDirection:"column",gap: "4"}} >   
        <BlogModal />
        <CardContainer location="Dashboard" />
      </div> 
    </div>
    </div>
    </>
  );
};

export default Dashboard;
