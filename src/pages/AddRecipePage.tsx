import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipePage = () => {
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Naujas aprašymo laukas
  const [imageUrl, setImageUrl] = useState("");

  const handleAddRecipe = async () => {
    if (!title.trim()) return;

    const newRecipe = {
      id: Date.now().toString(),
      title,
      description: description.trim() || "Aprašymas nepateiktas. Bet šis receptas vis tiek vertas dėmesio! 🍽️", // Jei nėra aprašymo, naudoja placeholderį
      image: imageUrl || "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg", // Pakeistas numatytasis paveikslėlis
    };

    try {
      const response = await axios.post("http://localhost:5000/recipes", newRecipe);

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

        <label className="form-label">Aprašymas:</label>
        <textarea
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Įveskite recepto aprašymą..."
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
