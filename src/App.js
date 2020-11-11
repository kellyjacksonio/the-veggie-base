import React from "react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "@apollo/client/link/context";
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
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  console.log("authLink", authLink);
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
