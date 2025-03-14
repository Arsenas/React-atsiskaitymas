import { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

// Recepto duomenų tipas
interface Recipe {
  id: string;
  title: string;
  image?: string;
}

// Atsiliepimo duomenų tipas
interface Review {
  id: string;
  text: string;
  author: string;
}

// Konteksto būsenos tipas
interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
  reviews: Review[]; 
}

// Veiksmų tipai
type RecipeAction =
  | { type: "SET_RECIPES"; payload: Recipe[] }
  | { type: "ADD_TO_FAVORITES"; payload: Recipe }
  | { type: "ADD_REVIEW"; payload: Review }
  | { type: "DELETE_REVIEW"; payload: string }
  | { type: "SET_REVIEWS"; payload: Review[] } 
  | { type: "EDIT_RECIPE"; payload: { id: string; title: string; image?: string } }
  | { type: "DELETE_RECIPE"; payload: string };


// Sukuriame receptų kontekstą su numatytomis reikšmėmis
const RecipeContext = createContext<{ state: RecipeState; dispatch: React.Dispatch<RecipeAction> } | null>(null);

// Pradinė būsena
const initialState: RecipeState = {
  recipes: [],
  favorites: [],
  reviews: [], 
};

// Reducer funkcija
const recipeReducer = (state: RecipeState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case "SET_RECIPES":
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
  return { ...state, reviews: action.payload };

      case "DELETE_REVIEW":
  return {
    ...state,
    reviews: state.reviews.filter((review) => review.id !== action.payload),
  };
    default:
      return state;
  }
};


// Konteksto tiekėjas
const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
      .then((response) => dispatch({ type: "SET_RECIPES", payload: response.data }))
      .catch((error) => console.error("Klaida gaunant receptus", error));
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
