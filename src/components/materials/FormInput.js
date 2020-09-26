import React from "react";
import { Input } from "@rocketseat/unform";
import { Pane, Text } from "evergreen-ui";

export function FormInput({ name, label }) {
  return (
    <Pane display="flex" flexDirection="column">
      <Text>{label}</Text>
      <Input name={name} />
    </Pane>
  );
}
