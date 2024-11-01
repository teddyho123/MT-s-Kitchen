import Navbar from "../../components/Navbar/Navbar"
import "./Homepage.css"
import sukiyaki from '../../components/Assets/sukiyaki.png'
import paella from '../../components/Assets/paella.png'
import Footer from "../../components/Footer/Footer"
function Homepage() {
    return (
      <main className="home-main">
        <div>
          <Navbar />
          <h1 className="title">Welcome to MT's Kitchen!</h1>
          <div className="sukiyaki">
            <img src={sukiyaki} alt="sukiyaki"/>
          </div>
          <h1 className="title2">Find the perfect recipe for you</h1>
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