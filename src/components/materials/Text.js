import React from "react";
import { Text as EvergreenText } from "evergreen-ui";

export function Text({ color, children, ...props }) {
  return (
    <EvergreenText color={color ? color : "#1C2833"} {...props}>
      {children}
    </EvergreenText>
  );
}
