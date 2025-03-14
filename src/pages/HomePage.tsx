import React, { useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

const HomePage = () => {
  const { state, dispatch } = useRecipeContext();

  useEffect(() => {
    console.log("Recipes from context:", state.recipes);
  }, [state.recipes]);

  return (
    <div>
      <h1>Welcome to Recipe Finder</h1>
      <p>Search for your favorite recipes!</p>

      <h2>Available Recipes</h2>
      <ul>
        {state.recipes.length > 0 ? (
          state.recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} width="150" />
            </li>
          ))
        ) : (
          <p>Loading recipes...</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;