import { useRecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";

const AllRecipesPage = () => {
  const { state } = useRecipeContext();

  return (
    <div className="all-recipes-page">
      <h2 className="page-title">Visi receptai</h2>
      <div className="recipe-list">
        {state.recipes.length > 0 ? (
          state.recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-card-img" />
              <h3>{recipe.title}</h3>
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

export default AllRecipesPage;
