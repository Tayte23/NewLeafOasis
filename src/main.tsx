import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import NewLeafOasis from "./NewLeafOasis";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <NewLeafOasis />
    </HashRouter>
  </React.StrictMode>
);
