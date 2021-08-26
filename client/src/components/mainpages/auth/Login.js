/* Importing the libraries and modules that I need */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  /* Setting state */
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  /* Creating a function to handle the input change for the email and password fields */
  const onChangeInput = (e) => {
    /* I am using the name that is assigned to each input and I am using the value that the user enters
       for each specific input as the value for that specifc name which is either 'email' or 'password' */
    const { name, value } = e.target;
    /* Updating state */
    setUser({ ...user, [name]: value });
  };

  /* Creating a function to process the login once the user has entered their login details and clicks the login button */
  const loginSubmit = async (e) => {
    e.preventDefault();
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Making an API call with the information stored in the user variable */
      await axios.post("/user/login", { ...user });
      /* Updating localStorage */
      localStorage.setItem("firstLogin", true);
      /* Redirecting the user to the home page */
      window.location.href = "/";
      /* Catching potential errors and I am returning an alert with the relevant error message. */
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  /* Creating the structure for the Login web page */
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          autoComplete="on"
          placeholder="Enter your password"
          value={user.password}
          onChange={onChangeInput}
        />

        {/* Creating a container that contains the Login and Register buttons, and the display will change
            based on whether the user is trying to login or register on the website */}
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

/* Exporting the Login component so that I can use it in my React app */
export default Login;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
