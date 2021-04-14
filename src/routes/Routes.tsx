import React from "react";
import { Route, Switch } from "react-router";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Products from "../pages/Products";
import paths from "./paths";

const Routes = () => {
  return (
    <Switch>
      <Route path={paths.index} component={Products} exact />
      <Route path={paths.product} component={Product} exact />
      <Route path={paths.checkout} component={Checkout} exact />
    </Switch>
  );
};

export default Routes;
