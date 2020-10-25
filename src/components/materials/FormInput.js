import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { Pane } from "evergreen-ui";
import { Text } from "components/materials";

export function FormInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Pane display="flex" flexDirection="column">
      <Text>{label}</Text>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Text color="red">{error}</Text>}
    </Pane>
  );
}
