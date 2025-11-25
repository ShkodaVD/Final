import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import MainLayout from "./MainLayout/MainLayout";
import Categories from "./categories/Categories";
import Categori_1 from "./categories/Categori_1";
import Allproducts from "./products/Allproducts";
import OneProduct from "./products/OneProduct";
import Error from "./404/Error";
import Cart from "./cart/Cart";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: IndexPage,
      },
      {
        path: '/categories/all',
        Component: Categories,
      },
      {
        path: '/categories/:id',
        Component: Categori_1,
      },
      {
        path: '/products/all',
        Component: Allproducts,
      },
      {
        path: '/products/:id',
        Component: OneProduct,
      },
      {
        path: '/cart',
        Component: Cart,
      },
      {
        path: '*',
        Component: Error,
      }
    ]
  }
]);