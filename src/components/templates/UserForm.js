import React from "react";
import { Form } from "@unform/web";
import { Button } from "evergreen-ui";
import * as Yup from "yup";
import { FormInput } from "components/materials";
import { handleSubmit } from "helpers/form";

export function UserForm({ hidePassword, loading, userMutation, user }) {
  const formRef = React.useRef(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    ...(!hidePassword ? { password: Yup.string().required() } : {}),
  });

  return (
    <Form
      initialData={user}
      onSubmit={(variables) =>
        handleSubmit(
          variables,
          (variables) => (user ? { ...variables, userId: user.id } : variables),
          userMutation,
          formRef,
          validationSchema
        )
      }
      ref={formRef}
    >
      <FormInput name="firstName" type="firstName" label="First Name" />
      <FormInput name="lastName" type="lastName" label="Last Name" />
      <FormInput name="username" type="userName" label="Username" />
      <FormInput name="email" type="email" label="Email" />
      {!hidePassword && (
        <FormInput name="password" type="password" label="Password" />
      )}
      <Button isLoading={loading} type="submit">
        {user ? "Edit User" : "Create Account"}
      </Button>
    </Form>
  );
}
