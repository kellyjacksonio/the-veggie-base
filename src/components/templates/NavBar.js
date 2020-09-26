import React from "react";
import { useHistory } from "react-router-dom";
import { Pane, majorScale } from "evergreen-ui";
import { Text } from "components/materials";

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
      <Pane onClick={() => history.push("/")} cursor="pointer">
        <Text fontSize={30} fontWeight={600}>
          The Veggie Base
        </Text>
      </Pane>
      <Text cursor="pointer" onClick={() => history.push("/login")}>
        Login
      </Text>
      <Text cursor="pointer" onClick={() => history.push("/user/new")}>
        / Create Account
      </Text>
    </Pane>
  );
}
