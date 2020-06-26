import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { get } from "lodash";
import { Button, Icon, Pane, majorScale } from "evergreen-ui";
import { Text } from "./Text";

const MUTATION = gql`
  mutation deleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

function IngredientList({ ingredients }) {
  return (
    <Pane>
      <Text>Ingredients:</Text>
      {ingredients.map((ingredient) => {
        return (
          <Pane display="flex" alignItems="center">
            <Icon icon="dot" />
            <Text>{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.ingredient}`}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
}

export function RecipeCard({ recipe, refetchQuery }) {
  const [deleteRecipe] = useMutation(MUTATION, {
    refetchQueries: [{ query: refetchQuery }],
  });

  return (
    <Pane border="default" padding={majorScale(4)} margin={majorScale(4)}>
      <Button
        appearance="minimal"
        intent="danger"
        onClick={() => deleteRecipe({ variables: { id: recipe.id } })}
      >
        Delete
      </Button>
      <Pane marginBottom={majorScale(2)} display="flex" flexDirection="column">
        <Text fontSize={20}>{recipe.name}</Text>
        <Text>{recipe.description}</Text>
      </Pane>
      {recipe.ingredients.length > 0 && (
        <IngredientList ingredients={recipe.ingredients} />
      )}
      {recipe.instructions && (
        <Pane display="flex" flexDirection="column">
          {get(recipe, "instructions", []).map((instruction, index) => (
            <Text>{`${index + 1}. ${instruction}`}</Text>
          ))}
        </Pane>
      )}
    </Pane>
  );
}
