import { useLocation, Navigate } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import UserNavbar from "../user/UserNavbar";

const Navbar = () => {
    // Definitions
    const location = useLocation();
    const hideNavbarLocations = [ // Specify the locations where the navbar isn't displayed
        "/", "/unauthorized",
        "/account/register","/account/registered", "/account/login", 
        "/user/property/addproperty", 
        "/user/investors/addinvestor",
        "/user/contacts/addcontact",
    ]
    const type = localStorage.getItem("type");

    // Don't show Navbar in locations stated in the hideNavbarLocations array
    if (hideNavbarLocations.includes(location.pathname)) {
        return null
    }

    if (type === null || type.length === 0) { // If the user never logged in, so there's no type in localStorage
        return <Navigate to="/unauthorized"/>
    }

    if (type === "user") { // Show user navbar
        return <UserNavbar/>
    }

    if (type === "admin") { // Show admin navbar
        return <AdminNavbar/>
    }
}

export default Navbar;
