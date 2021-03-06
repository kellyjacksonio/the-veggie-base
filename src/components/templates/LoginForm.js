import React from "react";
import { Form } from "@unform/web";
import { Button, majorScale } from "evergreen-ui";
import * as Yup from "yup";
import { FormInput } from "components/materials";
import { handleSubmit } from "helpers/form";

export function LoginForm({ signIn }) {
  const formRef = React.useRef(null);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Form
      onSubmit={(variables) => {
        handleSubmit(
          variables,
          (variables) => variables,
          signIn,
          formRef,
          validationSchema
        );
      }}
      ref={formRef}
    >
      <FormInput name="username" type="text" label="Username"></FormInput>
      <FormInput name="password" type="password" label="Password"></FormInput>
      <Button appearance="primary" marginTop={majorScale(1)} type="submit">
        Login
      </Button>
    </Form>
  );
}
