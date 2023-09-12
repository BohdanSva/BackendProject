import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import logoImage from '../../assets/images/navbar_logo.png';

const AdminNavbar = () => {
    // Definitions
    const navigate = useNavigate();

    // Functions
    const logOut = async () => {
        localStorage.setItem("token","") // Delete the token from local storage
        localStorage.setItem("type","") // Delete the user type from local storage
        navigate('/');
    }

    return ( 
    <>
    <nav className="navbar bg-body sticky-top" id="navbar">
    <div className="container-fluid" style={{borderBottomStyle: 'groove', borderBottomWidth: `1px`}}>

        <Link className="navbar-brand personalFont me-5" to="/admin/menu">
        <img src={logoImage} alt="Logo" width="30" height="26" className="d-inline-block align-text-top me-2"/>
            Transactions Tracker
        </Link>

        <ul className="nav me-auto navbar-nav d-inline-block">            
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/admin/menu">Menu</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/admin/users">Users</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/admin/property">Properties</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/admin/investors">Investors</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/admin/contacts">Contacts</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/admin/blog">Blog</Link>
            </li>
        </ul>

        <button onClick={logOut} className="btn" type="button" aria-label="Log out">
        <FaSignOutAlt/> Log out
        </button>

    </div>
    </nav>
    </>    
    );
}
 
export default AdminNavbar;