import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default HomePage;
