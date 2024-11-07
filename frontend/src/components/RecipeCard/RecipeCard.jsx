import { Link } from "react-router-dom";
import "./RecipeCard.css";
import RecipeLikeButton from "../../routes/RecipeDetail/RecipesLikeButton.jsx";
import defaultimage from '../../components/Assets/default-image.jpg';

function RecipeCard({ recipe }) {


    // Prevent navigation if it's the like button
    const handleLinkClick = (event) => {
        if (event.target.closest(".card-button")) {
            event.preventDefault(); 
        }
    };

    return (
    <Link to={`/recipes/${recipe.id}`} className="card" onClick={handleLinkClick}>
      <div className="card-image" style={{ backgroundImage: `url(${recipe.img || defaultimage})` }}>
      <RecipeLikeButton className="card-button" recipeId={recipe.id} />
      </div>
      <div className="card-info">
        <h3>{recipe.name}</h3>
        <p>Prep Time: {recipe.prep} mins</p>
        <p>Total Time: {recipe.total} mins</p>
      </div>
    </Link>
  );
}

export default RecipeCard;