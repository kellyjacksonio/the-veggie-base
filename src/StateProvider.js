import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import { AuthContext } from "utils/context";

export function StateProvider({ children }) {
  const client = useApolloClient();
  const [token, setToken] = useState(Cookies.get("token"));
  const [userId, setUserId] = useState(Cookies.get("userId"));

  useEffect(() => {
    if (!token) client.clearStore();
  }, [token]);

  const setAuth = (data) => {
    if (data) {
      const { id, token } = data;
      Cookies.set("token", token);
      Cookies.set("userId", id);
      setToken(token);
      setUserId(id);
    } else {
      Cookies.remove("token");
      Cookies.remove("userId");
      setToken(null);
      setUserId(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userId, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
