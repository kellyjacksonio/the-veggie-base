import React from "react";
import { useHistory } from "react-router-dom";
import { get } from "lodash";
import { Button, Icon, Pane, majorScale } from "evergreen-ui";
import { Text } from "./Text";

function IngredientList({ ingredients }) {
  return (
    <Pane>
      <Text>Ingredients:</Text>
      {ingredients.map((ingredient) => {
        return (
          <Pane display="flex" alignItems="center">
            <Icon icon="dot" />
            <Text>{`${ingredient}`}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
}

export function RecipeCard({ deleteRecipe, recipe }) {
  const history = useHistory();

  return (
    <Pane border="default" padding={majorScale(4)} margin={majorScale(4)}>
      <Button
        appearance="minimal"
        intent="danger"
        onClick={() => deleteRecipe({ variables: { id: recipe.id } })}
      >
        Delete
      </Button>
      <Button
        appearance="minimal"
        onClick={() => {
          history.push(`/user/123/recipe/${recipe.id}/edit`);
        }}
      >
        Edit
      </Button>
      <Pane marginBottom={majorScale(2)} display="flex" flexDirection="column">
        <Text fontSize={20}>{recipe.name}</Text>
        <Text>{recipe.description}</Text>
        <Text>Cooking method: {recipe.cookingMethod}</Text>
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
