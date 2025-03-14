import { useRecipeContext } from "../context/RecipeContext";
import { useState, useEffect } from "react";
import axios from "axios";

const ReviewsPage = () => {
  const { state, dispatch } = useRecipeContext();
  const [reviewText, setReviewText] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviews, setReviews] = useState(state.reviews || []);

  // Gauname išsaugotus atsiliepimus iš serverio
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews");
        setReviews(response.data);
        dispatch({ type: "SET_REVIEWS", payload: response.data });
      } catch (error) {
        console.error("Klaida gaunant atsiliepimus:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleAddReview = async () => {
    if (!reviewText.trim() || !reviewAuthor.trim()) return;

    const newReview = {
      id: Date.now().toString(),
      text: reviewText,
      author: reviewAuthor,
    };

    try {
      const response = await axios.post("http://localhost:5000/reviews", newReview);
      setReviews([...reviews, response.data]); // Iškart atnaujiname sąrašą be perkrovimo
      dispatch({ type: "ADD_REVIEW", payload: response.data });

      setReviewText("");
      setReviewAuthor("");
    } catch (error) {
      console.error("Klaida pridedant atsiliepimą:", error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
      dispatch({ type: "DELETE_REVIEW", payload: id });
    } catch (error) {
      console.error("Klaida šalinant atsiliepimą:", error);
    }
  };

  return (
    <div className="reviews-page">
      <h2 className="page-title">Atsiliepimai</h2>
  
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-content">
                <span className="review-author"><strong>{review.author}:</strong></span>
                <span className="review-text">{review.text}</span>
              </div>
              <button className="delete-review-btn" onClick={() => handleDeleteReview(review.id)}>X</button>
            </div>
          ))
        ) : (
          <p className="no-reviews">Kol kas nėra atsiliepimų.</p>
        )}
      </div>
  
      <div className="add-review">
        <input
          type="text"
          className="review-author-input"
          value={reviewAuthor}
          onChange={(e) => setReviewAuthor(e.target.value)}
          placeholder="Jūsų vardas..."
        />
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
