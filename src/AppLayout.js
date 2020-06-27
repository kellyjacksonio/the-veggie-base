import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EditRecipePage } from "./EditRecipePage";
import { NavBar } from "./NavBar";
import { RecipePage } from "./RecipePage";
import { RecipesPage } from "./RecipesPage";
import { UserPage } from "./UserPage";

export function AppLayout() {
  // edit recipe page needs to be route protected
  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/user/:user_id/recipe/:recipe_id/edit">
            <EditRecipePage />
          </Route>
          <Route path="/user/:user_id/recipe/:recipe_id">
            <RecipePage />
          </Route>
          <Route path="/user/:user_id">
            <UserPage />
          </Route>
          <Route path="/">
            <RecipesPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
