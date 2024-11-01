import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./Newrecipe.css"
function Newrecipe() {

  // State for dynamically added ingredients
  const [ingredients, setIngredients] = useState([{ingredient: "", measurement: "", unit: ""}]);
  const addIngredient = () => {
    setIngredients([...ingredients, {ingredient: "", measurement: "", unit: ""}]);
  };
  // Function to handle input changes for ingredients
  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index].ingredient = event.target.value;
    setIngredients(values);
  };
  // Function to handle unit selection changes
  const handleUnitChange = (index, event) => {
    const values = [...ingredients];
    values[index].unit = event.target.value;
    setIngredients(values);
  };
  // Function to handle input changes for ingredients
  const handleMeasurementChange = (index, event) => {
    const values = [...ingredients];
    values[index].measurement = event.target.value;
    setIngredients(values);
  };
  // Function to handle deleting an ingredient input field
  const removeIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1); // Remove the ingredient at the given index
    setIngredients(values);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const recipeData = {
      name: formData.get("name"),
      course: Array.from(formData.getAll("course")),
      category: Array.from(formData.getAll("category")),
      portion: formData.get("portion"),
      ingredients: ingredients,
      description: formData.get("description"),
      prep: parseFloat(formData.get("prep")),
      total: parseFloat(formData.get("total")),
      img: formData.get("img") || "No images provided",
      guide: formData.get("guide") || "No steps provided"
  };

    console.log("Form submitted with data: ", recipeData);
    try {
      const response = await fetch("http://127.0.0.1:8000/newrecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Recipe created successfully:", result);
      alert("Recipe created successfully!");
  
      // Optionally, reset the form or redirect the user after successful submission
      event.target.reset();
      setIngredients([{ ingredient: "", measurement: "", unit: "" }]); // Reset ingredients
    } catch (error) {
      console.error("Error uploading recipe:", error);
      alert("Failed to create the recipe. Please try again.");
    }
  };
  

    return (
      <div>
        <Navbar/>
        <div className="home-main">
          <h1>Upload your recipe!</h1>
          <h2>Fill out the form below and share it with the world!</h2>

          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <br />
            <label>Recipe Name <span className="required-star">*</span></label><br />
            <input type="text" name="name" placeholder="What is the name of your recipe?" required />
            <br /><br />

            <div>
            <label>Course <span className="required-star">*</span></label>
              <div>
                <input type="checkbox" id="breakfast" name="course" value="breakfast" />
                <label htmlFor="breakfast">Breakfast</label><br />
              </div>
              <div>
                <input type="checkbox" id="brunch" name="course" value="brunch" />
                <label htmlFor="brunch">Brunch</label><br />
              </div>
              <div>
                <input type="checkbox" id="lunch" name="course" value="lunch" />
                <label htmlFor="lunch">Lunch</label><br />
              </div>
              <div>
                <input type="checkbox" id="dinner" name="course" value="dinner" />
                <label htmlFor="dinner">Dinner</label><br />
              </div>
              <div>
                <input type="checkbox" id="dessert" name="course" value="dessert" />
                <label htmlFor="dessert">Dessert</label><br />
              </div>
            </div><br />

            <div>
            <label>Category <span className="required-star">*</span></label>
              <div>
                <input type="checkbox" id="meat" name="category" value="meat" />
                <label htmlFor="meat">Meat</label><br />
              </div>
              <div>
                <input type="checkbox" id="seafood" name="category" value="seafood" />
                <label htmlFor="seafood">Seafood</label><br />
              </div>
              <div>
                <input type="checkbox" id="dairy" name="category" value="dairy" />
                <label htmlFor="dairy">Dairy</label><br />
              </div>
              <div>
                <input type="checkbox" id="veggies" name="category" value="veggies" />
                <label htmlFor="veggies">Veggies</label><br />
              </div>
              <div>
                <input type="checkbox" id="carbs" name="category" value="carbs" />
                <label htmlFor="carbs">Carbs</label><br />
              </div>
            </div><br />

            <label>Recipe Portion <span className="required-star">*</span></label><br />
            <input type="number" name="portion" placeholder="This recipe is for how many people?" required />
            <br /><br />

            <div>
              <label>
                Ingredients <span className="required-star">*</span>
              </label>
              {ingredients.map((ingredient, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <input
                    type="number"
                    step="any"
                    placeholder={`Measurement`}
                    value={ingredient.measurement}
                    onChange={(event) => handleMeasurementChange(index, event)}
                    style={{marginRight: "10px"}}
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(event)=>handleUnitChange(index, event)}
                    >
                    <option value="">Select Unit</option>
                    <option value="grams">Grams</option>
                    <option value="cups">Cups</option>
                    <option value="tablespoons">Tablespoons</option>
                    <option value="teaspoons">Teaspoons</option>
                    <option value="milliliters">Milliliters</option>
                    <option value="liters">Liters</option>
                    <option value="pieces">Pieces</option>
                  </select>
                  <input
                    type="text"
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient.ingredient}
                    onChange={(event) => handleIngredientChange(index, event)}
                    style={{margin: "0px 10px"}}
                  />
                  <button type="button" onClick={() => removeIngredient(index)} className="btn-delete">
                    Delete
                  </button>
                </div>
              ))}
              <button type="button" onClick={addIngredient} className="btn">
                Add another ingredient
              </button>
            </div><br />
            
            <label>Quick Description <span className="required-star">*</span></label><br />
            <textarea id="description" name="description" rows="4" cols="40" placeholder="Write a short description" required />
            <br /><br />

            <label>Preperation Time</label><br />
            <input type="number" step="any" name="prep" placeholder="In hours and minutes" />
            <br /><br />

            <label>Total Time <span className="required-star">*</span></label><br />
            <input type="number" step="any" name="total" placeholder="In hours and minutes" required />
            <br /><br />

            <label>Upload Pictures </label><br />
            <input type="file" id="img" name="img" accept="image/*" multiple/>
            <br /><br />

            <label>Step By Step Guide <span className="required-star">*</span></label><br />
            <textarea id="guide" name="guide" rows="4" cols="70" placeholder="Write the full recipe" required />
            
            <br /><br /><br /><br />
            <button type="submit">Submit!</button><br /><br />
          </form>
        </div>
        <Footer/>
      </div>
      
    )
  }
  
  export default Newrecipe