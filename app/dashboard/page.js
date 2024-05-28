//modules
import React from "react";
//components

import RoleCheck from "../components/HOC/role";
import Navbar from "../components/navbar/navbar";

const Dashboard = async () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <RoleCheck />
      </div>
    </>
  );
};

export default Dashboard;
