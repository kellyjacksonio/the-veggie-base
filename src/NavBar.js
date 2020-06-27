import React from "react";
import { useHistory } from "react-router-dom";
import { Pane, majorScale } from "evergreen-ui";
import { Text } from "./Text";

export function NavBar() {
  const history = useHistory();

  return (
    <Pane
      alignItems="center"
      borderBottom="default"
      display="flex"
      justifyContent="space-between"
      height={majorScale(6)}
      padding={majorScale(3)}
    >
      <Pane onClick={() => history.push("/")}>
        <Text fontSize={30} fontWeight={600}>
          The Veggie Base
        </Text>
      </Pane>
      <Text>Login</Text>
    </Pane>
  );
}
