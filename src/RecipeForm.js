import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, IconButton, Pane } from "evergreen-ui";
import { Input, Form, Scope } from "@rocketseat/unform";
import { Text } from "./Text";

const MUTATION = gql`
  mutation CreateRecipe(
    $cookingMethod: [String]
    $description: String!
    $ingredients: [Ingredient]
    $instructions: [String]
    $name: String!
    $prepTime: Int
    $yields: Int
  ) {
    createRecipe(
      cookingMethod: $cookingMethod
      description: $description
      ingredients: $ingredients
      instructions: $instructions
      name: $name
      prepTime: $prepTime
      yields: $yields
    ) {
      id
    }
  }
`;

const emptyIngredient = {
  quantity: undefined,
  measurement: undefined,
  ingredient: undefined
};

const emptyInstruction = "";

export function RecipeForm() {
  const [ingredients, setIngredients] = React.useState([emptyIngredient]);
  const [instructions, setInstructions] = React.useState([emptyInstruction]);

  const [createRecipe, createRecipeResults] = useMutation(MUTATION);

  function handleSubmit(data) {
    console.log("data", data);
    createRecipe({ variables: data });
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
    <Pane display="flex" flexDirection="column">
      <Text>Add your recipe</Text>
      <Form onSubmit={handleSubmit}>
        <Pane display="flex" flexDirection="column" width="30%">
          <Input name="name" label="Name"></Input>
          <Input name="description" label="Description"></Input>
          <Input name="prepTime" label="Prep Time"></Input>
          <Input name="yields" label="Yields"></Input>
          <Input name="cookingMethod" label="Cooking Method"></Input>
          <Button
            onClick={() =>
              addItem(ingredients, emptyIngredient, setIngredients)
            }
            type="button"
          >
            Add Ingredient
          </Button>
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
                  <Input
                    name={`ingredients[${index}].quantity`}
                    label="Quantity"
                  />
                  <Input
                    name={`ingredients[${index}].measurement`}
                    label="Measurement"
                  />
                  <Input
                    name={`ingredients[${index}].ingredient`}
                    label="Ingredient"
                  />
                </Pane>
              );
            })}
          </Scope>
          <Button
            onClick={() =>
              addItem(instructions, emptyInstruction, setInstructions)
            }
            type="button"
          >
            Add Instruction
          </Button>
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
                  <Input name={`instruction[${index}]`} label="Instruction" />
                </Pane>
              );
            })}
          </Scope>
          <Button type="submit">Create Recipe</Button>
        </Pane>
      </Form>
    </Pane>
  );
}
