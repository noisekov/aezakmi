import { createBrowserRouter } from "react-router";
import Page from "../components/Page/Page";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import HomeRedirect from "./HomeRedirect";

export const router = createBrowserRouter(
  [
    {
      element: <Page />,
      children: [
        {
          path: "/",
          element: <HomeRedirect />,
        },
        {
          element: <GuestRoute />,
          children: [
            {
              path: "/login",
              lazy: async () => {
                const { default: Login } = await import("../pages/Login/Login");

                return { Component: Login };
              },
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/cards",
              lazy: async () => {
                const { default: Cards } = await import("../pages/Cards/Cards");

                return { Component: Cards };
              },
            },
            {
              path: "/rates",
              lazy: async () => {
                const { default: Rates } = await import("../pages/Rates/Rates");

                return { Component: Rates };
              },
            },
          ],
        },
      ],
    },
  ],
  // {
  //   basename: "/aezakmi",
  // },
);
