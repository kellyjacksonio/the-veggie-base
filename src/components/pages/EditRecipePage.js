import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouteMatch } from "react-router-dom";
import { RecipeForm } from "components/templates";

const QUERY = gql`
  query EditRecipePageQuery($id: String!) {
    recipe(id: $id) {
      id
      cookingMethod
      description
      name
      ingredients {
        id
        ingredient
        measurement
        quantity
        order
      }
      instructions
      prepTime
      yields
    }
  }
`;

export function EditRecipePage() {
  const match = useRouteMatch();
  const { recipeId } = match.params;
  const { data, loading } = useQuery(QUERY, { variables: { id: recipeId } });
  // pass in mutation function to recipe form

  if (loading) return "WE ARE LOADING";

  return <RecipeForm recipe={data.recipe} />;
}
