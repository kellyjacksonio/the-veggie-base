import React from "react";
import { Form } from "@unform/web";
import { Button } from "evergreen-ui";
import * as Yup from "yup";
import { FormInput } from "components/materials";
import { handleSubmit } from "helpers/form";

function getInitialValues(user) {
  //
}

export function UserForm({ userMutation, user }) {
  const formRef = React.useRef(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    password: Yup.string().required(),
    username: Yup.string().required(),
  });

  return (
    <Form
      initialData={user && getInitialValues(user)}
      onSubmit={(variables) =>
        handleSubmit(
          variables,
          (variables) => variables,
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
      <FormInput name="password" type="password" label="Password" />
      <Button type="submit">{user ? "Edit User" : "Create Account"}</Button>
    </Form>
  );
}
