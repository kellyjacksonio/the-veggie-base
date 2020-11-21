import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "utils/context";

export default function ProtectedRoute({ children, path }) {
  const { userId } = React.useContext(AuthContext);

  return userId ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}
