import React from "react";
import { styled, Container, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Register from "../components/Register";
import Login from "../components/Login";

const Homepage = () => {
//   console.log(styled);
  return (
    <Box>
      <Navbar />
      <Register/>
      <Login/>
    </Box>
  );
};

export default Homepage;
