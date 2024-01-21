import React from "react";
import "../styles/SignUp.css"; // Make sure to link the CSS file correctly
// import { countries } from "countries-list";

export default function SignUp() {
  return (
    <div className="signup-page">
      <div className="signup-images">
        {/* Here you can add img tags or set background images using CSS */}
      </div>
      <div className="signup-form-container">
        <div className="signup-form-header">
          <h1>Sign up</h1>
          <p>Step 1 of 3</p>
        </div>
        <form className="signup-form">
          <div className="form-group">
            <input
              type="text"
              className="form-field"
              placeholder="First name"
            />
            <input type="text" className="form-field" placeholder="Last name" />
          </div>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <div className="password_requirements">
            <ul>
              <li>Must be at least 8 characters</li>
              <li>Must include a number and special character</li>
            </ul>
          </div>
{/* 
          <select name="country" id="country">
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select> */}


          <button type="submit">Next</button>
        </form>
        <p>
          By clicking Next you agree to our
          <a href="/terms">Terms of Service</a>
          and
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}