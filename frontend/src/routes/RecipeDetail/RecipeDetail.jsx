import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import RecipeLikeButton from "./RecipesLikeButton";


function RecipeDetail() {
    let {recipeId} = useParams();
    const [recipe, setRecipe] = useState(null);
    recipeId = parseInt(recipeId);


  useEffect(() => {
    // Fetch recipes from the backend API
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`); // Update to your API endpoint
        if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`);} // Debugging
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  return (
    <div>
      <Navbar />
      <h1>Recipe Details</h1>
      {recipe ? (
        <div>
          <h2>{recipe.name}<RecipeLikeButton recipeId={recipeId}/></h2>
          <p>Course: {recipe.course.join(", ")}</p>
          <p>Category: {recipe.category.join(", ")}</p>
          <p>Portion: {recipe.portion}</p>
          <p>Prep Time: {recipe.prep} mins</p>
          <p>Total Time: {recipe.total} mins</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.measurement} {ingredient.unit} {ingredient.ingredient}
              </li>
            ))}
          </ul>
          <p>Description: {recipe.description}</p>
          <p>Guide: {recipe.guide}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
}

export default RecipeDetail;