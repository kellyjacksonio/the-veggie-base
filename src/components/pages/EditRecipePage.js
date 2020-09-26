import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory, useRouteMatch } from "react-router-dom";
import { RecipeForm } from "components/templates";

const QUERY = gql`
  query EditRecipePageQuery($id: String!) {
    recipe(id: $id) {
      id
      cookingMethod
      description
      name
      ingredients
      instructions
      prepTime
      yields
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation editRecipe(
    $id: String!
    $cookingMethod: [String]
    $description: String!
    $ingredients: [String]
    $instructions: [String]
    $name: String!
    $prepTime: Int
    $yields: Int
  ) {
    editRecipe(
      id: $id
      cookingMethod: $cookingMethod
      description: $description
      ingredients: $ingredients
      instructions: $instructions
      name: $name
      prepTime: $prepTime
      yields: $yields
    ) {
      id
      cookingMethod
      description
      name
      ingredients
      instructions
      prepTime
      yields
    }
  }
`;

export function EditRecipePage() {
  const match = useRouteMatch();
  const history = useHistory();
  const { recipeId } = match.params;
  const { data, loading } = useQuery(QUERY, { variables: { id: recipeId } });
  const [editRecipe] = useMutation(EDIT_MUTATION, {
    onCompleted: () => history.push("/"),
  });

  if (loading) return "WE ARE LOADING";

  return <RecipeForm recipe={data.recipe} onSubmit={editRecipe} />;
}
