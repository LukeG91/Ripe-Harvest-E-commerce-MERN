/* Importing the libraries and hooks that I need */
import React, { useState, useEffect } from "react";
import axios from "axios";

function GetUsersAPI() {
  /* Setting state */
  const [users, setUsers] = useState([]);
  const [callback, setCallback] = useState(false);

  /* Using the use useEffect hook to run the code once the component renders */
  useEffect(() => {
    /* Creating a function to retrieve the users that are stored in the database */
    const getUsers = async () => {
      /* Making a GET request to the API  */
      const res = await axios.get("/user/allUsers");
      /* Setting state */
      setUsers(res.data);
    };
    /* Calling the getUsers() function */
    getUsers();
    /* Setting a dependancy */
  }, [callback]);

  /* Returning the state variables that I need so that I can use them within other components in my
     React app. */
  return {
    users: [users, setUsers],
    callback: [callback, setCallback],
  };
}

/* Exporting function so that I can use it where needed in my React App. */
export default GetUsersAPI;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
