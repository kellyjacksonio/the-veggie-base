import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { LoginForm } from "components/templates";

const MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export function LoginPage() {
  const history = useHistory();
  const [signIn] = useMutation(MUTATION, {
    onCompleted: () => history.push("/"),
  });

  return (
    <Pane display="flex" justifyContent="center">
      <LoginForm signIn={signIn} />
    </Pane>
  );
}
