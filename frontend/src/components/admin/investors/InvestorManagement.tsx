import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { addCommas, formatDate } from "../../../utils/formatting";
import { selectData, setData } from "../../../features/investors/investorSlice";
import '../admin.css';

const InvestorManagement = () => {
  // Definitions
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  // Functions
  const getData = async () => {
    const dataURL = `http://localhost:3001/admin/investors`;
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
      <h1> Investor Management </h1>
      <div className="row">
        <div className="col mb-5">
          <h2 className="title"> You have no investors </h2>
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
      <h1> Investor Management </h1>
      
      <div className="row">
        <div className="col mb-4">
          <h2 className="title"> App investor base </h2>
          <p>Investor count: {filteredData.length}</p>        
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
            <th scope="col">Investor name</th>
            <th scope="col">Allocation</th>
            <th scope="col">Asset class</th>
            <th scope="col">Development</th>
            <th scope="col">Geography</th>
            <th scope="col">Yield target</th>
            <th scope="col">Min size</th>
            <th scope="col">Max size</th>
            <th scope="col">Min WALB</th>
            <th scope="col">Max WALB</th>
            <th scope="col">Investor ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Created</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, sortId:number) => { 
            return (
            <tr key={item.id}>
              <td scope="row">{sortId+1}</td>
              <td>{item.investorName}</td>
              <td>{item.strategyName}</td>
              <td>{item.assetClass}</td>
              <td className="text-center">{item.development=="development" ? "yes - into" :"no"} {item.futureAssetClass}</td>
              <td>{item.targetGeography}</td>
              <td className="text-center">{item.minYield}%</td>
              <td>{item.ccy} {addCommas(item.minSize/1000000)}m</td>
              <td>{item.ccy} {addCommas(item.maxSize/1000000)}m</td>
              <td className="text-center">{item.minWalb} years</td>
              <td className="text-center">{item.maxWalb} years</td>
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

export default InvestorManagement;