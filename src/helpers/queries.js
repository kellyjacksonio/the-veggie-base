import gql from "graphql-tag";

export const RECIPES_QUERY = gql`
  query RecipesPageQuery {
    recipes {
      id
      cookingMethod
      description
      name
      ingredients
      instructions
      prepTime
      yields
    }
  }
`;
