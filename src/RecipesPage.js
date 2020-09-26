import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "evergreen-ui";
import { RecipeCard } from "./RecipeCard";

const QUERY = gql`
  query RecipesPageQuery {
    recipes {
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
    $cookingMethod: [String]
    $description: String!
    $ingredients: [String]
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
  const history = useHistory();
  const { data, loading } = useQuery(QUERY);
  const [deleteRecipe] = useMutation(DELETE_MUTATION, {
    refetchQueries: [{ query: QUERY }],
  });

  if (loading) return null;

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          history.push("/user/123/recipe/new");
        }}
      >
        Add Recipe
      </Button>
      {data.recipes.map((recipe) => (
        <RecipeCard recipe={recipe} deleteRecipe={deleteRecipe} />
      ))}
    </React.Fragment>
  );
}
