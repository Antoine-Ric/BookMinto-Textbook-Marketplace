import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useState } from "react";
import "./styles/SearchBar.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";


const App = () => {
  const [results, setResults] = useState([])
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1> Welcome to BookMinto</h1>
        </Container>

        <div className="Search-bar-container">
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
      </main>
      <Footer />
    </>
  );
};

// const App = () => {
//   return <h1>Welcome to BookMinto</h1>;
// };

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Home from "./screens/HomePage"; // Assuming you have a Home component
// import SignIn from "./screens/SignIn";
// import SignUp from "./screens/SignUp";
// import ProductScreen from "./screens/ProductScreen";

// import { useState } from "react";
// import "./styles/SearchBar.css";
// import { SearchBar } from "./components/SearchBar";
// import { SearchResults } from "./components/SearchResults";

// function App() {
//   const [results, setResults] = useState([])
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//                 <div className="Search-bar-container">
//                   <SearchBar setResults={setResults}/>
//                   <SearchResults results={results}/>
//                 </div>
//               <Home />
//             </>
//           }
//         />

//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/productscreen" element={<ProductScreen />} />

//       </Routes>
//     </Router>
//   );
// }

export default App;
