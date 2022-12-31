import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Item from "./Item";
import ErrorPage from "./error-page";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/prompt/500.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const loadData = async ({ params }) => {
  let source = "data";
  if (params.source) {
    source = params.source;
  }
  return fetch(`${process.env.PUBLIC_URL}/${source}.json`);
};

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loadData,
  },
  {
    path: "/item/:itemId",
    element: <Item />,
    loader: loadData,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
