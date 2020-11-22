import React from "react";
import { Form } from "@unform/web";
import { Button, majorScale } from "evergreen-ui";
import * as Yup from "yup";
import { FormInput } from "components/materials";
import { handleSubmit } from "helpers/form";

export function UserForm({ hidePassword, loading, userMutation, user }) {
  const formRef = React.useRef(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter an email"),
    firstName: Yup.string().required("Please enter a first name"),
    lastName: Yup.string().required("Please enter a last name"),
    username: Yup.string().required("Please enter a username"),
    ...(!hidePassword
      ? {
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Please enter a password"),
        }
      : {}),
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
        <FormInput
          name="password"
          type="password"
          label="Password (Must be at least 8 characters)"
        />
      )}
      <Button
        appearance="primary"
        isLoading={loading}
        marginTop={majorScale(2)}
        type="submit"
      >
        {user ? "Save User Changes" : "Create Account"}
      </Button>
    </Form>
  );
}
