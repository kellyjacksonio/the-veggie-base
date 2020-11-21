import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Form } from "@unform/web";
import { FormInput } from "components/materials";
import { UserForm } from "components/templates";
import { Button, Pane, toaster } from "evergreen-ui";
import { AuthContext } from "utils/context";

const USER_QUERY = gql`
  query UserPageUserQuery($userId: String!) {
    user(id: $userId) {
      id
      username
      email
      firstName
      lastName
    }
  }
`;

const EDIT_USER_MUTATION = gql`
  mutation EditUserMutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $userId: String!
  ) {
    editUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      userId: $userId
    ) {
      id
      username
    }
  }
`;

function ChangePasswordForm() {
  const formRef = React.useRef(null);
  return (
    <Form ref={formRef}>
      <FormInput name="password" type="password" label="Password" />
      <FormInput
        name="passwordConfirm"
        type="password"
        label="Enter password again"
      />
      <Button type="submit">Change Password</Button>
    </Form>
  );
}

export function UserPage() {
  const { userId } = React.useContext(AuthContext);
  const { data, loading } = useQuery(USER_QUERY, { variables: { userId } });
  const [editUser, { loading: editUserLoading }] = useMutation(
    EDIT_USER_MUTATION,
    {
      onCompleted: () => toaster.success("Your details have been saved!"),
    }
  );

  if (loading) return null;

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <UserForm
          userMutation={editUser}
          user={data.user}
          hidePassword
          loading={editUserLoading}
        />
        <ChangePasswordForm />
      </Pane>
    </Pane>
  );
}
