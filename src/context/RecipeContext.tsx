import { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

// Recepto duomenų tipas
interface Recipe {
  id: string;
  title: string;
  image?: string;
}

// Konteksto būsenos tipas
interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
}

// Veiksmų tipai
type RecipeAction =
  | { type: "SET_RECIPES"; payload: Recipe[] }
  | { type: "ADD_TO_FAVORITES"; payload: Recipe };

// Sukuriame receptų kontekstą su numatytomis reikšmėmis
const RecipeContext = createContext<{ state: RecipeState; dispatch: React.Dispatch<RecipeAction> } | null>(null);

// Pradinė būsena
const initialState: RecipeState = {
  recipes: [],
  favorites: [],
};

// Reducer funkcija
const recipeReducer = (state: RecipeState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case "SET_RECIPES":
      return { ...state, recipes: action.payload };
    case "ADD_TO_FAVORITES":
      return { ...state, favorites: [...state.favorites, action.payload] };
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
