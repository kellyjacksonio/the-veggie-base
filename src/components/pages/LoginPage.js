import React from "react";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { LoginForm } from "components/templates";
import { AuthContext } from "utils/context";

const MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export function LoginPage() {
  const { token, setAuth } = React.useContext(AuthContext);
  const [signIn] = useMutation(MUTATION, {
    onCompleted: ({ id, token }) => {
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
