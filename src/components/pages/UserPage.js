import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Form } from "@unform/web";
import { Button, Pane, toaster } from "evergreen-ui";
import * as Yup from "yup";
import { FormInput } from "components/materials";
import { UserForm } from "components/templates";
import { handleSubmit } from "helpers/form";
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

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation($userId: String!, $password: String!) {
    changePassword(password: $password, userId: $userId) {
      status
    }
  }
`;

function ChangePasswordForm({ changePassword, loading, userId }) {
  const formRef = React.useRef(null);
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("Required"),
  });

  return (
    <Form
      ref={formRef}
      onSubmit={(variables) =>
        handleSubmit(
          variables,
          ({ password }) => {
            return { password, userId };
          },
          changePassword,
          formRef,
          validationSchema
        )
      }
    >
      <FormInput name="password" type="password" label="Password" />
      <FormInput
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
      />
      <Button isLoading={loading} type="submit">
        Change Password
      </Button>
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
  const [changePassword, { loading: editPasswordLoading }] = useMutation(
    CHANGE_PASSWORD_MUTATION,
    {
      onCompleted: () => toaster.success("Your password has been changed!"),
    }
  );

  if (loading) return null;

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <UserForm
          hidePassword
          loading={editUserLoading}
          user={data.user}
          userMutation={editUser}
        />
        <ChangePasswordForm
          changePassword={changePassword}
          loading={editPasswordLoading}
          userId={userId}
        />
      </Pane>
    </Pane>
  );
}
