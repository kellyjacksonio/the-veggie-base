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
import ProtectedRoute from "./ProtectedRoute";

export function AppLayout() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/recipe/new">
          <AddRecipePage />
        </ProtectedRoute>
        <ProtectedRoute path="/recipe/:recipeId/edit">
          <EditRecipePage />
        </ProtectedRoute>
        <Route path="/user/new">
          <AddUserPage />
        </Route>
        <ProtectedRoute path="/user/account">
          <UserPage />
        </ProtectedRoute>
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
