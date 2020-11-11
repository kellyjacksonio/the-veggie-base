import React from "react";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import Cookies from "js-cookie";
import { AppLayout } from "./AppLayout";
import { StateProvider } from "./StateProvider";

function App() {
  const HTTP_URI = "http://localhost:4000";
  const httpLink = createHttpLink({
    uri: HTTP_URI,
  });
  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get("token");
    console.log("the cookies", Cookies.get());
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <StateProvider>
        <AppLayout />
      </StateProvider>
    </ApolloProvider>
  );
}

export default App;
