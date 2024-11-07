import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import RecipeCard from "../../components/RecipeCard/RecipeCard.jsx";
import "./Homepage.css"

function Homepage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/recipes/top");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <main className="home-main">
      <Navbar />

      <div className="hero">
        <div className="hero-content">
          <h1>Share your perfect recipes with the world</h1>
          <p>Food is a love language for many. Spread the love by sharing your recipes, or discover a world of flavors in our recipe library to share with those you cherish.</p>
          <button className="btn"><a href="/recipes">Find a Recipe ⇀</a></button>
          <button className="btn"><a href="/newrecipe">Create a Recipe ⇀</a></button>
        </div>
      </div>

      <h1>Today’s Top Recipe</h1>
      <div className="trending">
        <div className="card-grid">
            {Array.isArray(recipes) && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <h1>Upload your recipe</h1>
            )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Homepage;