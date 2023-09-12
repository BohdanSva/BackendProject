import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { addCommas, formatDate } from "../../../utils/formatting";
import { selectData, setData } from "../../../features/investors/contactSlice";
import '../admin.css';

const ContactManagement = () => {
  // Definitions
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  // Functions
  const getData = async () => {
    const dataURL = `http://localhost:3001/admin/contacts`;
    try {
    const {data} = await axios.get(
      dataURL, { headers : { token:localStorage.getItem("token") } 
    });
    if(data.status === 1) { // If token is valid
      dispatch(setData(data.results)); // Data received from Axios is saved in the store and ready to be mapped over
    }
    } 
    catch (error) {console.log(error);}
  }
  useEffect(() => {
      getData();
      setPages(Math.ceil(data.length / perPage)); // To set pagination on initial render
  }, []);

  // Search
  const [filteredData, setFilteredData] = useState(data);
  const [query, setQuery] = useState(""); // value inputted into the search box
  const [searchValue, setSearchValue] = useState(""); // value submitted on enter
  const onSearchSubmit = (search: any) => {
    search.preventDefault();
    setSearchValue(query);
  }
  const searchParameters = Object.keys(Object.assign({}, ...data)); // Creates an array of the keys used in "data"
  const filterData = (searchValue: any) => { // Filter data by all parameters/keys of the objects/columns in table
    if (searchValue === "") return data;
    return data.filter(item => 
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
  const [perPage, setPerPage] = useState(10); // Items per page
  const [pages, setPages] = useState(0); // No. of pages in total given, if any, the search selection
  const [currentPage, setCurrentPage] = useState(0); // Current page no.
  const onPageClick = (event: any) => {
    let page = event.selected;
    setCurrentPage(page);
  }
  const paginatedData = filteredData.slice(currentPage * perPage, (currentPage + 1) * perPage); // We map over this to display every page

  if (data.length === 0) { // If there are no contacts in the database for the user ID
    return (
    <>
    <div className="admin">
    <div className="container">
      <h1> Contact Management </h1>
      <div className="row">
        <div className="col mb-5">
          <h2 className="title"> You have no contacts </h2>
        </div>
      </div>
    </div>
    </div>
    </>
    )
  }

  return (
    <>
    <div className="user">

    <div className="container">
      <h1> Contact Management </h1>
      
      <div className="row">
        <div className="col mb-4">
          <h2 className="title"> App contact base </h2>
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

        <div className="col mb-5">
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
        
        <table className="table table-hover"> 
        <thead className="text-nowrap">
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Company</th>
            <th scope="col">Job title</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Phone number</th>
            <th scope="col">Location</th>
            <th scope="col">Last contact</th>
            <th scope="col">Contact ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Created</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, sortId:number) => { 
            return (
            <tr key={item.id}>
              <td>{sortId+1+currentPage*perPage}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td className="w-25">{item.company}</td>
              <td>{item.job}</td>
              <td>{item.role}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td className="w-25">{item.city}</td>
              <td className="w-25">{formatDate(item.contactDate)}</td>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{formatDate(item.created)}</td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>

    </div>
    </div>
    </>
  )
}

export default ContactManagement;