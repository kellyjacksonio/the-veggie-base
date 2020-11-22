import React from "react";
import { Redirect } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Pane, toaster } from "evergreen-ui";
import { LoginForm } from "components/templates";
import { AuthContext } from "utils/context";

const MUTATION = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      id
      token
    }
  }
`;

export function LoginPage() {
  const { token, setAuth } = React.useContext(AuthContext);
  const [signIn] = useMutation(MUTATION, {
    onError: (error) => {
      if (error.message) {
        toaster.danger("Username or password is incorrect. Please try again.", {
          duration: 2,
        });
      }
    },
    onCompleted: (results) => {
      const { id, token } = results.signIn;
      setAuth({ id, token });
    },
  });

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <Pane display="flex" justifyContent="center">
      <LoginForm signIn={signIn} />
    </Pane>
  );
}
