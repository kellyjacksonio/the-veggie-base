import { gql } from "@apollo/client";

export const RECIPES_QUERY = gql`
  query RecipesPageQuery($username: String) {
    recipes(username: $username) {
      id
      cookingMethod
      description
      ingredients
      insertedAt
      instructions
      name
      prepTime
      yields
      user {
        id
        username
      }
    }
  }
`;

export const RECIPE_QUERY = gql`
  query RecipePageQuery($recipeId: String!) {
    recipe(id: $recipeId) {
      id
      cookingMethod
      description
      ingredients
      insertedAt
      instructions
      name
      prepTime
      yields
      user {
        id
        username
      }
    }
  }
`;

// recipe fragment
