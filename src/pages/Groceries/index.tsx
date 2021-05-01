import React from "react";
import Groceries from "./Groceries";
import GroceryList from "./GroceryList";
import { Switch, Route } from "react-router-dom";

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
