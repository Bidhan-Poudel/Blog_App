"use client";
import { useAuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./nav.module.css";
import Link from "next/link";

const Navbar = () => {
  const { isLoggedIn, logoutUser } = useAuthContext();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser();
    router.replace("/");
    
    setTimeout(() => {
      window.location.reload();
    },1000);
    // console.log(isLoggedIn);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.brand} >
        <Link href="/" style={{textDecoration:"none", color:"white"}}>Blog App</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <button
              className={styles.button}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>
            <button className={styles.button} onClick={handleLogOut}>
              Log Out
            </button>
          </>
        ) : (
          <button className={styles.button} onClick={handleLogin}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
