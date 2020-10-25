import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { UserForm } from "components/templates";

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
      token
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
        <UserForm userMutation={createUser} />
      </Pane>
    </Pane>
  );
}
