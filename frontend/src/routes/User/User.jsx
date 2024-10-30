import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import paella from '../../components/Assets/paella.png'
import ramen from '../../components/Assets/ramen.png'
import sukiyaki from '../../components/Assets/sukiyaki.png'
import takoyaki from '../../components/Assets/takoyaki.png'
import "./User.css"
function User() {
    return (
      <div className="home-main">
        <Navbar />
        <div className="profile">
          <div className="profile-col">
            <h2>Profile</h2>
            <div className="h3-with-icon">
              <h3>Username</h3>
              <span className="edit-icon">✏️</span>
            </div>
            <p>Teddy_Ho</p>

            <div className="h3-with-icon">
              <h3>Password</h3>
              <span className="edit-icon">✏️</span>
            </div>
            <p>12345678</p>

            <div className="h3-with-icon">
              <h3>Email Address</h3>
              <span className="edit-icon">✏️</span>
            </div>
            <p>teddyho@gmail.com</p>

            <div className="h3-with-icon">
              <h3>About myself</h3>
              <span className="edit-icon">✏️</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div className="profile-col">
            <h2>
              Your Recipes <a href="#" className="new-recipe-button">Add a recipe</a>
            </h2>
            <div className="recipe-container">
              <div className="h3-with-icon">
                <h3>Seafood Paella</h3>
                <span className="edit-icon">✏️❌</span>
              </div>
              <img src={paella} alt="paella"/>
            </div>
            <div className="recipe-container">
              <div className="h3-with-icon">
                <h3>Chashu Ramen</h3>
                <span className="edit-icon">✏️❌</span>
              </div>
              <img src={ramen} alt="ramen"/>
            </div>
            <div className="recipe-container">
              <div className="h3-with-icon">
                <h3>Takoyaki</h3>
                <span className="edit-icon">✏️❌</span>
              </div>
              <img src={takoyaki} alt="takoyaki"/>
            </div>
          </div>

          <div className="profile-col">
            <h2>
              Saved/Liked Recipes
            </h2>
            <div className="recipe-container">
              <div className="h3-with-icon">
                <h3>Sukiyaki</h3>
                <span className="edit-icon">❌</span>
              </div>
              <img src={sukiyaki} alt="sukiyaki"/>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    )
  }
  
  export default User