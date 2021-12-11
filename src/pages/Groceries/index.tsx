import React from "react";

import { Route, Switch } from "react-router-dom";

import Groceries from "./Groceries";
import GroceryList from "./GroceryList";

const GroceriesIndex: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/groceries/:identifier">
        <GroceryList />
      </Route>
      <Route>
        <Groceries />
      </Route>
    </Switch>
  );
};

export default GroceriesIndex;
