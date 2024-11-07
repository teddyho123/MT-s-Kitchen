import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import RecipeLikeButton from "../RecipeDetail/RecipesLikeButton";
import "./Recipes.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

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

  const handleCourseClick = (tag) => {
    setSelectedCourse((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove the tag if already selected
        : [...prevTags, tag] // Add the tag if not selected
    );
  };

  const handleCategoryClick = (tag) => {
    setSelectedCategory((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove the tag if already selected
        : [...prevTags, tag] // Add the tag if not selected
    );
  };

  const filteredByCourse = selectedCourse.length > 0
    ? recipes.filter((recipe) => {
        return (
          Array.isArray(recipe.course) &&
          selectedCourse.every((tag) => recipe.course.includes(tag))
        );
      })
    : recipes;

    const filteredRecipes = selectedCategory.length > 0
    ? filteredByCourse.filter((recipe) => {
        return (
          Array.isArray(recipe.category) &&
          selectedCategory.every((tag) => recipe.category.includes(tag))
        );
      })
    : filteredByCourse;

    

  return (
    <>
      <div className="home-main">
        <Navbar />

        <h1>Recipes</h1>

        <div className="button-group">
          <button onClick={() => handleCourseClick("breakfast")} className={`btn ${selectedCourse.includes("breakfast") ? "selected" : ""}`}>Breakfast</button>
          <button onClick={() => handleCourseClick("brunch")} className={`btn ${selectedCourse.includes("brunch") ? "selected" : ""}`}>Brunch</button>
          <button onClick={() => handleCourseClick("lunch")} className={`btn ${selectedCourse.includes("lunch") ? "selected" : ""}`}>Lunch</button>
          <button onClick={() => handleCourseClick("dinner")} className={`btn ${selectedCourse.includes("dinner") ? "selected" : ""}`}>Dinner</button>
          <button onClick={() => handleCourseClick("dessert")} className={`btn ${selectedCourse.includes("dessert") ? "selected" : ""}`}>Dessert</button>
          <button onClick={() => setSelectedCourse([])} className="resetbtn">Reset</button>
        </div>

        <div className="button-group">
          <button onClick={() => handleCategoryClick("meat")} className={`btn ${selectedCategory.includes("meat") ? "selected" : ""}`}>Meat</button>
          <button onClick={() => handleCategoryClick("seafood")} className={`btn ${selectedCategory.includes("seafood") ? "selected" : ""}`}>Seafood</button>
          <button onClick={() => handleCategoryClick("dairy")} className={`btn ${selectedCategory.includes("dairy") ? "selected" : ""}`}>Dairy</button>
          <button onClick={() => handleCategoryClick("veggies")} className={`btn ${selectedCategory.includes("veggies") ? "selected" : ""}`}>Veggies</button>
          <button onClick={() => handleCategoryClick("carbs")} className={`btn ${selectedCategory.includes("carbs") ? "selected" : ""}`}>Carbs</button>
          <button onClick={() => setSelectedCategory([])} className="resetbtn">Reset</button>
        </div>

        <div className="card-grid">
          {Array.isArray(filteredRecipes) && filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <h1>No Recipes available</h1>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Recipes;
