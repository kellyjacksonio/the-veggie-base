import React from "react";
import { Icon, Pane, majorScale } from "evergreen-ui";
import { Text } from "./Text";

function IngredientList({ ingredients }) {
  return (
    <Pane>
      <Text>Ingredients:</Text>
      {ingredients.map(ingredient => {
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

export function RecipeCard({ recipe }) {
  console.log("recipe", recipe);
  return (
    <Pane border="default" padding={majorScale(4)} margin={majorScale(4)}>
      <Pane marginBottom={majorScale(2)} display="flex" flexDirection="column">
        <Text fontSize={20}>{recipe.name}</Text>
        <Text>{recipe.description}</Text>
      </Pane>
      {recipe.ingredients.length > 0 && (
        <IngredientList ingredients={recipe.ingredients} />
      )}
    </Pane>
  );
}
