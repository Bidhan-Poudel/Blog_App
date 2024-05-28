"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ROLES } from "../constants/role";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const admin = {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: ROLES.ADMIN,
  };

  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    role: ROLES.USER,
  });

  const [users, setUsers] = useState([admin]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    try {
      const usersList = window.localStorage.getItem("users");
      const userString = window.localStorage.getItem("currentUser");

      if (usersList) {
        const userArray = JSON.parse(usersList);
        setUsers(userArray);
      }

      if (userString) {
        const userObject = JSON.parse(userString);
        setUser(userObject);
        setIsLoggedIn(true);
      }
      if (!userString) {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginUser = ({ email, password }) => {
    const user = users.find(
      (usr) => usr.email === email && usr.password === password
    );

    if (!user) {
      return {
        error: "Invalid email or password",
        success: false,
      };
    }

    try {
      window.localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
      return {
        success: true,
      };
    } catch (e) {
      return {
        error: e?.response?.data?.message ?? "Something went wrong",
        success: false,
      };
    }
  };

  const registerUser = ({ email, password, name }) => {
    if (users.some((usr) => usr.email === email)) {
      return {
        error: "User already exists",
        success: false,
      };
    }

    const role = ROLES.USER;

    const newUser = {
      id: users.length === 0 ? users.length + 2 : users.length + 1,
      email,
      password,
      name,
      role,
    };
    const updatedUserArray = [...users, newUser];

    try {
      window.localStorage.setItem("users", JSON.stringify(updatedUserArray));
      setUsers(updatedUserArray);
      return {
        success: true,
      };
    } catch (e) {
      return {
        error: e?.response?.data?.message ?? "Something went wrong",
        success: false,
      };
    }
  };

  const onLogOut = () => {
    window.localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser({
      email: "",
      name: "",
      password: "",
      role: ROLES.USER,
    })
  };

  const isAdmin = user.role === ROLES.ADMIN;

  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        isLoggedIn,
        registerUser,
        loginUser,
        isAdmin,
        onLogOut,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};