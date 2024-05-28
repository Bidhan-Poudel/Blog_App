'use client';
import DashboardNavbar from "@/app/components/navbar/DashboardNavbar";
import UsersTable from "@/app/components/table/usersTable";
import React from "react";
import classes from "../../components/navbar/navbar.module.css";
import { useAuthContext } from "@/app/context/authContext";

const UserList = () => {
    const {isAdmin, isLoggedIn} = useAuthContext();
    if (!isLoggedIn) {
        return <div>Not Logged In</div>;
    }
    if (!isAdmin) {
        return <div>Not Authorized</div>;
    }
  return (
    <div className={classes.wrapper}>
      <DashboardNavbar name="Admin Dashboard" />
      <div className={classes.content}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4" }}>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default UserList;
