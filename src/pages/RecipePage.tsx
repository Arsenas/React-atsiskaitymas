import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import type { Recipe } from "../types/Recipe";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useRecipeContext();
  const navigate = useNavigate();
  const recipe = state.recipes.find((r) => r.id === id);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);


  if (!recipe) {
    return <p className="error-text">Receptas nerastas...</p>;
  }

  const recipeReviews = state.reviews.filter((review) => String(review.recipeId) === String(id));

  const confirmDeleteReview = async () => {
    if (!reviewToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/reviews/${reviewToDelete}`);
      dispatch({ type: "DELETE_REVIEW", payload: reviewToDelete });
      setReviewToDelete(null);
    } catch (error) {
      console.error("Klaida trinant atsiliepimą:", error);
    }
  };

  const handleAddToFavorites = async (recipe: Recipe) => {
    try {
      // Check if the recipe is already in favorites (avoids duplicates)
      const response = await axios.get(`http://localhost:5000/favorites?id=${recipe.id}`);
  
      if (response.data.length > 0) {
        return alert("Šis receptas jau yra mėgstamiausiuose!");
      }
  
      // Add the recipe to the favorites in db.json
      const res = await axios.post("http://localhost:5000/favorites", recipe);
  
      // Update UI by dispatching the new favorite
      dispatch({ type: "ADD_TO_FAVORITES", payload: res.data });
  
      alert("Receptas pridėtas prie mėgstamiausių!");
  
    } catch (error) {
      console.error("Klaida pridedant prie mėgstamiausių:", error);
    }
  };

  const confirmDeleteRecipe = async () => {
    if (!recipeToDelete) return;
  
    try {
      await axios.delete(`http://localhost:5000/recipes/${recipeToDelete}`);
      dispatch({ type: "DELETE_RECIPE", payload: recipeToDelete });
      setRecipeToDelete(null);
      navigate("/");
    } catch (error) {
      console.error("Klaida trinant receptą:", error);
    }
  };

  return (
    <div className="recipe-page">
      <div className="recipe-content">
        <img
          src={recipe.image || "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg"}
          alt={recipe.title}
          className="recipe-image"
        />
        <div className="recipe-header">
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>
        <div className="recipe-details">
          <p className="recipe-description">{recipe.description || "Aprašymas nepateiktas."}</p>

          {/* Atsiliepimų sekcija */}
          <div className="recipe-reviews">
            <h3 className="reviews-title">Atsiliepimai:</h3>
            {recipeReviews.length > 0 ? (
              recipeReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <strong className="review-author">{review.author}</strong> 
                    <div className="review-rating">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                    <button className="delete-review-btn" onClick={() => setReviewToDelete(review.id)}>✖</button>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))
            ) : (
              <p className="no-reviews">Kol kas nėra atsiliepimų.</p>
            )}
          </div>

          {/* Custom Modal langas */}
          {reviewToDelete && (
            <div className="modal-overlay">
              <div className="modal">
                <p className="modal-text">Ar tikrai norite pašalinti šį atsiliepimą?</p>
                <button className="confirm-btn" onClick={confirmDeleteReview}>Taip</button>
                <button className="cancel-btn" onClick={() => setReviewToDelete(null)}>Atšaukti</button>
              </div>
            </div>
          )}

          {/* Custom Modal langas recepto šalinimui */}
          {recipeToDelete && (
            <div className="modal-overlay">
              <div className="modal">
                <p className="modal-text">Ar tikrai norite pašalinti šį receptą?</p>
                <div className="modal-buttons">
                  <button className="confirm-btn" onClick={confirmDeleteRecipe}>Taip</button>
                  <button className="cancel-btn" onClick={() => setRecipeToDelete(null)}>Atšaukti</button>
                </div>
              </div>
            </div>
          )}

          <div className="button-group">
          <button className="favorite-btn" onClick={() => handleAddToFavorites(recipe)}>Pridėti prie mėgstamiausių</button>
            <Link to={`/edit-recipe/${recipe.id}`} className="edit-btn">Redaguoti receptą</Link>
            <button className="delete-btn" onClick={() => setRecipeToDelete(recipe.id)}>Pašalinti receptą</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
