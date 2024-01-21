import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Define your home route. It might render another component or some home content */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default HomePage;