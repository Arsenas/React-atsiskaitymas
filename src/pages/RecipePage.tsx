import { useRecipeContext } from "../context/RecipeContext";
import { useParams, Link } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const { state } = useRecipeContext();
  const recipe = state.recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p className="error-text">Receptas nerastas...</p>;
  }

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>
      <div className="recipe-content">
        <img 
          src={recipe.image || "https://via.placeholder.com/400"} 
          alt={recipe.title} 
          className="recipe-image" 
        />
        <div className="recipe-details">
          <p className="recipe-description">
            Aprašymas: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="button-group">
            <button className="favorite-btn">Pridėti į mėgstamiausius</button>
            <Link to={`/edit-recipe/${recipe.id}`} className="edit-btn">✏️ Redaguoti receptą</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
