// Node modules
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBlogPosts } from './features/blog/blogSlice';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import pages
import Landing from './components/general/Landing';
import Register from './components/account/Register';
import Registered from './components/account/Registered';
import Login from './components/account/Login';
import Protected from "./components/account/Protected";
import Navbar from "./components/general/Navbar";

import AdminMenu from "./components/admin/menu/AdminMenu";
import UserManagement from "./components/admin/users/UserManagement";
import PropertyManagement from "./components/admin/property/PropertyManagement";
import InvestorManagement from "./components/admin/investors/InvestorManagement";
import ContactManagement from "./components/admin/contacts/ContactManagement";
import BlogManagement from './components/admin/blog/BlogManagement';
import EditBlogPost from "./components/admin/blog/EditBlogPost";

import Unauthorized from "./components/account/Unauthorized";
import NotFound from "./components/general/NotFound";
import Blog from './components/blog/Blog';
import BlogPost from './components/blog/BlogPost';

import UserMenu from "./components/user/menu/UserMenu";
import UserDeals from "./components/user/property/MyDeals";
import AddProperty from "./components/user/property/AddProperty";
import DetailedView from "./components/user/property/DetailedView";
import UserInvestors from "./components/user/investors/MyInvestors";
import AddInvestor from "./components/user/investors/AddInvestor";
import DetailedInvestor from "./components/user/investors/DetailedView";
import UserContacts from "./components/user/contacts/MyContacts";
import AddContact from "./components/user/contacts/AddContact";
import ContactsFromExcel from "./components/user/contacts/ImportExcel";
import DetailedContact from "./components/user/contacts/DetailedView";

function App() {
  // Hooks definitions
  const dispatch = useDispatch();

  // Functions
  // Without getBlog initiated at this level, the blogSlug would not work and blog posts could not be shown after clicked on
  const getBlog = async () => {
    const blogURL = `http://localhost:3001/blog`;
    try {
      const {data} = await axios.get(blogURL);
      dispatch(setBlogPosts(data.results)); // Data received from Axios is saved in the store and ready to be mapped over
    }
    catch (error) {console.log(error);}
  }
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>

    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/registered" element={<Registered />} />
        <Route path="/account/login" element={<Login />} />

        <Route element={<Protected allowedRoles={["admin"]} />}>
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/property" element={<PropertyManagement />} />
          <Route path="/admin/investors" element={<InvestorManagement />} />
          <Route path="/admin/contacts" element={<ContactManagement />} />
          <Route path="/admin/blog" element={<BlogManagement />} />
          <Route path="/admin/blog/:blogSlug" element={<EditBlogPost/>} />
        </Route>
        <Route element={<Protected allowedRoles={["user"]} />}>
          <Route path="/user/menu" element={<UserMenu />} />
          <Route path="/user/property/mydeals" element={<UserDeals />} />
          <Route path="/user/property/addproperty" element={<AddProperty />} />
          <Route path="/user/property/:propertySlug" element={<DetailedView/>} />
          <Route path="/user/investors/myinvestors" element={<UserInvestors />} />
          <Route path="/user/investors/addinvestor" element={<AddInvestor />} />
          <Route path="/user/investors/:investorSlug" element={<DetailedInvestor/>} />
          <Route path="/user/contacts/mycontacts" element={<UserContacts />} />
          <Route path="/user/contacts/addcontact" element={<AddContact />} />
          <Route path="/user/contacts/importexcel" element={<ContactsFromExcel />} />
          <Route path="/user/contacts/:contactSlug" element={<DetailedContact/>} />
        </Route>
        
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogSlug" element={<BlogPost/>} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

    </>
  );
}

export default App
