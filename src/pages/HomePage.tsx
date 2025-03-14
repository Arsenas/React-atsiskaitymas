import { useRecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { state } = useRecipeContext();

  return (
    <div className="home-page">
      <h2>Visi receptai</h2>
      <div className="recipe-list">
        {state.recipes.length > 0 ? (
          state.recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image || "https://via.placeholder.com/150"} alt={recipe.title} className="recipe-card-img" />
              <h3 className="recipe-title">{recipe.title}</h3>
              <Link to={`/recipe/${recipe.id}`} className="view-recipe-btn">Peržiūrėti receptą</Link>
            </div>
          ))
        ) : (
          <p className="no-recipes">Receptų kol kas nėra.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
