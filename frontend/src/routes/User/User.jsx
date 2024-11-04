import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import paella from '../../components/Assets/paella.png'
import ramen from '../../components/Assets/ramen.png'
import sukiyaki from '../../components/Assets/sukiyaki.png'
import takoyaki from '../../components/Assets/takoyaki.png'
import "./User.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

function User() {
  const {userId} = useParams();
  const [user, setUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Update user info in state when input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Submit updated user info to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          email: user.email,
          about: user.about,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user information.");
      }

      // Display success message on successful update
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 10000);  // Hide message after 10 seconds
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user information. Please try again.");
    }
  };


  return (
    <div className="home-main">
      <Navbar />
      <div className="profile">
        <div className="profile-col">
        <h2>Profile</h2>

          {user ? (
            <form onSubmit={handleSubmit}>

              <h3>Username</h3>
              <input name="username" value={user.username} onChange={handleChange}/>

              <h3>Password</h3>
              <input name="password" type="password" value={user.password} onChange={handleChange}/>

              <h3>Email Address</h3>
              <input name="email" type="email" value={user.email} onChange={handleChange}/>

              <h3>About Myself</h3>
              <textarea name="about" rows="6" value={user.about} onChange={handleChange}/>
            
              <button type="submit" className="btn">Update Profile</button>
              {isUpdated && (
                <p className="success-message">Profile updated successfully!</p>
              )}

            </form>

          ) : (
            <p>Loading User Info</p>
          )}

        </div>

        <div className="profile-col">
          <h2>
            Your Recipes <a href="/newrecipe" className="new-recipe-button">Add a recipe</a>
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