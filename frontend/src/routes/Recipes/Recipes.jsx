import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
// import DishFilter from "./Filter/DishFilter"
import "./Recipes.css"
import BeefChowFun from "../../components/Assets/BeefChowFun.jpg"


function Recipes() {
    return (
      <>
        <div className="home-main">
          <Navbar />

          <h1>Recipes</h1>

          <div className='button-group'>
            <button type='meat & poultry' className="btn">Meat & Poultry</button>
            <button type='fish & seafood' className="btn">Fish & Seafood</button>
            <button type='tofu & dairy' className="btn">Tofu & Dairy</button>
            <button type='fruits & vegetables' className="btn">Fruits & Vegetables</button>
            <button type='rice, pasta, noodles' className="btn">Rice & Pasta & Noodles</button>
          </div>

          <div className="card-grid">

            <div className='card'>
              <img src={BeefChowFun} alt="Dish"/>
              <h3>Beef Chow Fun</h3>
              <p>Prep Time: 20mins</p>
              <p>Total Time: 50mins</p>
              <span>❤️</span>
            </div>

            <div className='card'>
              <img src={BeefChowFun} alt="Dish"/>
              <h3>Beef Chow Fun</h3>
              <p>Prep Time: 20mins</p>
              <p>Total Time: 50mins</p>
              <span>❤️</span>
            </div>

            <div className='card'>
              <img src={BeefChowFun} alt="Dish"/>
              <h3>Beef Chow Fun</h3>
              <p>Prep Time: 20mins</p>
              <p>Total Time: 50mins</p>
              <span>❤️</span>
            </div>

            <div className='card'>
              <img src={BeefChowFun} alt="Dish"/>
              <h3>Beef Chow Fun</h3>
              <p>Prep Time: 20mins</p>
              <p>Total Time: 50mins</p>
              <span>❤️</span>
            </div>

            <div className='card'>
              <img src={BeefChowFun} alt="Dish"/>
              <h3>Beef Chow Fun</h3>
              <p>Prep Time: 20mins</p>
              <p>Total Time: 50mins</p>
              <span>❤️</span>
            </div>

            <div className='card'>
              <img src={BeefChowFun} alt="Dish"/>
              <h3>Beef Chow Fun</h3>
              <p>Prep Time: 20mins</p>
              <p>Total Time: 50mins</p>
              <span>❤️</span>
            </div>

          </div>

        



          <Footer/>
        </div>
      </>
    )
  }
  
  export default Recipes