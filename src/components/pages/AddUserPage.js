import React from "react";
import { Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Pane } from "evergreen-ui";
import { UserForm } from "components/templates";
import { AuthContext } from "utils/context";

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
      token
    }
  }
`;

export function AddUserPage() {
  const { token, setAuth } = React.useContext(AuthContext);
  const [createUser] = useMutation(MUTATION, {
    onCompleted: ({ id, token }) => {
      setAuth({ id, token });
    },
  });

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <UserForm userMutation={createUser} />
      </Pane>
    </Pane>
  );
}
