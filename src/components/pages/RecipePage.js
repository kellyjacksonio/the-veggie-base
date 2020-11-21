import React from "react";
import { useRouteMatch } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { RecipeCard } from "components/templates";
import { RECIPE_QUERY } from "helpers/queries";
import { Pane, toaster } from "evergreen-ui";

const DELETE_MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export function RecipePage() {
  const match = useRouteMatch();
  const { recipeId } = match.params;
  const { data, loading } = useQuery(RECIPE_QUERY, { variables: { recipeId } });
  const [deleteRecipe, { loading: deleteRecipeLoading }] = useMutation(
    DELETE_MUTATION,
    {
      refetchQueries: [{ query: RECIPE_QUERY }],
      onCompleted: () => toaster.success("Your recipe has been deleted."),
    }
  );

  if (loading) return null;

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <RecipeCard
          recipe={data.recipe}
          deleteRecipe={deleteRecipe}
          deleteRecipeLoading={deleteRecipeLoading}
        />
      </Pane>
    </Pane>
  );
}
