import { Home, Menu, Cart, Order, CreateOrder } from "./features";
import { loader as menuLoader } from "./features/menu/Menu";
import { loader as loaderOrder } from "./features/order/Order";
import { action as createOrder } from "./features/order/CreateOrder";
import { action as updataOrderAction } from "./features/order/UpdateOder";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/store";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: loaderOrder,
        action: updataOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
export default App;
