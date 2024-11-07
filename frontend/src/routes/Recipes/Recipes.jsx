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
          <button onClick={() => setSelectedCourse([])} className="btn">All</button>
          <button onClick={() => handleCourseClick("breakfast")} className="btn">Breakfast</button>
          <button onClick={() => handleCourseClick("brunch")} className="btn">Brunch</button>
          <button onClick={() => handleCourseClick("lunch")} className="btn">Lunch</button>
          <button onClick={() => handleCourseClick("dinner")} className="btn">Dinner</button>
          <button onClick={() => handleCourseClick("dessert")} className="btn">Dessert</button>
        </div>

        <div className="button-group">
          <button onClick={() => setSelectedCategory([])} className="btn">All</button>
          <button onClick={() => handleCategoryClick("meat")} className="btn">Meat</button>
          <button onClick={() => handleCategoryClick("seafood")} className="btn">Seafood</button>
          <button onClick={() => handleCategoryClick("dairy")} className="btn">Dairy</button>
          <button onClick={() => handleCategoryClick("veggies")} className="btn">Veggies</button>
          <button onClick={() => handleCategoryClick("carbs")} className="btn">Carbs</button>
        </div>

        <div className="button-group">
          <p>Selected Course Tags: {selectedCourse.length > 0 ? selectedCourse.join(', ') : "All"}</p>
          <p>Selected Category Tags: {selectedCategory.length > 0 ? selectedCategory.join(', ') : "All"}</p>
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
