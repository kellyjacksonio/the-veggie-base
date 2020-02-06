import React from "react";
import { Icon, Text, Pane, majorScale } from "evergreen-ui";

function IngredientList({ ingredients }) {
  return (
    <Pane>
      <Text>Ingredients:</Text>
      {ingredients.map(ingredient => {
        return (
          <Pane display="flex">
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
      <Pane marginBottom={majorScale(2)}>
        <Text fontSize={20}>{recipe.name}</Text>
      </Pane>
      {recipe.ingredients.length > 0 && (
        <IngredientList ingredients={recipe.ingredients} />
      )}
    </Pane>
  );
}
