import React from "react";
import { useHistory } from "react-router-dom";
import { Pane, majorScale } from "evergreen-ui";
import { Text } from "components/materials";

export function NavBar() {
  const history = useHistory();

  // temporary variables
  const userIsAuthenticated = false;
  const username = "gorb";

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
      {userIsAuthenticated ? (
        <Pane>
          <Text
            cursor="pointer"
            onClick={() => history.push(`user/${username}/recipe/new`)}
          >
            Add Recipe
          </Text>
          <Text> | </Text>
          <Text
            cursor="pointer"
            onClick={() => history.push(`user/${username}/account`)}
          >
            My Account
          </Text>
          <Text> | </Text>
          <Text
            cursor="pointer"
            onClick={() => console.log("log the user out")}
          >
            Log Out
          </Text>
        </Pane>
      ) : (
        <Pane>
          <Text cursor="pointer" onClick={() => history.push("/login")}>
            Log In
          </Text>
          <Text> | </Text>
          <Text cursor="pointer" onClick={() => history.push("/user/new")}>
            Create Account
          </Text>
        </Pane>
      )}
    </Pane>
  );
}
