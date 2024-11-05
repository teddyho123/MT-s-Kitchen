import './Navbar.css';
import logo from '../Assets/chef icon.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        // Clear user session data
        localStorage.removeItem("userId");
        localStorage.removeItem("authToken"); // If you’re using an auth token
    
        // Redirect to login page
        navigate("/login");
      };
    return (
        <div className="nav-container">
            <div className="logo">
                <a href="/home">
                    <img src={logo} alt="logo" />
                    <p>MT's Kitchen</p>
                </a>
            </div>
            <nav className={`navbar`}>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/user">Profile</a></li>
                    <li><a href="/aboutus">About Us</a></li>
                    <li><a href="/login" onClick={handleSignOut}>Sign Out</a></li>
                </ul>
            </nav>
        </div >
    );
};
export default Navbar;