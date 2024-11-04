import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import RecipeLikeButton from "../RecipeDetail/RecipesLikeButton";
import "./Homepage.css"
import next from '../../components/Assets/next_btn.png'
import back from '../../components/Assets/previous_btn.png'
import paella from '../../components/Assets/paella.png';
import defaultimage from '../../components/Assets/default-image.jpg';

function Homepage() {

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
      <main className="home-main">
      
        <Navbar />

        <div className="hero">
          <div className="hero-content">
            <h1>Share your perfect recipes to the world</h1>
            <p>Food is a love language for many. Spread the love by sharing your recipes, or discover a world of flavors in our recipe library to share with those you cherish.</p>
            <button className="btn"><a href="/recipes">Find a Recipe ⇀</a></button>
            <button className="btn"><a href="/newrecipe">Create a Recipe ⇀</a></button>
          </div>
        </div>

        <h1>Today’s Top Pick</h1>
        <div className="trending">
          <img src={back} alt="" className='back-btn'/>
          <img src={next} alt="" className='next-btn'/>
          <div className="slider">

          <div className="card-grid">
            {Array.isArray(recipes) ? recipes.map((recipe) => (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="card" style={{ backgroundImage: `url(${recipe.img || defaultimage})` }}>
                    {/* <img src={recipe.img || defaultimage} alt={recipe.name} /> */}
                    <div className="card-content">
                    <h3>{recipe.name}</h3>
                    <p>Prep Time: {recipe.prep} mins</p>
                    <p>Total Time: {recipe.total} mins</p>
                    <RecipeLikeButton recipeId={recipe.id} />
                    <span>❤️</span>
                    </div>
                </Link>
            )) : <h1>No Recipes available</h1>}
        </div>


        </div>
        </div>


        <div className="trending-container">
          <h1 className="title">Today's Recipe</h1>
          <p className="title">Seafood Paella</p>
        </div>
        <div className="sukiyaki">
          <img src={paella} alt="paella"/>
        </div>
        <Footer/>
      </main>
    )
  }
  
  export default Homepage