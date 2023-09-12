import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { formatDate, addCommas, addPercent, imperialToMetric, metricToImperial } from "../../../utils/formatting";
import { selectData, selectUnits, setData, setUnits } from "../../../features/property/propertySlice";
import '../admin.css';

const PropertyManagement = () => {
  // Definitions
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const units = useSelector(selectUnits);

  // Functions
  const getData = async () => {
    const dataURL = `http://localhost:3001/admin/property`;
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

  const onUnitsInput = (select:any) => {
    dispatch(setUnits(select.target.value)); 
  }

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
      <h1> Property Management </h1>
      <div className="row">
        <div className="col mb-5">
          <h2 className="title"> You have no properties </h2>
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
      <h1> Property Management </h1>
      
      <div className="row">
        <div className="col mb-4">
          <h2 className="title"> App property base </h2>
          <p>Property count: {filteredData.length}</p>        
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

        <div className="col-1 mb-5">
          <label className="form-label" style={{marginTop: "5em"}}>Show in</label>
          <select onInput={onUnitsInput} className="form-select" aria-label="measurement-units">
            <option value="sqft">ft&sup2; </option>
            <option value="sqm">m&sup2; </option>
          </select>
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
            <th scope="col">Address</th>
            <th scope="col">Postcode</th>
            <th scope="col">City</th>
            <th scope="col">Asset class</th>
            <th scope="col">Area ({units} net)</th>
            <th scope="col">Price</th>
            <th scope="col">Price / {units}</th>
            <th scope="col">NIY</th>
            <th scope="col">Development</th>
            <th scope="col">Property ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Created</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, sortId:number) => { 
            return (
            <tr key={item.id}>
              <td>{sortId+1+currentPage*perPage}</td>
              <td>{item.name ? item.name+"," : ""} {item.street}</td>
              <td>{item.postcode}</td>
              <td>{item.city}</td>
              <td>{item.assetClass}</td>
              <td>
                {(item.units=="sqft" && units=="sqft") ? addCommas(item.areaNet) : (item.units=="sqft" && units=="sqm") ? addCommas(imperialToMetric(item.areaNet)) : (item.units=="sqm" && units=="sqm") ? addCommas(item.areaNet) : (item.units=="sqm" && units=="sqft") ? addCommas(metricToImperial(item.areaNet)) : "error in unit conversion"}
              </td>
              <td>
                {item.ccy} {addCommas(item.price)}
              </td>
              <td>
                {item.ccy} {(item.units=="sqft" && units=="sqft") ? addCommas(Math.round(item.price/item.areaNet)) : (item.units=="sqft" && units=="sqm") ? addCommas(Math.round(item.price/imperialToMetric(item.areaNet))) : (item.units=="sqm" && units=="sqm") ? addCommas(Math.round(item.price/item.areaNet)) : (item.units=="sqm" && units=="sqft") ? addCommas(Math.round(item.price/metricToImperial(item.areaNet))) : "error in unit conversion"}
              </td>
              <td>
                {addPercent(item.passingNoi/item.price)}
              </td>
              <td className="text-center">
                {item.development=="development" ? "yes" :"no"}
              </td>
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

export default PropertyManagement;