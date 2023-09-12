import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { selectBlogPosts, setBlogPosts } from "../../../features/blog/blogSlice";
import { formatDate } from "../../../utils/formatting";
import axios from "axios";
import AddBlogPost from "./AddBlogPost";
import '../admin.css';

const Admin = () => {
    // Hooks definitions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogPosts = useSelector(selectBlogPosts);

    // Functions
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

    const editBlogPost = (e: any) => {
      const editedId = e.target.id;
      navigate(`/admin/blog/${editedId}`);
    }
    
    // Search
    const [filteredData, setFilteredData] = useState(blogPosts);
    const [query, setQuery] = useState(""); // value inputted into the search box
    const [searchValue, setSearchValue] = useState(""); // value submitted on enter
    const onSearchSubmit = (search: any) => {
      search.preventDefault();
      setSearchValue(query);
    }
    const searchParameters = Object.keys(Object.assign({}, ...blogPosts)); // Creates an array of the keys used in "blogPosts"
    const filterData = (searchValue: any) => { // Filter data by all parameters/keys of the objects/columns in table
      if (searchValue === "") return blogPosts;
      return blogPosts.filter(item => 
        searchParameters.some((parameter) =>
        item[parameter].toString().toLowerCase().includes(searchValue.toLowerCase())))
    }
    useEffect(() => { // After searchValue changes, apply the filter to data
      const filteredResult = filterData(searchValue); 
      setPages(Math.ceil(filteredResult.length / perPage)); // Update the number of pages given current searchValue
      setFilteredData(filteredResult);
      setCurrentPage(0); // Go to first page of results after searchValue changes
    }, [searchValue])

    // Pagination
    const [perPage, setPerPage] = useState(3); // Items per page
    const [pages, setPages] = useState(0); // No. of pages in total given, if any, the search selection
    const [currentPage, setCurrentPage] = useState(0); // Current page no.
    const onPageClick = (event: any) => {
      let page = event.selected;
      setCurrentPage(page);
    }
    const paginatedData = filteredData.slice(currentPage * perPage, (currentPage + 1) * perPage); // We map over this to display every page

    
    if (blogPosts.length === 0) { // If there are no blog posts in the database
        // Pass the getBlog function as a prop to the child component, so it can be used there
        return (
        <>
        <p>You have no blog posts in your blog</p>
        <AddBlogPost getBlog={getBlog}/>
        </>
        )
    }

    return ( 
    <>
    <div className="admin">

        <div className="container">
            <h1> Blog Management </h1>

            <div className="row align-items-start">
              <div className="col mb-4">
                <h2 className="title">Your blog posts</h2>
                <p>Contact count: {filteredData.length}</p>    
              </div>

              <div className="col-3 mb-4">
                <h2 className="title"> Search </h2>
                <div className="input-group mb-3">
                  <form onSubmit={onSearchSubmit} className="d-flex" role="search">
                    <input 
                      type="search" 
                      value={query}
                      onChange={(search) => setQuery(search.target.value)}
                      className="form-control" 
                      aria-label="Search input"
                      aria-describedby="search-input"/>
                  </form>
                </div>        
              </div>

              <div className="col" style={{marginTop: "9.65em"}}>
                  <button className="btn btn-outline-primary"> <Link className="nav-link" to="/blog">View all in blog view</Link> </button>
              </div>
    
            </div>

            <div className="table-responsive">
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pages}
                onPageChange={onPageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
        
            <div className="table-responsive">
                <table className="table table-hover"> 
                    <thead>
                        <tr>
                            <th scope="col">Sort ID</th>
                            <th scope="col" className="col-2">Headline</th>
                            <th scope="col" className="col-2">Article Topic</th>
                            <th scope="col" className="col-5">Text</th>
                            <th scope="col" className="col-2">Article Date</th>
                            <th scope="col" className="col-2">Item ID</th>
                            <th scope="col">More options</th>
                        </tr>
                    </thead>

                    <tbody>
                    {paginatedData.map((item, sortId:number) => { 
                        return (
                        <tr key={item.id}>
                        <td scope="row">{sortId+1+currentPage*perPage}</td>
                        <td>{item.headline}</td>
                        <td>{item.articleTopic}</td>
                        <td>{item.textBlock}</td>
                        <td>{formatDate(item.articleDate)}</td>
                        <td scope="row">{item.id}</td>
                        <td>
                          <button id={item.id} onClick={editBlogPost} className="btn btn-outline-warning">View details</button>               
                        </td>
                        </tr>
                    )})}
                    </tbody>
                </table>
            </div>
        </div>

        <AddBlogPost getBlog={getBlog}/>

    </div>
    </div>
    </>
    );
}
 
export default Admin;
