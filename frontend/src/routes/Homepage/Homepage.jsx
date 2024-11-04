import Navbar from "../../components/Navbar/Navbar"
import "./Homepage.css"
import paella from '../../components/Assets/paella.png'
import Footer from "../../components/Footer/Footer"
function Homepage() {
    return (
      <main className="home-main">
        <div>
          <Navbar />

          <div className="hero">
            <div className="hero-content">
              <h1>Share your perfect recipes to the world</h1>
              <p>Food is a love language for many. Spread the love by sharing your recipes, or discover a world of flavors in our recipe library to share with those you cherish.</p>
              <button className="btn"><a href="/recipes">Feel Lucky</a></button>
            </div>
          </div>
        </div>

        <div className="trending-container">
          <h1 className="title">Today's Recipe</h1>
          <p className="title">Seafood Paella</p>
        </div>
        <div className="sukiyaki">
          <img src={paella} alt="paella"/>
        </div>
        <Footer/>
      </main>
    )
  }
  
  export default Homepage