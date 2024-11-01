import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import './index.css'

import App from './src/routes/Login/App.jsx'
import Homepage from './src/routes/Homepage/Homepage.jsx'
import Register from './src/routes/Register/Register.jsx'
import User from './src/routes/User/User.jsx'
import Recipes from './src/routes/Recipes/Recipes.jsx'
import NewRecipe from './src/routes/Newrecipe/Newrecipe.jsx'
import AboutUs from './src/routes/Aboutus/Aboutus.jsx'
import RecipeDetail from './src/routes/RecipeDetail/RecipeDetail.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="homepage" />,
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/recipes/:recipeId",
    element: <RecipeDetail />,
  },
  {
    path: "/newrecipe",
    element: <NewRecipe />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
