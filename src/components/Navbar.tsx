import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Recipe Finder</h1>
        <ul className="nav-list">
          <li><Link to="/">Pagrindinis</Link></li>
          <li><Link to="/add-recipe">Pridėti receptą</Link></li>
          <li><Link to="/all-recipes">Visi receptai</Link></li>
          <li><Link to="/favorites">Megstamiausi</Link></li>
          <li><Link to="/reviews">Atsiliepimai</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
