import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "evergreen-ui";
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
