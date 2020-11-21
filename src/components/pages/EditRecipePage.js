import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Pane, toaster } from "evergreen-ui";
import { RecipeForm } from "components/templates";
import { Text } from "components/materials";
import { AuthContext } from "utils/context";

const QUERY = gql`
  query EditRecipePageQuery($id: String!, $userId: String!) {
    recipe(id: $id, userId: $userId) {
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
    $ingredients: [String]!
    $instructions: [String]!
    $name: String!
    $prepTime: String
    $yields: String
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
  const { userId } = React.useContext(AuthContext);
  const match = useRouteMatch();
  const history = useHistory();
  const { recipeId } = match.params;
  const { data, loading } = useQuery(QUERY, {
    variables: { id: recipeId, userId: userId },
  });
  const [editRecipe] = useMutation(EDIT_MUTATION, {
    onCompleted: () => {
      history.push("/");
      toaster.success("Your recipe has been edited!");
    },
  });

  if (loading) return null;

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
