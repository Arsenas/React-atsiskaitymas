import { useRecipeContext } from "../context/RecipeContext";
import { useState } from "react";

const ReviewsPage = () => {
  const { state, dispatch } = useRecipeContext();
  const [reviewText, setReviewText] = useState("");

  const handleAddReview = () => {
    if (reviewText.trim() === "") return;

    const newReview = {
      id: Date.now().toString(), // Generuojamas unikalus ID
      text: reviewText,
    };

    dispatch({ type: "ADD_REVIEW", payload: newReview });
    setReviewText("");
  };

  return (
    <div className="reviews-page">
      <h2 className="page-title">Atsiliepimai</h2>

      <div className="reviews-list">
        {state.reviews.length > 0 ? (
          state.reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="review-text">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">Kol kas nėra atsiliepimų.</p>
        )}
      </div>

      <div className="add-review">
        <textarea
          className="review-input"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Parašykite atsiliepimą..."
        />
        <button className="add-review-btn" onClick={handleAddReview}>
          Pridėti atsiliepimą
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;
