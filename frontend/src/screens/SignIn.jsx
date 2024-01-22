// import navbar from '../components/navbar'

import React from "react";
import "../styles/SignIn.css";

export default function SignIn() {
    return (
      

        <div className="signup-page">
          <div className="signup-images"></div>
          <div className="signup-form-container">
            <div className="signup-form-header">
              <h1>Sign in</h1>
            </div>
            <form className="signup-form">
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      
    );
}