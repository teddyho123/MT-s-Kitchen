import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";


function RecipeDetail() {
    let {recipeId} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    recipeId = parseInt(recipeId);
    const userId = parseInt(localStorage.getItem("userId"), 10);


  useEffect(() => {
    // Fetch recipes from the backend API
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`); // Update to your API endpoint
        if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`);} // Debugging
        const data = await response.json();
        setRecipe(data);
        setLikes(data.likes);
        setIsLiked(data.user_id.includes(userId));
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [recipeId, userId]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
        try {
            if (isNaN(userId)) {
                const likesResponse = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`);
                if (likesResponse.ok) {
                const data = await likesResponse.json();
                setLikes(data.likes);
            }
            return;}
            const response = await fetch(`http://127.0.0.1:8000/user/${userId}/liked-recipes`);
            if (!response.ok) {
                throw new Error(`Failed to fetch liked recipes: ${response.statusText}`);
            }
            const likedRecipes = await response.json();
            if (Array.isArray(likedRecipes) && likedRecipes.some(r => r.id === recipeId)) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
            const likesResponse = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`);
            if (likesResponse.ok) {
                const data = await likesResponse.json();
                setLikes(data.likes);
            }
        } catch (error) {
            console.error("Error fetching initial like status:", error);
        }
    };

    fetchLikeStatus();
}, [recipeId, userId]);

  const handleLikeClick = async () => {
    if (isNaN(userId)) {
        alert("Please log in to like recipes.");
        return;
    }
    try {
        const url = isLiked 
            ? `http://127.0.0.1:8000/recipes/${recipeId}/unlike?user_id=${localStorage.getItem("userId")}`
            : `http://127.0.0.1:8000/recipes/${recipeId}/like?user_id=${localStorage.getItem("userId")}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.detail === "Already liked recipe") {
                alert("Already liked recipe");
            } else {
                throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} recipe: ${errorData.detail}`);
            }
        } else {
            const data = await response.json();
            setLikes(data.likes);
            setIsLiked(!isLiked);
        }
    } catch (error) {
        console.error("Error updating likes:", error);
    }
};



  return (
    <div>
      <Navbar />
      <h1>Recipe Details</h1>
      {recipe ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2>{recipe.name}</h2>
            <button onClick={handleLikeClick}>
              {isLiked ? "Unlike" : "Like"}
            </button>
            <p>Likes: {likes}</p>
            {recipe.user_id == userId && (
              <Link to={`/recipes/${recipeId}/edit`}>
                <button>Edit Recipe</button>
              </Link>)}
          </div>
          
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