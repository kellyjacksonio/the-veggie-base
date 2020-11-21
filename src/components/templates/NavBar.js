import React from "react";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import { Pane, majorScale } from "evergreen-ui";
import { Link, Text } from "components/materials";
import { AuthContext } from "utils/context";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      status
    }
  }
`;

const USER_QUERY = gql`
  query UserQuery($userId: String!) {
    user(id: $userId) {
      id
      username
    }
  }
`;

export function NavBar() {
  const client = useApolloClient();
  const history = useHistory();
  const { userId, setAuth } = React.useContext(AuthContext);
  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: () => {
      setAuth();
      // TODO check if the cache is actually clearing
      client.clearStore();
      history.push("/");
    },
  });
  const { data } = useQuery(USER_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  const username = get(data, "user.username");

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
      {userId && username ? (
        <Pane>
          <Text marginRight={majorScale(2)}>Welcome back, {username}!</Text>
          <Text
            cursor="pointer"
            onClick={() => history.push(`/user/${username}/recipe/new`)}
          >
            Add Recipe
          </Text>
          <Text> | </Text>
          <Text
            cursor="pointer"
            onClick={() => history.push(`/user/${username}/recipes`)}
          >
            My Recipes
          </Text>
          <Text> | </Text>
          <Text
            cursor="pointer"
            onClick={() => history.push(`/user/${username}/account`)}
          >
            My Account
          </Text>
          <Text> | </Text>
          <Text
            cursor="pointer"
            onClick={() => {
              signOut();
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
