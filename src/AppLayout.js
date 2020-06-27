import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./NavBar";
import { RecipesPage } from "./RecipesPage";

export function AppLayout() {
  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/edit">
            <div>yate</div>
          </Route>
          <Route path="/">
            <RecipesPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
