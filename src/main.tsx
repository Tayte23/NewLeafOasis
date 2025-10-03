import React from "react";
import { createRoot } from "react-dom/client";
import NewLeafOasis from "./NewLeafOasis";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NewLeafOasis />
  </React.StrictMode>
);
