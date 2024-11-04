import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import RecipeLikeButton from "../RecipeDetail/RecipesLikeButton";
import "./Recipes.css";

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
          {Array.isArray(recipes) ? recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              <img src={recipe.img || "default-image.jpg"} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>Prep Time: {recipe.prep} mins</p>
              <p>Total Time: {recipe.total} mins</p>
              <Link to={`/recipes/${recipe.id}`} className="view-recipe-link">View Recipe</Link>
              <RecipeLikeButton recipeId={recipe.id}/>
              <span>❤️</span>
            </div>
          )) : <h1>No Recipes available</h1>}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Recipes;
