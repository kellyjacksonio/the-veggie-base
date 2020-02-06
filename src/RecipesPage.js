import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Pane, majorScale } from "evergreen-ui";
import { RecipeCard } from "./RecipeCard";

const QUERY = gql`
  query RecipesPageQuery {
    recipes {
      id
      name
      ingredients {
        id
        ingredient
        measurement
        quantity
        order
      }
    }
  }
`;

export function RecipesPage() {
  const { data, loading } = useQuery(QUERY);

  if (loading) return null;

  return (
    <Pane padding={majorScale(1)}>
      {data.recipes.map(recipe => (
        <RecipeCard recipe={recipe} />
      ))}
    </Pane>
  );
}
