import React from "react";
import { styled, Container, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Register from "../components/Register";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [value , setValue] = useState(1)

  // const [token, setToken] = useState(() => {
  //   const saved = localStorage.getItem("token");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // });
  // useEffect(() => {
  // if(token)
  //   navigate('/dashboard');
  // }, [])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      navigate('/dashboard');
    }
  }, []);
  return (
    <Box>
      <Navbar setValue={setValue} />
      {value === 1 ? <Register/> : <Login/>}
    </Box>
  );
};

export default Homepage;
