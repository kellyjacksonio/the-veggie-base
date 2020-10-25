import React from "react";
import { Form } from "@unform/web";
import { Button } from "evergreen-ui";
import * as Yup from "yup";
import { FormInput } from "components/materials";

function getInitialValues(user) {
  //
}

export function UserForm({ userMutation, user }) {
  const formRef = React.useRef(null);

  async function handleSubmit(variables, reset, userMutation) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        password: Yup.string().required(),
        username: Yup.string().required(),
      });

      formRef.current.setErrors({});

      await schema.validate(variables, {
        abortEarly: false,
      });

      userMutation({ variables }).then(() => reset());
    } catch (err) {
      console.log("err", err);
      const validationError = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationError[error.path] = "Please enter a value";
        });
        formRef.current.setErrors(validationError);
      }
    }
  }
  // handle initial values
  return (
    <Form
      initialData={user && getInitialValues(user)}
      onSubmit={(variables, { reset }) =>
        handleSubmit(variables, reset, userMutation)
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
