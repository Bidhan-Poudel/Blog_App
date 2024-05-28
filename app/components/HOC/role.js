"use client";

import React from "react";
import { useAuthContext } from "@/app/context/authContext";
import CreateEditModal from "../modal/createEditModal";
import CardContainer from "../Container/CardContainer";
import classes from "../navbar/navbar.module.css";
import DashboardNavbar from "../navbar/DashboardNavbar";

const RoleCheck = () => {
  const { isAdmin, isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <div>Not Logged In</div>;
    }
  const name = isAdmin ? "Admin Dashboard" : "Dashboard";
  return (
    <div className={classes.wrapper}>
      <DashboardNavbar name={name} />
      <div className={classes.content}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4" }}>
          <CreateEditModal />
          {isAdmin ? (
            <CardContainer location="Admin Dashboard" />
          ) : (
            <CardContainer location="Dashboard" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleCheck;
