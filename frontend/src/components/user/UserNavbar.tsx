import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import axios from 'axios';
import logoImage from '../../assets/images/navbar_logo.png';

const UserNavbar = () => {
    // Definitions
    const navigate = useNavigate();

    // Functions
    const logOut = async () => {
        const URL = `http://localhost:3001/account/login`;
        try {
          const {data} = await axios.request({
            url: URL,
            method: "delete",
            data: {
                "token": localStorage.getItem("token"),
            },
            });
            console.log(data);
          if (data.status === 1) {
            console.log("Logout successful")
            localStorage.setItem("token","") // Delete the token from local storage
            localStorage.setItem("type","") // Delete the user type from local storage
            navigate('/');
          }
        } 
        catch (error) {console.log(error);}
    }

    // const logOut = async () => {
    //     localStorage.setItem("token","") // Delete the token from local storage
    //     localStorage.setItem("type","") // Delete the user type from local storage
    //     navigate('/');
    // }

    return ( 
    <>
    <nav className="navbar bg-body sticky-top" id="navbar">
    <div className="container-fluid" style={{borderBottomStyle: 'groove', borderBottomWidth: `1px`}}>

        <Link className="navbar-brand personalFont me-5" to="/user/menu">
        <img src={logoImage} alt="Logo" width="30" height="26" className="d-inline-block align-text-top me-2"/>
            Transactions Tracker
        </Link>

        <ul className="nav me-auto navbar-nav d-inline-block">            
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/user/menu">Menu</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/user/property/mydeals">My properties</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/user/investors/myinvestors">My investors</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/user/contacts/mycontacts">My rolodex</Link>
            </li>
            <li className="nav-item d-inline-block me-5">
                <Link className="nav-link" to="/blog">Blog</Link>
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
 
export default UserNavbar;