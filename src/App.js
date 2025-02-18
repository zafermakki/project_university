import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider,createTheme,CssBaseline } from "@mui/material";
import Interface from "./components/interface/Interface"; 
import Login from "./components/login/Login"; 
import ListPage from "./components/list/List";
import NewAccount from "./components/createAccount/NewAccount"
import ProfilePage from "./components/profile/Profile";
import NewGames from "./components/newGames/NewGames";
import CartPage from "./components/cart/CartPage";
import CategoriesDevices from "./components/category/CategoriesDevices";
import SubCategories from "./components/subcategories/SubCategories";
import Details from "./components/details/Details";
import Purchases from "./components/purchases/Purchases";
import Products from "./components/products/Prodcuts";
import VerifyEmail from "./components/verifyEmail/VerifyEmail";
import GameSuggestions from "./components/gameSuggestions/GameSuggestions"
import AstroRobot from "./components/astroRobot/AstroRobot";

function App() {
  const [MyMOde, setmyMOde] = useState(
    localStorage.getItem("currentMode") === null
    ? "light"
    :localStorage.getItem("currentMode") === "light"
    ? "light"
    : "dark"
  )
  const darktheme = createTheme({
    palette: {
      mode:MyMOde,
    },
  })

  const productsRouter = [
    {
      path: '',
      element: <Interface setmyMOde={setmyMOde}/>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/createaccount',
      element: <NewAccount/>
    },
    {
      path: 'verify-email',
      element: <VerifyEmail />   
    },
    {
      path: '/list',
      element: <ListPage setmyMOde={setmyMOde}/>
    },
    {
      path: '/profile',
      element: <ProfilePage/>
    },
    {
      path: '/newgames',
      element: <NewGames/>
    },
    {
      path: '/cartpage',
      element: <CartPage/>
    },
    {
      path: '/categoriesdevices',
      element: <CategoriesDevices/>
    },
    {
      path: '/subcategories/:category_id',
      element: <SubCategories/>
    },
    {
      path: '/products/:subcategory_id',
      element: <Products/>
    },
    {
      path: '/details',
      element: <Details/>
    },
    {
      path: '/purchases',
      element: <Purchases/>
    },
    {
      path: '/gamesuggestions',
      element: <GameSuggestions/>
    },
    {
      path: '/astrorobot',
      element: <AstroRobot/>
    }
  ];

  // Create the router with the routes array
  const router = createBrowserRouter(
      productsRouter
    );

  return (
    <ThemeProvider theme={darktheme}>
        <CssBaseline/>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
