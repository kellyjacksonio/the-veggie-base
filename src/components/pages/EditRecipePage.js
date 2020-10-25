import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Pane } from "evergreen-ui";
import { RecipeForm } from "components/templates";
import { Text } from "components/materials";

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

function NoRecipeFound({ history }) {
  return (
    <React.Fragment>
      <Text>No recipe found</Text>
      <Button onClick={() => history.goBack()}>Go back</Button>
    </React.Fragment>
  );
}

export function EditRecipePage() {
  const match = useRouteMatch();
  const history = useHistory();
  const { recipeId } = match.params;
  const { data, loading } = useQuery(QUERY, { variables: { id: recipeId } });
  const [editRecipe] = useMutation(EDIT_MUTATION, {
    onCompleted: () => history.push("/"),
  });

  if (loading) return "WE ARE LOADING";

  return (
    <Pane display="flex" justifyContent="center">
      {data ? (
        <RecipeForm recipe={data.recipe} onSubmit={editRecipe} />
      ) : (
        <NoRecipeFound history={history} />
      )}
    </Pane>
  );
}
