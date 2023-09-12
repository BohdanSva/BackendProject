import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { setData, selectData, setResetPropertySlice, setUnits, selectUnits } from "../../../features/property/propertySlice";
import '../user.css';
import { addCommas, addPercent, imperialToMetric, metricToImperial } from "../../../utils/formatting";

const MyDeals = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectData);
  const units = useSelector(selectUnits);

  // Functions
  const getData = async () => {
    const dataURL = `http://localhost:3001/user/property`;
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
  }, []);

  const addProperty = () => {
    navigate('/user/property/addproperty');
  }

  const editProperty = (e: any) => {
    const editedId = e.target.id;
    navigate(`/user/property/${editedId}`);
  }

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
    const filteredResult = filterData(searchValue); // THIS MUST BE EQUAL TO DATA IF SV=""!
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

  if (data.length === 0) { // If there are no properties in the database for the user ID
    return (
    <>
    <div className="user">
    <div className="container">
      <h1> Transactions Portal </h1>
      <div className="row">
        <div className="col mb-5">
          <h2 className="title"> You have no properties in your portfolio </h2>
          <button onClick={addProperty} className="btn btn-outline-primary mt-5"> Add property </button>
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
      <h1> Property Portal </h1>

      <div className="row">
        <div className="col-md col-sm-5 mb-4">
          <h2 className="title"> Your properties </h2>
          <p>Properties found: {filteredData.length}</p>        
        </div>
        <div className="col-md-3 col-sm-3 mb-md-4">
          <h2 className="title"> Search </h2>
          <div className="input-group mb-md-3">
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

        <div className="col mb-md-5">
        </div>

        <div className="col-md-1 col-sm-2 mb-5" id="measurement_system">
          <label className="form-label">Show in</label>
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
        <thead>
          <tr>
            <th scope="col"></th>
            <th className="w-25" scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Asset class</th>
            <th scope="col">Area ({units} net)</th>
            <th scope="col">Price</th>
            <th scope="col">Price / {units}</th>
            <th scope="col">NIY</th>
            <th scope="col">Development</th>
            <th scope="col">More options</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, sortId:number) => { 
            return (

            <tr key={item.id}>
              <td scope="row">{sortId+1}</td>
              <td>
                {item.name ? item.name+"," : ""} {item.street}, {item.postcode}
              </td>
              <td>
                {item.city}
              </td>
              <td>
                {item.assetClass}
              </td>
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
              <td>
                <button id={item.id} onClick={editProperty} className="btn btn-outline-warning">View details</button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>

      <button onClick={addProperty} className="btn btn-outline-primary mt-5"> Add new property </button>

    </div>

    </div>
    </>
  )
}

export default MyDeals;