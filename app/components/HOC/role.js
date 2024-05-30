"use client";

import React from "react";
import { useAuthContext } from "@/app/context/authContext";
import CreateEditModal from "../modal/createEditModal";
import CardContainer from "../Container/cardContainer";
import classes from "../navbar/navbar.module.css";
import DashboardNavbar from "../navbar/dashboardNavbar";
import Link from "next/link";
import { Button } from "@mantine/core";

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
            <Link href={"./blog/add"} style={{color:"white", textDecoration:"none", }}>
          <Button style={{width:"200px", height:"40px", marginTop:"5px", padding:"8px 0"}}>
            Add Blog
          </Button>
          </Link>
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
