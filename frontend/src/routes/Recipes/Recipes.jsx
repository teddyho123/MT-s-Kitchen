import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import RecipeLikeButton from "../RecipeDetail/RecipesLikeButton";
import "./Recipes.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the backend API
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/recipes/all"); // Update to your API endpoint
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <div className="home-main">
        <Navbar />

        <h1>Recipes</h1>

        <div className="button-group">
          <button type="meat & poultry" className="btn">Meat & Poultry</button>
          <button type="fish & seafood" className="btn">Fish & Seafood</button>
          <button type="tofu & dairy" className="btn">Tofu & Dairy</button>
          <button type="fruits & vegetables" className="btn">Fruits & Vegetables</button>
          <button type="rice, pasta, noodles" className="btn">Rice & Pasta & Noodles</button>
        </div>

        <div className="card-grid">
        {Array.isArray(recipes)
          ? recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          : <h1>No Recipes available</h1>}
      </div>

        <Footer />
      </div>
    </>
  );
}

export default Recipes;
