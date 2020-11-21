import { gql } from "@apollo/client";

const RECIPE_FRAGMENT = gql`
  fragment RecipeFragment on Recipe {
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
`;

export const RECIPES_QUERY = gql`
  query RecipesPageQuery($username: String) {
    recipes(username: $username) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;

export const RECIPE_QUERY = gql`
  query RecipePageQuery($recipeId: String!) {
    recipe(id: $recipeId) {
      ...RecipeFragment
    }
  }
  ${RECIPE_FRAGMENT}
`;
