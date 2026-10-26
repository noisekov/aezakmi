import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const root = document.getElementById("root");

createRoot(root!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);
