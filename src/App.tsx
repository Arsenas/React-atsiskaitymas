import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import ReviewsPage from "./pages/ReviewsPage";
import AddRecipePage from "./pages/AddRecipePage";
import Navbar from "./components/Navbar";
import EditRecipePage from "./pages/EditRecipePage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
      </Routes>
    </>
  );
};

export default App;


//pridedu komentara, nes projekto pradzioje netycia istryniau secondary brancha, sukuriau dabar i projekto pabaiga kita brancha ir naudoju sita komentara kad butu kazkokie pakitimai tarp main ir secondary