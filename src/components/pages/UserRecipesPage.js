import React from "react";
import { useRouteMatch } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toaster } from "evergreen-ui";
import { RecipeCard } from "components/templates";
import { RECIPES_QUERY } from "helpers/queries";

const DELETE_MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export function UserRecipesPage() {
  const match = useRouteMatch();
  const { username } = match.params;
  const { data, loading } = useQuery(RECIPES_QUERY, {
    variables: { username },
  });
  const [deleteRecipe, { loading: deleteRecipeLoading }] = useMutation(
    DELETE_MUTATION,
    {
      refetchQueries: [{ query: RECIPES_QUERY, variables: { username } }],
      onCompleted: () => toaster.success("Your recipe has been deleted."),
    }
  );

  if (loading) return null;

  const { recipes } = data;

  return (
    <React.Fragment>
      {recipes.length > 0
        ? recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              deleteRecipe={deleteRecipe}
              deleteRecipeLoading={deleteRecipeLoading}
              key={index}
            />
          ))
        : "This user doesn't exist, or has not created any recipes yet."}
    </React.Fragment>
  );
}
