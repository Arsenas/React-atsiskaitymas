import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const RecipeContext = createContext<any>(null);

const initialState = {
  recipes: [],
  favorites: [],
  reviews: []
};

const recipeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_RECIPES":
      return { ...state, recipes: action.payload };
    case "ADD_TO_FAVORITES":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((recipe) => recipe.id !== action.payload)
      };
    case "ADD_REVIEW":
      return { ...state, reviews: [...state.reviews, action.payload] };
    default:
      return state;
  }
};

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recipes");
      dispatch({ type: "SET_RECIPES", payload: response.data });
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);