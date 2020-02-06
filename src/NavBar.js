import React from "react";
import { Pane, Text, majorScale } from "evergreen-ui";

export function NavBar() {
  return (
    <Pane
      alignItems="center"
      borderBottom="default"
      display="flex"
      justifyContent="space-between"
      height={majorScale(6)}
      padding={majorScale(3)}
    >
      <Text fontSize={30} fontWeight={600}>
        The Veggie Base
      </Text>
      <Text>Login</Text>
    </Pane>
  );
}
