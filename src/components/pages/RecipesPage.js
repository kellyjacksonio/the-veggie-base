import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RecipeCard } from "components/templates";

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

const DELETE_MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export function RecipesPage() {
  const { data, loading } = useQuery(QUERY);
  const [deleteRecipe] = useMutation(DELETE_MUTATION, {
    refetchQueries: [{ query: QUERY }],
  });

  if (loading) return null;

  return (
    <React.Fragment>
      {data.recipes.map((recipe) => (
        <RecipeCard recipe={recipe} deleteRecipe={deleteRecipe} />
      ))}
    </React.Fragment>
  );
}
