import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import './index.css'
import { AuthProvider } from './src/routes/AuthContext.jsx';

import Homepage from './src/routes/Homepage/Homepage.jsx'
import User from './src/routes/User/User.jsx'
import Recipes from './src/routes/Recipes/Recipes.jsx'
import NewRecipe from './src/routes/Newrecipe/Newrecipe.jsx'
import AboutUs from './src/routes/Aboutus/Aboutus.jsx'
import RecipeDetail from './src/routes/RecipeDetail/RecipeDetail.jsx';
import Success from './src/routes/Newrecipe/Success.jsx';
import LoginRegister from './src/routes/Login/LoginRegister.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" />,
  },
  {
    path: "/login",
    element: <LoginRegister />,
  },
  {
    path: "/home",
    element: <Homepage />,
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
    path: "/newrecipe/success",
    element: <Success />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)