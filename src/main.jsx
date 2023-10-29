import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CardProvider } from "./context/CardContext";
import { router } from "./routes/router";
import "./styles/utils.css";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <CardProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </CardProvider>
  </ThemeProvider>
);
