import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { state } = useRecipeContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Įveskite recepto pavadinimą..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)} 
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          className="search-bar"
        />
        <ul className={`search-dropdown ${isDropdownOpen ? "show" : ""}`}>
  {filteredRecipes.length > 0 ? (
    filteredRecipes.map((recipe) => (
      <li key={recipe.id} onClick={() => handleSelectRecipe(recipe.id)}>
        {recipe.title}
      </li>
    ))
  ) : (
    searchTerm && <li>Nėra rezultatų</li>
  )}
</ul>
      </div>
    </div>
  );
};


export default HomePage;
