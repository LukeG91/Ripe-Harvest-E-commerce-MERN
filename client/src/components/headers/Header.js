/* Importing the libraries, icons and components that I need */
import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/CompanyLogo.png";

function Header() {
  /* Setting state */
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  /* Creating a function that will handle the user logout process */
  const userLogoutProcess = async () => {
    /* Making a GET request to my API */
    await axios.get("/user/logout");
    /* Using the 'firstLogin' key to remove the value from local storage */
    localStorage.removeItem("firstLogin");
    /* Redirecting the user to the home page of the website */
    window.location.href = "/";
  };

  /* Creating a function to return certain header options if the user is logged in as an Admin user  */
  const headerOptionsForAdminUsers = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Products</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>{" "}
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </>
    );
  };

  /* Creating a function that will return header options when a user is logged into the website */
  const headerOptionsForNonAdminUsers = () => {
    return (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
        <li>
          <Link to="/history">Order History</Link>
        </li>
        <li>
          <Link to="/events">Upcoming events</Link>
        </li>
        <li>
          <Link to="/" onClick={userLogoutProcess}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  /* Creating a variable that stores style information */
  const styleInformation = {
    left: menu ? 0 : "-100%",
  };

  /* Creating the structure for the web page */
  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1 className="headerComponentLogo">
          {/* The logo displayed on the top left of the web page will change based on whether the user is an Admin user
              or a normal user */}
          <Link to="/" style={{ color: "#548CA8" }}>
            {isAdmin ? "Admin" : "Ripe Harvest"}
          </Link>
        </h1>
        <div className={isAdmin ? "adminLogoContainer" : "logoContainer"}>
          <img
            src={Logo}
            alt=""
            className={isAdmin ? "adminLogo" : "CompanyLogo"}
          />
        </div>
      </div>
      <ul style={styleInformation}>
        <li>
          <Link to="/shop">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {/* Displaying the headerOptionsForAdminUsers() header options if the user is logged in as an Admin user */}
        {isAdmin && headerOptionsForAdminUsers()}
        {/* If a normal user has logged in then the header options in the headerOptionsForNonAdminUsers() will be returned */}
        {isLogged ? (
          headerOptionsForNonAdminUsers()
        ) : (
          /* If a user is not logged in and is simply browsing the wbsite, then the header options below will be
             displayed */
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/events">Upcoming events</Link>
            </li>
            <li>
              <Link to="/login">Login || Register</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </>
        )}
        {/* The menu below will display when a user browses to th site on a mobile device */}
        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {/* If the user is an Admin user then return and empty string, else return the cart icon and display the
          amount of products in the users cart by using the length property on the cart array */}
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

/* Exporting the component */
export default Header;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
