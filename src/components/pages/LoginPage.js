import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form } from "@unform/web";
import { FormInput } from "components/materials";
import { Button } from "evergreen-ui";

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
    <Form onSubmit={(variables) => signIn({ variables })}>
      <FormInput name="email" type="email"></FormInput>
      <FormInput name="password" type="password"></FormInput>
      <Button type="submit">Login</Button>
    </Form>
  );
}
