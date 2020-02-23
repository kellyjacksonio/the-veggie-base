import React from "react";
import { Button, Pane } from "evergreen-ui";
import { Input, Form, Scope } from "@rocketseat/unform";
import { Text } from "./Text";

export function RecipeForm() {
  function handleSubmit(data) {
    console.log("data", data);
  }

  return (
    // use initialData prop for initial values
    <Pane display="flex" flexDirection="column">
      <Text>Add your recipe</Text>
      <Form onSubmit={handleSubmit}>
        <Pane display="flex" flexDirection="column">
          <Input name="name" label="Name"></Input>
          <Input name="description" label="Description"></Input>
          <Input name="prepTime" label="Prep Time"></Input>
          <Input name="yields" label="Yields"></Input>
          <Input name="cookingMethod" label="Cooking Method"></Input>
          <Scope path="ingredients">
            <Input name="quantity" label="Quantity"></Input>
            <Input name="measurement" label="Measurement"></Input>
            <Input name="name" label="Ingredient"></Input>
          </Scope>
          <Scope path="instructions">
            <Input name="instruction" label="Instruction" />
          </Scope>
          <Button type="submit">Create Recipe</Button>
        </Pane>
      </Form>
    </Pane>
  );
}
