import { useRecipeContext } from "../context/RecipeContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is always a string
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();
  const recipe = state.recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p className="error-text">Receptas nerastas...</p>;
  }

  const handleAddToFavorites = () => {
    if (!recipe || state.favorites.some((fav) => fav.id === recipe.id)) return; // Avoid duplicate favorites
    dispatch({ type: "ADD_TO_FAVORITES", payload: recipe });
  };

  const handleDeleteRecipe = async () => {
    if (!recipe || !recipe.id) return;

    const confirmDelete = window.confirm("Ar tikrai norite pašalinti šį receptą?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/recipes/${recipe.id}`);
      dispatch({ type: "DELETE_RECIPE", payload: recipe.id });
      navigate("/");
    } catch (error) {
      console.error("Klaida šalinant receptą:", error);
    }
  };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>
      <div className="recipe-content">
        <img
          src={recipe.image || "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg"}
          alt={recipe.title}
          className="recipe-image"
        />
        <div className="recipe-details">
          <p className="recipe-description">{recipe.description || "Aprašymas nepateiktas."}</p>
          <div className="button-group">
            <button className="favorite-btn" onClick={handleAddToFavorites}>Pridėti prie mėgstamiausių</button>
            <Link to={`/edit-recipe/${recipe.id}`} className="edit-btn">Redaguoti receptą</Link>
            <button className="delete-btn" onClick={handleDeleteRecipe}>Pašalinti receptą</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
