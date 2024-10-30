import './Navbar.css';
import logo from '../Assets/chef icon.png'

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo">
                <a href="/homepage">
                    <img src={logo} alt="logo" />
                    <p>MT's Kitchen</p>
                </a>
            </div>
            <nav className={`navbar`}>
                <ul>
                    <li><a href="/homepage">Home</a></li>
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/user">User Profile</a></li>
                    <li><a href="/aboutus">About Us</a></li>
                    <li><a href="/">Sign Out</a></li>
                </ul>
            </nav>
        </div >
    );
};
export default Navbar;