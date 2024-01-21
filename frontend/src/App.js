import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./screens/HomePage"; // Assuming you have a Home component
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        {/* For paths that should have the Navbar, render it within the Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        {/* other paths that should have the Navbar go here */}

        {/* For the sign-in and sign-up paths, render without the Navbar */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;