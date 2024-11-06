import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import paella from '../../components/Assets/paella.png';
import sukiyaki from '../../components/Assets/sukiyaki.png';
import "./User.css";
import { useState, useEffect } from "react";

function User() {
  const storedUserId = localStorage.getItem("userId"); // Get the logged-in user ID directly
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  // Fetch user info
  useEffect(() => {
    if (!storedUserId) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${storedUserId}`);
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
  }, [storedUserId]);

  // Fetch user's recipes
  useEffect(() => {
    if (!storedUserId) return;

    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${storedUserId}/recipes`);
        const data = await response.json();
        setUserRecipes(data);
      } catch (error) {
        console.error("Error fetching user's recipes:", error);
      }
    };
    fetchUserRecipes();
  }, [storedUserId]);

  // Fetch user's liked recipes
  useEffect(() => {
    if (!storedUserId) return;

    const fetchLikedRecipes = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/${storedUserId}/liked-recipes`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setLikedRecipes(data);
      } catch (error) {
        console.error("Error fetching liked recipes:", error);
      }
    };
    fetchLikedRecipes();
  }, [storedUserId]);

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
      const response = await fetch(`http://127.0.0.1:8000/user/${storedUserId}`, {
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

      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 10000);  // Hide success message after 10 seconds
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
              <input name="username" value={user.username} onChange={handleChange} />

              <h3>Password</h3>
              <input name="password" type="password" value={user.password} onChange={handleChange} />

              <h3>Email Address</h3>
              <input name="email" type="email" value={user.email} onChange={handleChange} />

              <h3>About Myself</h3>
              <textarea name="about" rows="6" value={user.about} onChange={handleChange} />

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
          <h2>Your Recipes <a href="/newrecipe" className="new-recipe-button">Add a recipe</a></h2>
          {userRecipes.length > 0 ? (
            userRecipes.map((recipe) => (
              <div className="recipe-container" key={recipe.id}>
                <div className="h3-with-icon">
                  <h3>{recipe.name}</h3>
                  <span className="edit-icon">✏️❌</span>
                </div>
                <img src={recipe.image_url || paella} alt={recipe.name} />
              </div>
            ))
          ) : (
            <p>No recipes created yet.</p>
          )}
        </div>

        <div className="profile-col">
          <h2>Saved/Liked Recipes</h2>
          {likedRecipes.length > 0 ? (
            likedRecipes.map((recipe) => (
              <div className="recipe-container" key={recipe.id}>
                <div className="h3-with-icon">
                  <h3>{recipe.name}</h3>
                  <span className="edit-icon">❌</span>
                </div>
                <img src={recipe.image_url || sukiyaki} alt={recipe.name} />
              </div>
            ))
          ) : (
            <p>No liked recipes.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default User;
