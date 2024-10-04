// src/App.js

import React, { useState } from 'react';
import Header from './component/navbar/Header';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import EditRecipe from './component/EditRecipe'; 
import NewRecipe from './component/NewRecipe';  
import Home from './pages/Home.js';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe))
    );
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home recipes={recipes} />} />
        <Route path="/newRecipe" element={<NewRecipe addRecipe={addRecipe} />} />
        <Route path="/about/:id" element={<About />} />
        <Route path="/editRecipe" element={<EditRecipe updateRecipe={updateRecipe} />} />
      </Routes>
    </div>
  );
};

export default App;
