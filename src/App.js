
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import React from "react";
import Navbar from "./components/navbar";

function App() {
    return (
        <div>
            <Navbar />

            <BrowserRouter>
                <Routes>
                    <Route path= "/signin" element={<SignIn />} />
                    <Route path= "/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App