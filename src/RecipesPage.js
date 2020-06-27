import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { RecipeCard } from "./RecipeCard";
import { RecipeForm } from "./RecipeForm";

const QUERY = gql`
  query RecipesPageQuery {
    recipes {
      id
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

const CREATE_MUTATION = gql`
  mutation CreateRecipe(
    $cookingMethod: [String]
    $description: String!
    $ingredients: [RecipeIngredient]
    $instructions: [String]
    $name: String!
    $prepTime: Int
    $yields: Int
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
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation editRecipe(
    $cookingMethod: [String]
    $description: String!
    $ingredients: [RecipeIngredient]
    $instructions: [String]
    $name: String!
    $prepTime: Int
    $yields: Int
  ) {
    editRecipe(
      cookingMethod: $cookingMethod
      description: $description
      ingredients: $ingredients
      instructions: $instructions
      name: $name
      prepTime: $prepTime
      yields: $yields
    ) {
      id
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export function RecipesPage() {
  const { data, loading } = useQuery(QUERY);
  const [createRecipe] = useMutation(CREATE_MUTATION, {
    refetchQueries: [{ query: QUERY }],
  });
  const [deleteRecipe] = useMutation(DELETE_MUTATION, {
    refetchQueries: [{ query: QUERY }],
  });

  if (loading) return null;

  return (
    <React.Fragment>
      <Pane display="flex" justifyContent="center">
        <RecipeForm onSubmit={createRecipe} />
      </Pane>
      {data.recipes.map((recipe) => (
        <RecipeCard recipe={recipe} deleteRecipe={deleteRecipe} />
      ))}
    </React.Fragment>
  );
}
