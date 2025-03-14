import React from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Showing details for recipe ID: {id}</p>
    </div>
  );
};

export default RecipePage;
