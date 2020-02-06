import React from "react";
import { NavBar } from "./NavBar";
import { RecipesPage } from "./RecipesPage";

export function AppLayout() {
  return (
    <>
      <NavBar />
      <RecipesPage />
    </>
  );
}
