import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddRecipePage } from "./AddRecipePage";
import { EditRecipePage } from "./EditRecipePage";
import { LoginPage } from "./LoginPage";
import { NavBar } from "./NavBar";
import { RecipePage } from "./RecipePage";
import { RecipesPage } from "./RecipesPage";
import { UserPage } from "./UserPage";

export function AppLayout() {
  // edit recipe page needs to be route protected
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/user/:userId/recipe/:recipeId/edit">
          <EditRecipePage />
        </Route>
        <Route path="/user/:userId/recipe/new">
          <AddRecipePage />
        </Route>
        <Route path="/user/:userId/recipe/:recipeId">
          <RecipePage />
        </Route>
        <Route path="/user/:userId">
          <UserPage />
        </Route>
        <Route path="/">
          <RecipesPage />
        </Route>
      </Switch>
    </Router>
  );
}
