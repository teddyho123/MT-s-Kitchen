// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState([]); // New state to track liked recipes

  // Function to simulate login (replace this with real login logic)
  const login = () => {
    setIsAuthenticated(true);
    // Optionally load user's liked recipes from an API or local storage
  };

  // Function to simulate logout
  const logout = () => {
    setIsAuthenticated(false);
    setLikedRecipes([]); // Clear liked recipes on logout
  };

  // Function to like a recipe
  const likeRecipe = (recipeId) => {
    if (!likedRecipes.includes(recipeId)) {
      setLikedRecipes([...likedRecipes, recipeId]);
    }
  };

  // Function to unlike a recipe
  const unlikeRecipe = (recipeId) => {
    setLikedRecipes(likedRecipes.filter((id) => id !== recipeId));
  };

  // Function to check if a recipe is liked
  const isRecipeLiked = (recipeId) => likedRecipes.includes(recipeId);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        likedRecipes,
        likeRecipe,
        unlikeRecipe,
        isRecipeLiked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
