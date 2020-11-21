import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { RecipeCard } from "components/templates";
import { RECIPES_QUERY } from "helpers/queries";
import { toaster } from "evergreen-ui";

const DELETE_MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export function RecipesPage() {
  const { data, loading } = useQuery(RECIPES_QUERY);
  const [deleteRecipe, { loading: deleteRecipeLoading }] = useMutation(
    DELETE_MUTATION,
    {
      refetchQueries: [{ query: RECIPES_QUERY }],
      onCompleted: () => toaster.success("Your recipe has been deleted."),
    }
  );

  if (loading) return null;

  return (
    <React.Fragment>
      {data.recipes.map((recipe, index) => (
        <RecipeCard
          recipe={recipe}
          deleteRecipe={deleteRecipe}
          deleteRecipeLoading={deleteRecipeLoading}
          key={index}
        />
      ))}
    </React.Fragment>
  );
}
