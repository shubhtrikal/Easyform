import React from "react";
import { styled, Container, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Register from "../components/Register";

const Homepage = () => {
//   console.log(styled);
  return (
    <Box>
      <Navbar />
      <Register/>
    </Box>
  );
};

export default Homepage;
