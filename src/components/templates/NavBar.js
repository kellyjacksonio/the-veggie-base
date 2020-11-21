import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Pane, majorScale } from "evergreen-ui";
import { Text } from "components/materials";
import { AuthContext } from "utils/context";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      status
    }
  }
`;

export function NavBar() {
  const history = useHistory();
  const [signOut] = useMutation(SIGN_OUT);

  const { token, setAuth } = React.useContext(AuthContext);
  // temporary variables
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
      {token ? (
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
            onClick={() => {
              // TODO should i signout first then setAuth ?
              setAuth();
              signOut().then(() => {
                // reset cache
              });
            }}
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
