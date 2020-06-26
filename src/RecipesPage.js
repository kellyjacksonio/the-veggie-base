import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { RecipeCard } from "./RecipeCard";
import { RecipeForm } from "./RecipeForm";

const QUERY = gql`
  query RecipesPageQuery {
    recipes {
      id
      description
      name
      ingredients {
        id
        ingredient
        measurement
        quantity
        order
      }
      instructions
      prepTime
      yields
    }
  }
`;

export function RecipesPage() {
  const { data, loading } = useQuery(QUERY);

  if (loading) return null;

  return (
    <React.Fragment>
      <Pane display="flex" justifyContent="center">
        <RecipeForm refetchQuery={QUERY} />
      </Pane>
      {data.recipes.map((recipe) => (
        <RecipeCard recipe={recipe} refetchQuery={QUERY} />
      ))}
    </React.Fragment>
  );
}
