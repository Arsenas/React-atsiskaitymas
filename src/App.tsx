import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import ReviewsPage from "./pages/ReviewsPage";
import AddRecipePage from "./pages/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import Navbar from "./components/Navbar";
import "./styles/main.scss"; // Importuojam stilius

const App = () => {
  return (
    <div className="app-container"> {/* Pagrindinis puslapio konteineris */}
      <Navbar />
      <div className="content"> {/* Vieta, kur atvaizduojami puslapiai */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
