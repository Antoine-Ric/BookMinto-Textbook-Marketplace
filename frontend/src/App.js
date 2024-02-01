import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./screens/HomePage"; // Assuming you have a Home component
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ProductScreen from "./screens/ProductScreen";

import { useState } from "react";
import "./styles/SearchBar.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";

function App() {
  const [results, setResults] = useState([])
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
                <div className="Search-bar-container">
                  <SearchBar setResults={setResults}/>
                  <SearchResults results={results}/>
                </div>
              <Home />
            </>
          }
        />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productscreen" element={<ProductScreen />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;