import React, { useState } from "react";
import { Navbar } from "./navbar.component";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/user-slice";

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true, // to send cookie from browser to api
      });
      dispatch(addUser(res.data));
    } catch (e) {
      if (e.status === 401) {
        navigate("/login");
      }
      console.log("Error in login ===> ", e?.message);
    }
  };
  useState(() => fetchUser(), []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
