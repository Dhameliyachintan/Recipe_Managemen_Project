import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarRatings from "react-star-ratings";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3001/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting the recipe:", error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(lowerCaseTerm) ||
      recipe.instructions.toLowerCase().includes(lowerCaseTerm) ||
      (Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(', ').toLowerCase().includes(lowerCaseTerm)
        : recipe.ingredients.toString().toLowerCase().includes(lowerCaseTerm)) ||
      recipe.cookingTime.toLowerCase().includes(lowerCaseTerm) ||
      (typeof recipe.price === 'number' && recipe.price.toString().includes(lowerCaseTerm))
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-900">
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Recipe List
        </h1>
        <label htmlFor="search" className="text-white mb-2 block">
          Search recipes:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />

        {filteredRecipes.length === 0 ? (
          <p className="text-gray-400 text-center">
            No recipes found. Please try another search!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-semibold text-white mt-2">
                  Title: {recipe.title}
                </h2>

                <StarRatings
                  rating={recipe.rating || 0}
                  starRatedColor="gold"
                  starDimension="20px"
                  starSpacing="2px"
                  numberOfStars={5}
                  name="rating"
                />

                <p className="mt-2 text-gray-500 flex-grow">
                  Instructions: {recipe.instructions}
                </p>
                <p className="text-gray-500 mt-2 font-semibold">
                  Cooking Time: {recipe.cookingTime}
                </p>

                <p className="text-gray-500 mt-2 font-semibold">
                  Ingredients: {recipe.ingredients}
                </p>

                <p className="text-gray-500 mt-2 font-semibold">
                  Price: ${recipe.price}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate("/editrecipe", { state: { recipe } })
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
