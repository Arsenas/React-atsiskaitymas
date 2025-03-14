import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipePage = () => {
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddRecipe = async () => {
    if (!title.trim()) return;

    const newRecipe = {
      id: Date.now().toString(), // Unikalus ID
      title,
      image: imageUrl || "https://via.placeholder.com/400",
    };

    try {
      const response = await axios.post("http://localhost:5000/recipes", newRecipe);

      // Iškart atnaujiname state, kad nereikėtų perkrauti puslapio
      dispatch({ type: "SET_RECIPES", payload: [...state.recipes, response.data] });

      navigate("/");
    } catch (error) {
      console.error("Klaida pridedant receptą:", error);
    }
  };

  return (
    <div className="add-recipe-page">
      <h2 className="page-title">Pridėti naują receptą</h2>
      <div className="add-recipe-form">
        <label className="form-label">Recepto pavadinimas:</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Įveskite recepto pavadinimą..."
        />

        <label className="form-label">Nuotraukos URL (nebūtina):</label>
        <input
          type="text"
          className="form-input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Įveskite nuotraukos URL..."
        />

        <button className="add-recipe-btn" onClick={handleAddRecipe}>
          Pridėti receptą
        </button>
      </div>
    </div>
  );
};

export default AddRecipePage;
