/* Importing the libraries and hooks that I need */
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  /* Setting state */
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  /* Using the use useEffect hook to run the code once the component renders */
  useEffect(() => {
    /* Using an if statement to check if there is a token present and if there is then an API call will be made */
    if (token) {
      const getUser = async () => {
        /* Using a try catch block to try code and to catch errors if there are any. */
        try {
          /* Making a GET request to the API and I am storing the result in a variable */
          const res = await axios.get("/user/infor", {
            /* Passing in the Authorization token in the headers as this is a protected route */
            headers: { Authorization: token },
          });
          /* Updating state */
          setIsLogged(true);
          /* If the users role property is set to 1 then they are an admin and update the relevant state variable
             else set the relevant state variable to false */
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          /* Updating state */
          setCart(res.data.cart);
          /* Catching potential errors and I am returning an alert with the relevant error message. */
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      /* Calling the getUser() function  */
      getUser();
    }
    /* Setting the 'token' as a dependancy */
  }, [token]);

  /* Creating a function to add items to a users cart which can only be done when a user has logged in */
  const addCart = async (product) => {
    if (!isLogged)
      return alert("Please login before trying to purchase products.");

    /* Using the every() method which will return true if every element within the cart array
       passes the condition/test set in the function that is parsed into the every() method */
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    /* Using an if statement to clarify if the check variable is true and if it is I am updating state
       and making an API call */
    if (check) {
      /* updating state */
      setCart([...cart, { ...product, quantity: 1 }]);

      /* Making a PATH request which allows me to be able to pass in infomration to modify data, which in this
         case is the cart data */
      await axios.patch(
        /* Querying the relevant API route */
        "/user/addcart",
        /* Passing in the information needed to make the request */
        { cart: [...cart, { ...product, quantity: 1 }] },
        /* Passing in the Authorization token in the headers as this is a protected route */
        {
          headers: { Authorization: token },
        }
      );
      /* If the 'check' variable is not true, then a message advising the user that the product has already been 
         added to their cart will be shown */
    } else {
      alert("This product has already been added to your cart.");
    }
  };

  /* Returning the state variables and function that I need so that I can use them within other components in my
     React app. */
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
  };
}

/* Exporting function so that I can use it where needed in my React App. */
export default UserAPI;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
