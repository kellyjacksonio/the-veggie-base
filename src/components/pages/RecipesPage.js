import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RecipeCard } from "components/templates";
import { RECIPES_QUERY } from "helpers/queries";

const DELETE_MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export function RecipesPage() {
  const { data, loading } = useQuery(RECIPES_QUERY);
  const [deleteRecipe] = useMutation(DELETE_MUTATION, {
    refetchQueries: [{ query: RECIPES_QUERY }],
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
