import React from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import { get } from "lodash";
import * as Yup from "yup";
import { Button, IconButton, Pane, majorScale } from "evergreen-ui";
import { FormInput, Text } from "components/materials";
import { handleSubmit } from "helpers/form";

const emptyIngredient = "";

const emptyInstruction = "";

function getInitialValues(recipe) {
  return {
    ...recipe,
    ingredients: { ingredients: recipe.ingredients },
    instructions: { instructions: recipe.instructions },
  };
}

export function RecipeForm({ onSubmit, recipe }) {
  const formRef = React.useRef(null);
  const [ingredients, setIngredients] = React.useState(
    get(recipe, "ingredients", [emptyIngredient])
  );
  const [instructions, setInstructions] = React.useState(
    get(recipe, "instructions", [emptyInstruction])
  );

  function getVariables(data) {
    return {
      ...data,
      ingredients: data.ingredients.ingredients,
      instructions: data.instructions.instructions,
      ...(recipe && { id: recipe.id }),
    };
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    ingredients: Yup.object().shape({
      ingredients: Yup.array().of(Yup.string().required()),
    }),
    instructions: Yup.object().shape({
      instructions: Yup.array().of(Yup.string().required()),
    }),
  });

  function removeItem(items, index, setItems) {
    const newItems = items.filter((_item, itemIndex) => itemIndex !== index);
    setItems(newItems);
  }

  function addItem(items, emptyItem, setItems) {
    const newItems = items.concat([emptyItem]);
    setItems(newItems);
  }

  return (
    <Pane display="flex" flexDirection="column" width="35%">
      <Form
        onSubmit={(data) =>
          handleSubmit(data, getVariables, onSubmit, formRef, validationSchema)
        }
        initialData={recipe && getInitialValues(recipe)}
        ref={formRef}
      >
        <Pane display="flex" flexDirection="column">
          <Pane marginTop={majorScale(2)}>
            <FormInput name="name" label="Name" />
          </Pane>
          <Pane display="flex" marginTop={majorScale(2)}>
            <FormInput name="prepTime" label="Prep Time" />
            <FormInput name="yields" label="Yields" />
            <FormInput name="cookingMethod" label="Cooking Method" />
          </Pane>
          <FormInput
            name="description"
            label="Description"
            marginTop={majorScale(2)}
          />
          <Text marginTop={majorScale(2)} marginRight={majorScale(2)}>
            Ingredients
          </Text>
          <Scope path="ingredients">
            {ingredients.map((_ingredient, index) => {
              return (
                <Pane
                  display="flex"
                  alignItems="center"
                  key={`ingredient${index}`}
                >
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
          <Pane>
            <Button
              onClick={() =>
                addItem(ingredients, emptyIngredient, setIngredients)
              }
              type="button"
            >
              Add Ingredient
            </Button>
          </Pane>
          <Text marginTop={majorScale(2)} marginRight={majorScale(2)}>
            Instructions
          </Text>
          <Scope path="instructions">
            {instructions.map((_instruction, index) => {
              return (
                <Pane
                  display="flex"
                  alignItems="center"
                  key={`instruction${index}`}
                >
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
          <Pane>
            <Button
              onClick={() =>
                addItem(instructions, emptyInstruction, setInstructions)
              }
              type="button"
            >
              Add Instruction
            </Button>
          </Pane>
          <Button appearance="primary" type="submit" marginTop={majorScale(2)}>
            {recipe ? "Save Recipe Changes" : "Create Recipe"}
          </Button>
        </Pane>
      </Form>
    </Pane>
  );
}
