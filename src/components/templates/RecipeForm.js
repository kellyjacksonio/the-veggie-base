import React from "react";
import { Button, IconButton, Pane, majorScale } from "evergreen-ui";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { FormInput, Text } from "components/materials";

const emptyIngredient = "";

const emptyInstruction = "";

const getInitialValues = (recipe) => {
  return {
    ...recipe,
    ingredients: { ingredients: recipe.ingredients },
    instructions: { instructions: recipe.instructions },
    prepTime: parseInt(recipe.prepTime),
    yields: parseInt(recipe.yields),
  };
};

export function RecipeForm({ onSubmit, recipe }) {
  const formRef = React.useRef(null);
  const [ingredients, setIngredients] = React.useState([emptyIngredient]);
  const [instructions, setInstructions] = React.useState([emptyInstruction]);

  function handleSubmit(data, { reset }) {
    // fix this monstrosity
    // find number library?
    // fix form scoping
    const variables = {
      ...data,
      ingredients: data.ingredients.ingredients,
      instructions: data.instructions.instructions,
      prepTime: parseInt(data.prepTime),
      yields: parseInt(data.yields),
      ...(recipe && { id: recipe.id }),
    };

    onSubmit({ variables }).then(() => reset());
  }

  function removeItem(items, index, setItems) {
    const newItems = items.filter((_item, itemIndex) => itemIndex !== index);
    setItems(newItems);
  }

  function addItem(items, emptyItem, setItems) {
    const newItems = items.concat([emptyItem]);
    setItems(newItems);
  }

  return (
    // use initialData prop for initial values
    <Pane display="flex" flexDirection="column" width="35%">
      <Form
        onSubmit={handleSubmit}
        initialData={recipe && getInitialValues(recipe)}
        ref={formRef}
      >
        <Pane display="flex" flexDirection="column">
          <Pane marginTop={majorScale(2)}>
            <FormInput name="name" label="Name (required)" />
          </Pane>
          <Pane display="flex" marginTop={majorScale(2)}>
            <FormInput name="prepTime" label="Prep Time" />
            <FormInput name="yields" label="Yields" />
            <FormInput name="cookingMethod" label="Cooking Method" />
          </Pane>
          <FormInput
            name="description"
            label="Description (required)"
            marginTop={majorScale(2)}
          />
          <Pane display="flex" alignItems="center" marginTop={majorScale(2)}>
            <Text marginRight={majorScale(2)}>Ingredients (required)</Text>
            <Button
              onClick={() =>
                addItem(ingredients, emptyIngredient, setIngredients)
              }
              type="button"
            >
              Add Ingredient
            </Button>
          </Pane>
          <Scope path="ingredients">
            {ingredients.map((_ingredient, index) => {
              return (
                <Pane display="flex" alignItems="center">
                  <IconButton
                    disabled={ingredients.length === 1}
                    icon="cross"
                    type="button"
                    onClick={() =>
                      removeItem(ingredients, index, setIngredients)
                    }
                  />
                  <FormInput name={`ingredients[${index}]`} />
                </Pane>
              );
            })}
          </Scope>
          <Pane display="flex" alignItems="center" marginTop={majorScale(2)}>
            <Text marginRight={majorScale(2)}>Instructions (required)</Text>
            <Button
              onClick={() =>
                addItem(instructions, emptyInstruction, setInstructions)
              }
              type="button"
            >
              Add Instruction
            </Button>
          </Pane>
          <Scope path="instructions">
            {instructions.map((_instruction, index) => {
              return (
                <Pane display="flex" alignItems="center">
                  <IconButton
                    icon="cross"
                    onClick={() =>
                      removeItem(instructions, index, setInstructions)
                    }
                    disabled={instructions.length === 1}
                  />
                  <FormInput name={`instructions[${index}]`} />
                </Pane>
              );
            })}
          </Scope>
          <Button type="submit" marginTop={majorScale(2)}>
            {recipe ? "Edit Recipe" : "Create Recipe"}
          </Button>
        </Pane>
      </Form>
    </Pane>
  );
}
