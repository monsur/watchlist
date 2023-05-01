import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Item from "./Item";

function Router() {
  const loadData = async (requestUrl: string) => {
    const url = new URL(requestUrl);
    const source = url.searchParams.get("source") || "wishlist";
    return fetch(`${process.env.PUBLIC_URL}/${source}.json`);
  };

  const router = createHashRouter([
    {
      path: "/",
      element: <App />,
      loader: async ({ request }) => {
        return loadData(request.url);
      },
    },
    {
      path: "/item/:itemId",
      element: <Item />,
      loader: async ({ request }) => {
        return loadData(request.url);
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
