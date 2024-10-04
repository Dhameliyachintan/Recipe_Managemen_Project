import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function About() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  if (!recipe) return <div className="text-center py-4">No recipe found.</div>;

  const handleEditClick = () => {
    navigate(`/editrecipe/${id}`); 
  };

  return (
    <div className="container px-4 flex">
      <div className="flex justify-center py-8 flex-col mx-auto">
        <div className="text-end">
          <button
            onClick={handleEditClick}
            className="mt-4 mb-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
        <img src="https://via.placeholder.com/600x400" alt="Recipe" className="mb-3" />
        <h1 className="text-2xl font-bold mb-4 text-center">{recipe.title}</h1>
        <p className="text-gray-600 mt-2 text-start">{recipe.instructions}</p>
        <p className="text-gray-500 mt-2 text-sm text-start">
          Cooking Time: {recipe.cookingTime}
        </p>
        <p className="text-gray-500 mt-2 text-sm text-start">
          Ingredients: {recipe.ingredients.join(', ')}
        </p>
      </div>
    </div>
  );
}
