import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRecipePage = () => {
  const { id } = useParams();
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();

  const recipe = state.recipes.find((r) => r.id === id);

  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [image, setImage] = useState(recipe?.image || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return alert("Pavadinimas ir aprašymas negali būti tušti!");

    const updatedRecipe = { id, title, description, image };

    try {
      await axios.put(`http://localhost:5000/recipes/${id}`, updatedRecipe);
      dispatch({ type: "EDIT_RECIPE", payload: updatedRecipe });
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Klaida atnaujinant receptą:", error);
    }
  };

  if (!recipe) {
    return <p className="error-text">Receptas nerastas...</p>;
  }

  return (
    <div className="edit-recipe-page">
      <h2>Redaguoti receptą</h2>
      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <label>Pavadinimas:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Aprašymas:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Nuotraukos URL:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit" className="save-btn">Išsaugoti pakeitimus</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
