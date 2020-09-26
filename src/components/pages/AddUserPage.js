import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form } from "@rocketseat/unform";
import { FormInput } from "components/materials";
import { Button, Pane } from "evergreen-ui";

const MUTATION = gql`
  mutation createUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      id
    }
  }
`;

export function AddUserPage() {
  const history = useHistory();
  const [createUser] = useMutation(MUTATION, {
    onCompleted: () => history.push("/"),
  });

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <Form onSubmit={(variables) => createUser({ variables })}>
          <FormInput
            name="firstName"
            type="firstName"
            label="First Name"
          ></FormInput>
          <FormInput
            name="lastName"
            type="lastName"
            label="Last Name"
          ></FormInput>
          <FormInput
            name="username"
            type="userName"
            label="Username"
          ></FormInput>
          <FormInput name="email" type="email" label="Email"></FormInput>
          <FormInput
            name="password"
            type="password"
            label="Password"
          ></FormInput>
          <Button type="submit">Create Account</Button>
        </Form>
      </Pane>
    </Pane>
  );
}
