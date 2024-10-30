import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./Newrecipe.css"
function Newrecipe() {
  

    return (
      <div>
        <Navbar/>
        <div className="home-main">
          <h1>Upload your recipe!</h1>
          <h2>Fill out the form below and share it with the world!</h2>

          <form action="/upload" method="post" encType="multipart/form-data">
            <br />
            <label>Recipe Name <span className="required-star">*</span></label><br />
            <input type="text" name="recipe" placeholder="What is the name of your recipe?" required />
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
            <label>Ingredient <span className="required-star">*</span></label>
              <div>
                <input type="checkbox" id="meat" name="ingredient" value="meat" />
                <label htmlFor="meat">Meat</label><br />
              </div>
              <div>
                <input type="checkbox" id="seafood" name="ingredient" value="seafood" />
                <label htmlFor="seafood">Seafood</label><br />
              </div>
              <div>
                <input type="checkbox" id="dairy" name="ingredient" value="dairy" />
                <label htmlFor="dairy">Dairy</label><br />
              </div>
              <div>
                <input type="checkbox" id="veggies" name="ingredient" value="veggies" />
                <label htmlFor="veggies">Veggies</label><br />
              </div>
              <div>
                <input type="checkbox" id="carbs" name="ingredient" value="carbs" />
                <label htmlFor="carbs">Carbs</label><br />
              </div>
            </div><br />
            
            <label>Quick Description <span className="required-star">*</span></label><br />
            <textarea id="description" name="description" rows="4" cols="40" placeholder="Write a short description" required />
            <br /><br />

            <label>Preperation Time</label><br />
            <input type="text" name="preptime" placeholder="In hours and minutes" />
            <br /><br />

            <label>Total Time <span className="required-star">*</span></label><br />
            <input type="text" name="totaltime" placeholder="In hours and minutes" required />
            <br /><br />

            <label>Upload Pictures <span className="required-star">*</span></label><br />
            <input type="file" id="picture" name="picture" accept="image/*" multiple/>
            <br /><br />

            <label>Step By Step Guide <span className="required-star">*</span></label><br />
            <textarea id="steps" name="steps" rows="4" cols="70" placeholder="Write the full recipe" required />
            
            <br /><br /><br /><br />
            <button type="submit">Submit!</button><br /><br />
          </form>
        </div>
        <Footer/>
      </div>
      
    )
  }
  
  export default Newrecipe