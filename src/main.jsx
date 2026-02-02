import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/common/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Global error caught:", error);
        console.error("Component stack:", info.componentStack);
      }}
    >      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
