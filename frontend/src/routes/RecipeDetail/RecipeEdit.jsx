import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Newrecipe/Newrecipe.css"; // Assuming styles are shared

function RecipeEdit() {
    const { recipeId } = useParams();
    const navigate = useNavigate();
  
    // State for dynamically added ingredients
    const [ingredients, setIngredients] = useState([{ ingredient: "", measurement: "", unit: "" }]);
  
    // Recipe form data state
    const [formData, setFormData] = useState({
      name: '',
      course: [],
      category: [],
      portion: 1,
      description: '',
      prep: 0,
      total: 0,
      img: '',
      guide: '',
      likes: 0,
      user_id: "0",
    });
  
    // Fetch existing recipe data when component mounts
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`);
          if (!response.ok) throw new Error("Failed to fetch recipe");
          const data = await response.json();
  
          // Set form data and ingredients with fetched recipe data
          setFormData({
            name: data.name,
            course: data.course,
            category: data.category,
            portion: data.portion,
            description: data.description,
            prep: data.prep,
            total: data.total,
            img: data.img || '',
            guide: data.guide,
            likes: data.likes || 0,
            user_id: data.user_id,
          });
          setIngredients(data.ingredients);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }, [recipeId]);
  
    const handleIngredientChange = (index, event) => {
      const values = [...ingredients];
      values[index][event.target.name] = event.target.value;
      setIngredients(values);
    };
  
    const handleAddIngredient = () => {
      setIngredients([...ingredients, { ingredient: "", measurement: "", unit: "" }]);
    };
  
    const handleRemoveIngredient = (index) => {
      const values = [...ingredients];
      values.splice(index, 1);
      setIngredients(values);
    };
  
    const handleChange = (event) => {
      const { name, value, type, checked, files } = event.target;
      if (type === "file") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
      } else if (type === "checkbox") {
        setFormData((prevData) => {
          const updatedArray = checked
            ? [...prevData[name], value]
            : prevData[name].filter((item) => item !== value);
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userId = localStorage.getItem("userId");
  
      const formDataObj = new FormData();
      formDataObj.append("user_id", userId);
      formDataObj.append("name", formData.name);
      formData.course.forEach((item) => formDataObj.append("course", item));
      formData.category.forEach((item) => formDataObj.append("category", item));
      formDataObj.append("portion", formData.portion);
      formDataObj.append("ingredients", JSON.stringify(ingredients));
      formDataObj.append("description", formData.description);
      formDataObj.append("prep", formData.prep);
      formDataObj.append("total", formData.total);
      formDataObj.append("guide", formData.guide);
      formDataObj.append("likes", formData.likes);
      if (formData.img) {
        formDataObj.append("img", formData.img);
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}/edit`, {
          method: "PUT",
          body: formDataObj,
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log("Recipe updated successfully:", result);
        navigate(`/recipes/${recipeId}`);
      } catch (error) {
        console.error("Error updating recipe:", error);
        alert("Failed to update the recipe. Please try again.");
      }
    };
  
    return (
      <div>
        <Navbar />
        <div className="home-main">
          <h1>Edit your recipe</h1>
          <h2>Update the form below to modify your recipe!</h2>
  
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <label>Recipe Name <span className="required-star">*</span></label><br />
            <input type="text" name="name" placeholder="What is the name of your recipe?" required value={formData.name} onChange={handleChange} />
            <br /><br />
  
            {/* Course checkboxes */}
            <label>Course <span className="required-star">*</span></label><br />
            {["breakfast", "brunch", "lunch", "dinner", "dessert"].map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  id={item}
                  name="course"
                  value={item}
                  checked={formData.course.includes(item)}
                  onChange={handleChange}
                />
                <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</label><br />
              </div>
            ))}
            <br />
  
            {/* Category checkboxes */}
            <label>Category <span className="required-star">*</span></label><br />
            {["meat", "seafood", "dairy", "veggies", "carbs"].map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  id={item}
                  name="category"
                  value={item}
                  checked={formData.category.includes(item)}
                  onChange={handleChange}
                />
                <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</label><br />
              </div>
            ))}
            <br />
  
            <label>Recipe Portion <span className="required-star">*</span></label><br />
            <input type="number" name="portion" required value={formData.portion} onChange={handleChange} />
            <br /><br />
  
            {/* Ingredients */}
            <label>Ingredients <span className="required-star">*</span></label>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="number"
                  step="any"
                  name="measurement"
                  placeholder="Measurement"
                  value={ingredient.measurement}
                  onChange={(event) => handleIngredientChange(index, event)}
                />
                <select name="unit" value={ingredient.unit} onChange={(event) => handleIngredientChange(index, event)}>
                  <option value="">Select Unit</option>
                  <option value="grams">Grams</option>
                  <option value="cups">Cups</option>
                  {/* Additional units */}
                </select>
                <input
                  type="text"
                  name="ingredient"
                  placeholder="Ingredient"
                  value={ingredient.ingredient}
                  onChange={(event) => handleIngredientChange(index, event)}
                />
                <button type="button" onClick={() => handleRemoveIngredient(index)}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
            <br /><br />
  
            <label>Quick Description <span className="required-star">*</span></label><br />
            <textarea name="description" required value={formData.description} onChange={handleChange} />
            <br /><br />

            <label>Preperation Time</label><br />
            <input type="number" name="prep" required value={formData.prep} onChange={handleChange}/>
            <br /><br />
  
            <label>Total Time <span className="required-star">*</span></label><br />
            <input type="number" name="total" required value={formData.total} onChange={handleChange} />
            <br /><br />

            <label>Upload Pictures </label><br />
            <input type="file" id="img" name="img" accept="image/*" onChange={handleChange}/>
            <br /><br />

            <label>Step By Step Guide <span className="required-star">*</span></label><br />
            <textarea id="guide" name="guide" rows="4" cols="70" required value={formData.guide} onChange={handleChange}/>
  
            <button type="submit">Update Recipe</button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default RecipeEdit;