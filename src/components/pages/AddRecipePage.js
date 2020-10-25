import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { RecipeForm } from "components/templates";
import { RECIPES_QUERY } from "helpers/queries";

const CREATE_MUTATION = gql`
  mutation CreateRecipe(
    $cookingMethod: [String]
    $description: String!
    $ingredients: [String]!
    $instructions: [String]!
    $name: String!
    $prepTime: String
    $yields: String
  ) {
    createRecipe(
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

export function AddRecipePage() {
  const history = useHistory();
  const [createRecipe] = useMutation(CREATE_MUTATION, {
    onCompleted: () => history.push("/"),
    refetchQueries: [{ query: RECIPES_QUERY }],
  });

  return (
    <Pane display="flex" justifyContent="center">
      <RecipeForm onSubmit={createRecipe} />
    </Pane>
  );
}
