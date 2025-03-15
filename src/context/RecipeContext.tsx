import { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import axios from "axios";
import type { Recipe } from "../types/Recipe";


// Atsiliepimo duomenų tipas
type Review = {
  id: string;
  recipeId: string; 
  author: string;
  text: string;
  rating: number;
};

// Konteksto būsenos tipas
interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
  reviews: Review[]; 
}

// Veiksmų tipai
type RecipeAction =
  | { type: "SET_RECIPES"; payload: Recipe[] }
  | { type: "SET_FAVORITES"; payload: Recipe[] }
  | { type: "ADD_TO_FAVORITES"; payload: Recipe }
  | { type: "ADD_REVIEW"; payload: Review }
  | { type: "DELETE_REVIEW"; payload: string }
  | { type: "SET_REVIEWS"; payload: Review[] } 
  | { type: "EDIT_RECIPE"; payload: { id: string; title: string; image?: string } }
  | { type: "DELETE_RECIPE"; payload: string };


// Sukuriame receptų kontekstą su numatytomis reikšmėmis
const RecipeContext = createContext<{ state: RecipeState; dispatch: React.Dispatch<RecipeAction> } | null>(null);

// Pradinė būsena
const initialState: { recipes: Recipe[]; favorites: Recipe[]; reviews: Review[] } = {
  recipes: [],
  favorites: [],
  reviews: [],
};


// Reducer funkcija
const recipeReducer = (state: RecipeState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case "SET_RECIPES":
      console.log("Setting Recipes:", action.payload); //Debugging
      return { ...state, recipes: action.payload };
    case "ADD_TO_FAVORITES":
      if (state.favorites.some((recipe) => recipe.id === action.payload.id)) {
        return state; 
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
        favorites: state.favorites.filter((recipe) => recipe.id !== action.payload),
      };
      case "ADD_REVIEW":
  return { ...state, reviews: [...state.reviews, action.payload] };
  case "SET_REVIEWS":
    return { ...state, reviews: action.payload.filter((review) => review.recipeId !== null) };
  

      case "DELETE_REVIEW":
  return {
    ...state,
    reviews: state.reviews.filter((review) => review.id !== action.payload),
  };
  case "EDIT_RECIPE":
    return {
      ...state,
      recipes: state.recipes.map((recipe) =>
        recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe
      ),
    };
    default:
      return state;
  }
};


// Konteksto tiekėjas
const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, reviewsRes, favoritesRes] = await Promise.allSettled([
          axios.get("http://localhost:5000/recipes"),
          axios.get("http://localhost:5000/reviews"),
          axios.get("http://localhost:5000/favorites"),
        ]);
    
        if (recipesRes.status === "fulfilled") {
          dispatch({ type: "SET_RECIPES", payload: recipesRes.value.data });
          console.log("Fetched Recipes:", recipesRes.value.data);
        } else {
          console.error("Failed to fetch recipes:", recipesRes.reason);
        }
    
        if (reviewsRes.status === "fulfilled") {
          dispatch({ type: "SET_REVIEWS", payload: reviewsRes.value.data });
        }
    
        if (favoritesRes.status === "fulfilled") {
          dispatch({ type: "SET_FAVORITES", payload: favoritesRes.value.data });
        } else {
          console.warn("Favorites not found, continuing without it.");
        }
    
      } catch (error) {
        console.error("Klaida gaunant duomenis:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Pagalbinė funkcija, kad būtų lengviau naudoti kontekstą
const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext turi būti naudojamas RecipeProvider viduje");
  }
  return context;
};

// Eksportuojame kontekstą ir tiekėją
export { RecipeContext, RecipeProvider, useRecipeContext };
