import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import ProductDetail from "./productDetail/ProductDetail";

function Pages() {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={ProductDetail} />

      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />

      {/* For any route that is not part of the above. */}
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
