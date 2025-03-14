import { useRecipeContext } from "../context/RecipeContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>(); //  Užtikriname, kad id visada bus string

if (!id) {
  return <p className="error-text">Recepto ID nerastas.</p>; // Jei id neegzistuoja, rodome klaida
}

  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();

  const recipe = state.recipes.find((r) => r.id === id);

  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [image, setImage] = useState(recipe ? recipe.image : "");

  const handleSave = () => {
    dispatch({ type: "EDIT_RECIPE", payload: { id, title, image } });
    navigate(`/recipe/${id}`);
  };

  if (!recipe) {
    return <p className="error-text">Receptas nerastas...</p>;
  }

  return (
    <div className="edit-recipe-page">
      <h2 className="page-title">Redaguoti receptą</h2>
      <form className="edit-form">
        <label className="form-label">Pavadinimas:</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form-label">Paveikslėlio URL:</label>
        <input
          type="text"
          className="form-input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="button" className="save-btn" onClick={handleSave}>
          Išsaugoti pakeitimus
        </button>
      </form>
    </div>
  );
};

export default EditRecipePage;
