import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Item from "./Item";
import ErrorPage from "./error-page";

function Router() {
  const loadData = async ({ request }) => {
    const url = new URL(request.url);
    const source = url.searchParams.get("source") || "data";
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

  return <RouterProvider router={router} />;
}

export default Router;
