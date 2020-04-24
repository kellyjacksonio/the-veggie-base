import React from "react";
import { NavBar } from "./NavBar";
import { RecipesPage } from "./RecipesPage";

export function AppLayout() {
  return (
    <React.Fragment>
      <NavBar />
      <RecipesPage />
    </React.Fragment>
  );
}
