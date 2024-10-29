import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"
import App from './routes/Login/App.jsx'
import Homepage from './routes/Homepage/Homepage.jsx'
import Register from './routes/Register/Register.jsx'
import User from './routes/User/User.jsx'
import Recipes from './routes/Recipes/Recipes.jsx'
import NewRecipe from './routes/Newrecipe/Newrecipe.jsx'
import AboutUs from './routes/Aboutus/Aboutus.jsx'


const router = createBrowserRouter([
  {
    path: "login",
    element: <App />,
  },
  {
    path: "homepage",
    element: <Homepage />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "recipes",
    element: <Recipes />,
  },
  {
    path: "newrecipe",
    element: <NewRecipe />,
  },
  {
    path: "aboutus",
    element: <AboutUs />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider >
      <RouterProvider router={router} />
    </ChakraProvider >
  </React.StrictMode>,
)
