import React, { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { dispatch } = useRecipeContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) {
      alert("Please enter both title and image URL");
      return;
    }

    try {
      const newRecipe = { title, image };
      const response = await axios.post("http://localhost:5000/recipes", newRecipe);
      
      dispatch({ type: "SET_RECIPES", payload: response.data });

      navigate("/");
    } catch (error) {
      console.error("Error adding recipe", error);
    }
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
