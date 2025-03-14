import { useRecipeContext } from "../context/RecipeContext";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const { state } = useRecipeContext();
  const recipe = state.recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p className="error-text">Receptas nerastas...</p>;
  }

  return (
    <div className="recipe-page">
      <h2 className="recipe-title">{recipe.title}</h2>
      <img src={recipe.image || "https://via.placeholder.com/300"} alt={recipe.title} className="recipe-image" />
      <p className="recipe-description">Aprašymas: Lorem ipsum dolor sit amet...</p>
    </div>
  );
};

export default RecipePage;
