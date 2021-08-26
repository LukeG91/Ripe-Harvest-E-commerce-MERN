/* Importing th libraries/modules and components that I need */
import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import backGroundImage from "../cart/images/pexels-karolina-grabowska-5632401.jpg";

function Cart() {
  /* Setting state */
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;

  /* Using the useEffect hook to run the code below once the component mounts and I am using the 'cart' variable
     as a dependancy */
  useEffect(() => {
    /* Creating a function to get the total cost of the products in the users shopping cart */
    const getTotal = () => {
      /* I am using the reduce() method which allows me to pass in the value returned from the previous calculation performed
         of the element that comes before the existing one in the cart array
          */
      const total = cart.reduce((prev, item) => {
        /* Returning the value that I need */
        return prev + item.price * item.quantity;
      }, 0);
      /* Updating state */
      setTotal(total);
    };
    /* calling the getTotal() function */
    getTotal();
    /* Adding the cart variable as a dependancy */
  }, [cart]);

  /* Creating a function to make an API call to update the shopping cart information */
  const addingNewProductToCart = async (cart) => {
    /* Making a PATCH request which is used to provide instructions on the process required in order
       to change/update a specific piece of information */
    await axios.patch(
      "/user/addcart",
      /* Passing in the cart variable that I am going to use to make the update on the API */
      { cart },
      /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
         key */
      {
        headers: { Authorization: token },
      }
    );
  };

  /* Creating a function that will allow a user to increase the quantity of a specific product that is in their cart */
  const increaseProductQuantity = (id) => {
    /* Using a forEach loop on the cart array and I am saying that if the item._id value matches the 'id' value that gets parsed 
       into the function, then the product quantity will be increased by 1 each time the user clicks on the increment button */
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    /* Updating state */
    setCart([...cart]);
    addingNewProductToCart(cart);
  };

  /* Creating a function that will allow a user to decrease the quantity of a specific product that is in their cart */
  const decreaseProductQuantity = (id) => {
    /* Using a forEach loop on the cart array and I am saying that if the item._id value matches the 'id' value that gets parsed 
       into the function, then the product quantity will be decreased by 1 each time the user clicks on the decrement button 
       and if the product quantity is 1 then the user will not be able to decrement the quantity any more, if they don't want the 
       product any longer then they will need to remove it fromt heir shopping cart by clicking on the x in the top right corner
       of the product image */
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    /* Updating state */
    setCart([...cart]);
    addingNewProductToCart(cart);
  };

  /* Creating a function that will be called when a user clicks on the x in the top right corner
     of the product image */
  const deleteProductFromCart = (id) => {
    /* Using popup window that will display a message asking the user if they are
       certain that they want to remove the product from their cart. */
    if (
      window.confirm(
        "Are you sure you want to remove this product from your basket?"
      )
      /* Using a forEach loop to run through the content of the cart array and I am using an if statement to
         check if the item._id matches the id that is psrsed into this function */
    ) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          /* Using the splice() method which allows me to remove elements from the cart array */
          cart.splice(index, 1);
        }
      });
      /* Updating state */
      setCart([...cart]);
      addingNewProductToCart(cart);
    }
  };

  /* Creating a function to process the customer payment */
  const usrPaymentSuccess = async (payment) => {
    /* Deconstructing the object and I am extracting information that I need from 'payment' which is parsed in as
       an argument to this function */
    const { paymentID, address } = payment;

    /* Making a POST request to my API  */
    await axios.post(
      /* Connecting to the relevant route API route   */
      "/api/payment",
      /* Passing in the information that is needed for the API to process the request successfully */
      { cart, paymentID, address },
      /* Passing in the token required for authorization in the headers of the request by using the 'Authorization'
             key */
      {
        headers: { Authorization: token },
      }
    );

    /* Updating state */
    setCart([]);
    addingNewProductToCart([]);

    /* An alert advising the user that they have successfully placed an order */
    alert("You have successfully placed your order.");
  };

  /* Using an if statement to check if there are any items in the cart array and if there aren't, then 
     an appropriate heading will be displayed  */
  if (cart.length === 0)
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <h1
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginBottom: "5px",
          }}
        >
          Add your first product to your shopping cart 😃{" "}
        </h1>
        <img
          src={backGroundImage}
          alt="background-image"
          style={{ objectFit: "cover", width: "100%", height: "92vh" }}
        />
      </div>
      // <h3 style={{ textAlign: "center", fontSize: "3rem" }}>
      //   There are no items in your shopping cart yet
      // </h3>
    );

  /* creating the JSX structure for the CART page */
  /* I am showing the relevant information relating to ach product, the Image, title, price, quantity, 
           description as well as the main information relating to the product(content) */
  return (
    <div>
      {/* Mapping through the cart array and I am displaying each item that the user has added to their cart */}
      {cart.map((product) => (
        /* I am showing the relevant information relating to ach product, the Image, title, price, quantity, 
           description as well as the main information relating to the product(content) */
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>R{product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => decreaseProductQuantity(product._id)}>
                {" "}
                -{" "}
              </button>
              <span>{product.quantity}</span>
              <button onClick={() => increaseProductQuantity(product._id)}>
                {" "}
                +{" "}
              </button>
            </div>

            <div
              className="delete"
              onClick={() => deleteProductFromCart(product._id)}
            >
              X
            </div>
          </div>
        </div>
      ))}

      {/* Creating a container to display the total cost of the users cart and I am bringing in the PaypalButton component */}
      <div className="total">
        <h3>Total: R {total}</h3>
        <PaypalButton total={total} usrPaymentSuccess={usrPaymentSuccess} />
      </div>
    </div>
  );
}

/* Exporting the Cart componenet so that I can use it in my React app */
export default Cart;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
