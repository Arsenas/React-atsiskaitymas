import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { state } = useRecipeContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = state.recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="search-container">
      <h2>Ieškoti recepto:</h2>
      <input
        type="text"
        placeholder="Įveskite recepto pavadinimą..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      </div>

      <h2>Visi receptai</h2>
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image || "https://via.placeholder.com/150"}
                alt={recipe.title}
                className="recipe-card-img"
              />
              <h3 className="recipe-title">{recipe.title}</h3>
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">
                Peržiūrėti receptą
              </Link>
            </div>
          ))
        ) : (
          <p className="no-recipes">Nėra receptų pagal šį pavadinimą.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
