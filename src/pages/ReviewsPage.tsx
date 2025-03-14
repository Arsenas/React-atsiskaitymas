import { useRecipeContext } from "../context/RecipeContext";
import { useState } from "react";
import axios from "axios";

const ReviewsPage = () => {
  const { state, dispatch } = useRecipeContext();
  const [reviewText, setReviewText] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(""); 
  const [rating, setRating] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Pranešimas

  const handleAddReview = async () => {
    if (!reviewText.trim() || !reviewAuthor.trim() || !selectedRecipe || rating === 0) return;

    const newReview = {
      id: Date.now().toString(),
      recipeId: selectedRecipe, // Priskiriame prie recepto
      author: reviewAuthor,
      text: reviewText,
      rating: rating,
    };

    try {
      const response = await axios.post("http://localhost:5000/reviews", newReview);
      dispatch({ type: "ADD_REVIEW", payload: response.data });

      setReviewText("");
      setReviewAuthor("");
      setSelectedRecipe("");
      setRating(0);

      // Rodo pranešimą ir paslepia po 3 sekundžių
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Klaida pridedant atsiliepimą:", error);
    }
  };

  return (
    <div className="reviews-page">
      <h2 className="page-title">Palikite savo atsiliepimą:</h2>

      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "selected" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {showSuccessMessage && <div className="success-message">Sėkmingai palikote atsiliepimą!</div>}

      <select className="review-select" value={selectedRecipe} onChange={(e) => setSelectedRecipe(e.target.value)}>
        <option value="">Pasirinkite receptą...</option>
        {state.recipes.map(recipe => (
          <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
        ))}
      </select>

      <input type="text" className="review-author-input" value={reviewAuthor} onChange={(e) => setReviewAuthor(e.target.value)} placeholder="Jūsų vardas..." />

      <textarea className="review-input" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Parašykite atsiliepimą..." />
      
      <button className="add-review-btn" onClick={handleAddReview}>Pridėti atsiliepimą</button>
    </div>
  );
};

export default ReviewsPage;
