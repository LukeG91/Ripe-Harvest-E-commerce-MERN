/* Importing the libraries and hooks that I need */
import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoriesAPI() {
  /* Setting state */
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  /* Using the use useEffect hook to run the code once the component renders */
  useEffect(() => {
    /* Creating a function to retrieve the categories that are stored in the database */
    const getCategories = async () => {
      /* Making a GET request to the API  */
      const res = await axios.get("/api/category");
      /* Setting state */
      setCategories(res.data);
    };
    /* Calling the getCategories() function */
    getCategories();
    /* Setting a dependancy */
  }, [callback]);

  /* Returning the state variables that I need so that I can use them within other components in my
     React app. */
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

/* Exporting function so that I can use it where needed in my React App. */
export default CategoriesAPI;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
