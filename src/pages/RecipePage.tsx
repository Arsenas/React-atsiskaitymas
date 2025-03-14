import React from "react";
import { useParams, Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";

const RecipePage = () => {
  const { id } = useParams();
  const { state } = useRecipeContext();

  const recipe = state.recipes.find((recipe) => recipe.id === parseInt(id!));

  return (
    <div>
      <h1>{recipe?.title}</h1>
      <img src={recipe?.image} alt={recipe?.title} width="150" />
      <h2>Recipe Details</h2>
      <p>Showing details for recipe ID: {id}</p>
      <Link to={`/edit-recipe/${id}`}>Edit Recipe</Link>
    </div>
  );
};

export default RecipePage;
