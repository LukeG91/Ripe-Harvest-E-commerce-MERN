/* This file contains all of the page routing for React App */
/* I am importing the libraries and odules that I need as well as the components so that I can create routes for them */
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import ProductDetail from "./productDetail/ProductDetail";
import About from "../../components/about/About";
import Events from "../../components/events/Events";
import Contact from "../../components/contact/Contact";
import Home from "../../components/Home/Home";
import { GlobalState } from "../../GlobalState";
import OrderHistory from "../mainpages/history/OrderHistory";
import OrderDetails from "../mainpages/history/OrderDetails";
import Categories from "./categories/Categories";
import CreateProduct from "./createProducts/CreateProduct";
import Users from "../mainpages/users/Users";

function Pages() {
  /* Setting state and I am pulling in the GlobalState variables so that I can make use of the 'isLogged' and 'isAdmin' state variables */
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    /* Using the Switch hook to hold the different routes for my application */
    <Switch>
      {/* Declaring all of the routes that I am going to need and I am using the state variables that I have declared as
          conditions to perform a certain action where needed. */}
      <Route path="/" exact component={Home} />
      <Route path="/shop" exact component={Products} />
      <Route path="/detail/:id" exact component={ProductDetail} />

      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      />
      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route path="/users" exact component={isAdmin ? Users : NotFound} />
      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      ></Route>
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : NotFound}
      ></Route>
      <Route path="/cart" exact component={Cart} />
      <Route path="/about" exact component={About}></Route>
      <Route path="/events" exact component={Events}></Route>
      <Route path="/contact" exact component={Contact}></Route>

      {/* For any route that is not part of the above. */}
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
