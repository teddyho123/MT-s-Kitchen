import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import "./Aboutus.css"

function Aboutus() {
    return (
      <div className="home-main">

        <Navbar />

        <div className="about">

          <div className="about-col">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
            <li>contact@MTsKitchen.com</li>
            <li>+1 123-456-7890</li>
            <li>1234 Houston Rd, Hostuon <br/> TX 00000, US</li>
          </div> 

          <div className="about-col">
            <form>
              <label>Your Name</label>
              <input type="text" name='name' placeholder='Enter Your Name' required/>
              <label>Phone Number</label>
              <input type="tel" name='phone' placeholder='Enter Your Phone Number' required/>
              <label>Write your messages here</label>
              <textarea name='message' row="6" placeholder='Enter Your Message' required/>
              <button type='sumbit' className="btn"/>
            </form>
            {/* <span>sending</span> */}

          </div>
        </div> 

        <Footer/>
        
      </div>
    )
  }
  
  export default Aboutus