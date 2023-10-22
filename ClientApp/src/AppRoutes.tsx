import React from "react";
import { Home } from "./components/Home";

interface Route {
  index: boolean;
  element: JSX.Element;
}

const AppRoutes: Route[] = [
  {
    index: true,
    element: <Home />
  }
];

export default AppRoutes;
