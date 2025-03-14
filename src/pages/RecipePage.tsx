import { useRecipeContext } from "../context/RecipeContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
  const { id } = useParams();
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();
  const recipe = state.recipes.find((r) => r.id === id);

  const handleAddToFavorites = () => {
    if (!recipe) return;
    dispatch({ type: "ADD_TO_FAVORITES", payload: recipe });
  };
  
  <button className="favorite-btn" onClick={handleAddToFavorites}>
   Pridėti prie mėgstamiausių
  </button>
  

  const handleDeleteRecipe = async () => {
    if (!recipe || !recipe.id) return; // Užtikriname, kad `recipe.id` nėra undefined
  
    const confirmDelete = window.confirm("Ar tikrai norite pasalinti si recepta?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:5000/recipes/${recipe.id}`);
      dispatch({ type: "DELETE_RECIPE", payload: recipe.id as string }); // Užtikriname, kad perduodame string
      navigate("/");
    } catch (error) {
      console.error("Klaida salinant recepta:", error);
    }
  };
  

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
            <Link to={`/edit-recipe/${recipe.id}`} className="edit-btn">Redaguoti receptą</Link>
            <button className="delete-btn" onClick={handleDeleteRecipe}>Pašalinti receptą</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
