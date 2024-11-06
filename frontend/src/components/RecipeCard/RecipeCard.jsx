import { Link } from "react-router-dom";
import "./RecipeCard.css";
import defaultimage from '../../components/Assets/default-image.jpg';

function RecipeCard({ recipe, onLike }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="card">
      <div className="card-image" style={{ backgroundImage: `url(${recipe.img || defaultimage})` }}>
        {/* Like/Favorite buttons will be added here later */}
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