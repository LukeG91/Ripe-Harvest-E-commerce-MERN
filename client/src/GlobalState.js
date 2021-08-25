/* Importing the libraries, modules and files that I need */
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import GetUsersAPI from "../src/api/GetUsersAPI";

/* Exporting my clobal state variable so that I can use it in my application */
export const GlobalState = createContext();

/* Creating a function that I can use in my application to pass down and use pieces of state */
export const DataProvider = ({ children }) => {
  /* Setting state */
  const [token, setToken] = useState(false);

  /* Making use of the useEffect React hook */
  useEffect(() => {
    /* Checking localStorage to see if the 'firstLogin' key has any value and I am storing the result in a variable */
    const firstLogin = localStorage.getItem("firstLogin");

    /* Using an if statement ti check if the firstLogin variable is true(has a value)  */
    if (firstLogin) {
      /* If the firstLogin does have a value, then a GET request will be made to the API in order to retrieve the refresh_token. */
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        /* Setting state variable (token) to be equal to the accesstoken that is returned from the API */
        setToken(res.data.accesstoken);

        /* Setting the timeout to 10 minutes */
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  /* Creating a variable which is an object that stores state variables that I am going to be using in my application */
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    getUsersApi: GetUsersAPI(),
  };

  /* I am returning the state object so that I can pull in the state vaiables that are needed in the different front-end components. */
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
