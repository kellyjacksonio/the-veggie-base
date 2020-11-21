import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as EvergreenLink } from "evergreen-ui";

export function Link({ children, to, fontSize }) {
  return (
    <RouterLink to={to}>
      <EvergreenLink fontSize={fontSize}>{children}</EvergreenLink>
    </RouterLink>
  );
}
