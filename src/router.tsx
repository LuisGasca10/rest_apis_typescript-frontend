import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import {
  Products,
  action as actionEditAvailability,
  loader as productLoader,
} from "./views/Products";
import { NewProduct, action as actionNewProduct } from "./views/NewProduct";
import {
  EditProduct,
  action as actionUpdateProduct,
  loader as loaderEdit,
} from "./views/EditProduct";
import { action as actionDelete } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productLoader,
        action: actionEditAvailability,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: actionNewProduct,
      },
      {
        path: "productos/:id/editar", //ROA Pattern - Resource-oriented-design
        element: <EditProduct />,
        action: actionUpdateProduct,
        loader: loaderEdit,
      },
      {
        path: "productos/:id/eliminar",
        action: actionDelete,
      },
    ],
  },
]);
