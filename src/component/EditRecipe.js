import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditRecipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  const [title, setTitle] = useState(recipe ? recipe.title : '');
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients.join(', ') : '');
  const [cookingTime, setCookingTime] = useState(recipe ? recipe.cookingTime : '');
  const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');
  const [imageUrl, setImageUrl] = useState(recipe ? recipe.imageUrl : '');
  const [price, setPrice] = useState(recipe ? recipe.price : '');
  const [rating, setRating] = useState(recipe ? recipe.rating : 0); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...recipe,
      title,
      ingredients: ingredients.split(',').map(ing => ing.trim()),
      cookingTime,
      instructions,
      imageUrl,
      price: parseFloat(price) || 0,
      rating: parseFloat(rating) || 0, 
    };

    try {
      await fetch(`http://localhost:3001/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      navigate('/');
    } catch (error) {
      console.error('Error updating the recipe:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Edit Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter recipe title"
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients (comma-separated)"
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Cooking Time</label>
            <input
              type="text"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="Enter cooking time"
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter cooking instructions"
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter rating (0-5)"
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
