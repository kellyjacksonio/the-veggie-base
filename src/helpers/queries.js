import { gql } from "@apollo/client";

export const RECIPES_QUERY = gql`
  query RecipesPageQuery {
    recipes {
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
