import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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


  const [formData, setFormData] = useState({
    name: '',
    course: [],
    category: [],
    portion: 1,
    ingredients: [], // default urgency value
    description: '',
    prep: 0,
    total: 0,
    img: '',
    guide: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
  
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the selected file
      }));
    } else if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedArray = checked
          ? [...prevData[name], value] // Add value if checked
          : prevData[name].filter((item) => item !== value); // Remove value if unchecked
        return {
          ...prevData,
          [name]: updatedArray,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("course", JSON.stringify(formData.course));
    formDataObj.append("category", JSON.stringify(formData.category));
    formDataObj.append("portion", formData.portion);
    formDataObj.append("ingredients", JSON.stringify(ingredients));
    formDataObj.append("description", formData.description);
    formDataObj.append("prep", formData.prep);
    formDataObj.append("total", formData.total);
    formDataObj.append("guide", formData.guide);
    if (formData.img) {
      formDataObj.append("img", formData.img); // Add the image file
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/newrecipe', {
        method: "POST",
        body: formDataObj,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Recipe created successfully:", result);
      navigate('./success');
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
            <input type="text" name="name" placeholder="What is the name of your recipe?" required value={formData.name} onChange={handleChange} />
            <br /><br />

            <div>
            <label>Course <span className="required-star">*</span></label>
              <div>
                <input type="checkbox" id="breakfast" name="course" value="breakfast" onChange={handleChange}/>
                <label htmlFor="breakfast">Breakfast</label><br />
              </div>
              <div>
                <input type="checkbox" id="brunch" name="course" value="brunch" onChange={handleChange}/>
                <label htmlFor="brunch">Brunch</label><br />
              </div>
              <div>
                <input type="checkbox" id="lunch" name="course" value="lunch" onChange={handleChange}/>
                <label htmlFor="lunch">Lunch</label><br />
              </div>
              <div>
                <input type="checkbox" id="dinner" name="course" value="dinner" onChange={handleChange}/>
                <label htmlFor="dinner">Dinner</label><br />
              </div>
              <div>
                <input type="checkbox" id="dessert" name="course" value="dessert" onChange={handleChange}/>
                <label htmlFor="dessert">Dessert</label><br />
              </div>
            </div><br />

            <div>
            <label>Category <span className="required-star">*</span></label>
              <div>
                <input type="checkbox" id="meat" name="category" value="meat" onChange={handleChange}/>
                <label htmlFor="meat">Meat</label><br />
              </div>
              <div>
                <input type="checkbox" id="seafood" name="category" value="seafood" onChange={handleChange}/>
                <label htmlFor="seafood">Seafood</label><br />
              </div>
              <div>
                <input type="checkbox" id="dairy" name="category" value="dairy" onChange={handleChange}/>
                <label htmlFor="dairy">Dairy</label><br />
              </div>
              <div>
                <input type="checkbox" id="veggies" name="category" value="veggies" onChange={handleChange}/>
                <label htmlFor="veggies">Veggies</label><br />
              </div>
              <div>
                <input type="checkbox" id="carbs" name="category" value="carbs" onChange={handleChange}/>
                <label htmlFor="carbs">Carbs</label><br />
              </div>
            </div><br />

            <label>Recipe Portion <span className="required-star">*</span></label><br />
            <input type="number" name="portion" placeholder="This recipe is for how many people?" required value={formData.portion} onChange={handleChange}/>
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
            <textarea id="description" name="description" rows="4" cols="40" placeholder="Write a short description" required value={formData.description} onChange={handleChange}/>
            <br /><br />

            <label>Preperation Time</label><br />
            <input type="number" step="any" name="prep" placeholder="In hours and minutes" value={formData.prep} onChange={handleChange}/>
            <br /><br />

            <label>Total Time <span className="required-star">*</span></label><br />
            <input type="number" step="any" name="total" placeholder="In hours and minutes" required value={formData.total} onChange={handleChange}/>
            <br /><br />

            <label>Upload Pictures </label><br />
            <input type="file" id="img" name="img" accept="image/*" onChange={handleChange}/>
            <br /><br />

            <label>Step By Step Guide <span className="required-star">*</span></label><br />
            <textarea id="guide" name="guide" rows="4" cols="70" placeholder="Write the full recipe" required value={formData.guide} onChange={handleChange}/>
            
            <br /><br /><br /><br />
            <button type="submit">Submit!</button><br /><br />
          </form>
        </div>
        <Footer/>
      </div>
      
    )
  }
  
  export default Newrecipe