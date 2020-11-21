import React from "react";
import { Redirect } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Pane } from "evergreen-ui";
import { LoginForm } from "components/templates";
import { AuthContext } from "utils/context";

const MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      token
    }
  }
`;

export function LoginPage() {
  const { token, setAuth } = React.useContext(AuthContext);
  const [signIn] = useMutation(MUTATION, {
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
