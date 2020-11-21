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
  UserRecipesPage,
} from "components/pages";
import { NavBar } from "components/templates";

export function AppLayout() {
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
        <Route path="/user/account">
          <UserPage />
        </Route>
        <Route path="/user/:username/recipe/:recipeId/edit">
          <EditRecipePage />
        </Route>
        <Route path="/user/:username/recipe/new">
          <AddRecipePage />
        </Route>
        <Route path="/user/:username/recipes">
          <UserRecipesPage />
        </Route>
        <Route path="/user/:username/recipe/:recipeId">
          <RecipePage />
        </Route>
        <Route path="/">
          <RecipesPage />
        </Route>
      </Switch>
    </Router>
  );
}
