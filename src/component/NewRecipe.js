import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function NewRecipe({ addRecipe }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cuisineType, setCuisineType] = useState(""); 
  const [price, setPrice] = useState(""); 

  // error state
  const [titleError, setTitleError] = useState("");
  const [ingredientsError, setIngredientsError] = useState("");
  const [cookingTimeError, setCookingTimeError] = useState("");
  const [instructionsError, setInstructionsError] = useState("");
  const [cuisineTypeError, setCuisineTypeError] = useState(""); 
  const [priceError, setPriceError] = useState(""); 
  const [imageError, setImageError] = useState("");
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(0); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTitleError("");
    setIngredientsError("");
    setCookingTimeError("");
    setInstructionsError("");
    setCuisineTypeError(""); 
    setPriceError(""); 
    setImageError("");

    let hasError = false;

    if (!title) {
      setTitleError("Title is required.");
      hasError = true;
    }
    if (!ingredients) {
      setIngredientsError("Ingredients are required.");
      hasError = true;
    }
    if (!cookingTime) {
      setCookingTimeError("Cooking time is required.");
      hasError = true;
    } 
    // else if (!/^\d+\s*(minutes?|hours?)$/i.test(cookingTime)) { 
    //   setCookingTimeError("Cooking time must be in the format 'XX minutes' or 'XX hours'.");
    //   hasError = true;
    // }
    if (!instructions) {
      setInstructionsError("Instructions are required.");
      hasError = true;
    }
    if (!cuisineType) {
      setCuisineTypeError("Cuisine type is required.");
      hasError = true;
    }
    if (!imageUrl) {
      setImageError("Image URL is required.");
      hasError = true;
    }
    if (!price) {
      setPriceError("Price is required."); 
      hasError = true;
    }

    if (hasError) return;

    const newRecipe = {
      title,
      ingredients,
      cookingTime,
      instructions,
      imageUrl,
      cuisineType,
      price, 
      rating: rating || 0,
    };
    
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        newRecipe
      );

      if (response.status === 201) {
        addRecipe(newRecipe);
        setSuccess(true);
        setTitle("");
        setIngredients("");
        setCookingTime("");
        setInstructions("");
        setImageUrl("");
        setCuisineType("");
        setPrice(""); 
        setRating(0);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Create a New Recipe
        </h1>
        {success && (
          <p className="text-green-500">Recipe created successfully!</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {titleError && <p className="text-red-500">{titleError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Ingredients:
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients (comma-separated)"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {ingredientsError && (
              <p className="text-red-500">{ingredientsError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Cooking Time:
            </label>
            <input
              type="text"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="Enter cooking time (e.g., 30 minutes)"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {cookingTimeError && (
              <p className="text-red-500">{cookingTimeError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Instructions:
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter cooking instructions"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {instructionsError && (
              <p className="text-red-500">{instructionsError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Cuisine Type:
            </label>
            <input
              type="text"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              placeholder="Enter cuisine type"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {cuisineTypeError && (
              <p className="text-red-500">{cuisineTypeError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Price:
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {priceError && <p className="text-red-500">{priceError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Rating:</label>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              starEmptyColor="gray"
              changeRating={setRating}
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
