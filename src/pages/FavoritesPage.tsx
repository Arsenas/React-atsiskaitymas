import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { state } = useRecipeContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = state.favorites.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="favorites-page">
      <div className="search-container">
      <h2 className="page-title">Ieškoti mėgstamiausio recepto:</h2>
      <input
        type="text"
        placeholder="Įveskite recepto pavadinimą..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      </div>
      <h2 className="page-title">Mėgstamiausi receptai</h2>
      <div className="recipe-list">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-card-img" />
              <h3>{recipe.title}</h3>
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">Peržiūrėti receptą</Link>
            </div>
          ))
        ) : (
          <p className="no-recipes">Nėra mėgstamiausių receptų pagal šį pavadinimą.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;