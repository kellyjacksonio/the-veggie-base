import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AddRecipePage,
  AddUserPage,
  EditRecipePage,
  LoginPage,
  RecipePage,
  RecipesPage,
  UserPage,
} from "components/pages";
import { NavBar } from "components/templates";

export function AppLayout() {
  // edit recipe page needs to be route protected
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/user/new">
          <AddUserPage />
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
