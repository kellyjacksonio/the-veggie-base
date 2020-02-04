import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  query TestQuery {
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

export function Test() {
  const { data, loading } = useQuery(QUERY);

  if (loading) return null;
  return (
    <>
      <h1>The Veggie Base</h1>
      <h4>Here are the recipes:</h4>
      {data.recipes.map(recipe => (
        <p>{recipe.name}</p>
      ))}
    </>
  );
}
