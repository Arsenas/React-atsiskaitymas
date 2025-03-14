import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { state } = useRecipeContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredRecipes = state.recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="home-page">
      <h2>Ieškoti recepto:</h2>
      <div className="search-container"> {/* Šitas container centrinis */}
        <input
          type="text"
          placeholder="Įveskite recepto pavadinimą..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {searchTerm && (
          <ul className="search-dropdown">
            {filteredRecipes.map((recipe) => (
              <li key={recipe.id} onClick={() => handleSelectRecipe(recipe.id)}>
                {recipe.title}
              </li>
            ))}
            {filteredRecipes.length === 0 && <li>Nėra rezultatų</li>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
