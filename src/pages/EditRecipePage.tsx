import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
import axios from "axios";

const EditRecipePage = () => {
  const { id } = useParams();
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();

  const recipe = state.recipes.find((recipe) => recipe.id === parseInt(id!));

  const [title, setTitle] = useState(recipe?.title || "");
  const [image, setImage] = useState(recipe?.image || "");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setImage(recipe.image);
    }
  }, [recipe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) {
      alert("Please enter both title and image URL");
      return;
    }

    try {
      const updatedRecipe = { title, image };
      const response = await axios.patch(
        `http://localhost:5000/recipes/${id}`,
        updatedRecipe
      );
      dispatch({ type: "SET_RECIPES", payload: response.data });
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Error updating recipe", error);
    }
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
