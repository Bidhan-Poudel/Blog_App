"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ROLES } from "../constants/role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, login, register } from "../api/users";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  

  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const admin = {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: ROLES.ADMIN,
  };

  const { data: users = [admin] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      window.localStorage.setItem("currentUser", JSON.stringify(data));
      setError(null);
      console.log(`Logged in by ${data.email}`);
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const registerUser = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setError(null);
      console.log("Registered successfully");
    },
    onError: (e) => {
      setError(e.message);
    },
  });
  
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      const userString = window.localStorage.getItem("currentUser");
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    },
  });
  
  const logoutUser = () => {
    window.localStorage.removeItem("currentUser");
    queryClient.removeQueries({ queryKey: ["currentUser"] });
  };


  const isAdmin = currentUser?.role === ROLES.ADMIN;
  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        users,
        loginUser,
        registerUser,
        currentUser,
        isLoggedIn,
        isAdmin,
        logoutUser,
        admin,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
