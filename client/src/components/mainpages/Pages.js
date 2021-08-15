import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import ProductDetail from "./productDetail/ProductDetail";
import About from "../../components/About";
import Events from "../../components/Events";
import Contact from "../../components/Contact";
import Home from "../../components/Home";
import { GlobalState } from "../../GlobalState";
import OrderHistory from "../mainpages/history/OrderHistory";
import OrderDetails from "../mainpages/history/OrderDetails";
import Categories from "./categories/Categories";
import CreateProduct from "./createProducts/CreateProduct";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
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
