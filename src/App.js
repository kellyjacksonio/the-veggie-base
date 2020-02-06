import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppLayout } from "./AppLayout";

function App() {
  const HTTP_URI = "http://localhost:4000";
  const client = new ApolloClient({
    uri: HTTP_URI
  });

  return (
    <ApolloProvider client={client}>
      <AppLayout />
    </ApolloProvider>
  );
}

export default App;
