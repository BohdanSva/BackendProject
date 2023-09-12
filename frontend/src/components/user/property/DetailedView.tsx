import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { addCommas, addPercent, formatDate, timeFromToday } from "../../../utils/formatting";
import { selectName, selectStreet, selectCity, selectPostcode, selectUnits, selectPrice, selectAreaNet, selectCurrency,
  selectAreaGross, selectBrokerFee, selectTenure, selectGroundRent, selectUnexpiredLeasehold, selectDealType, selectDevelopment, 
  selectSiteArea, selectAssetClass, selectPassingRent, selectPassingNoi, selectOccupancy, selectLeaseBreak, setResetPropertySlice,
  selectLeaseExpiry, selectFutureAssetClass, selectGdv, selectCapex, selectFutureAreaGross, selectFutureAreaNet, selectFutureRent,
  selectFutureNoi, setUnits, selectOpex, selectFutureOpex, setCurrency, setName, setStreet, setCity, setPostcode, setPrice, 
  setAreaNet, setAreaGross, setSiteArea, setBrokerFee, setTenure, setGroundRent, setUnexpiredLeasehold, setDealType, setDevelopment,
  setAssetClass, setPassingRent, setOpex, setPassingNoi, setOccupancy, setLeaseBreak, setLeaseExpiry, setFutureAssetClass, setGdv,
  setCapex, setFutureAreaGross, setFutureAreaNet, setFutureRent, setFutureOpex, setFutureNoi, setCreated, selectCreated, 
  selectRenderView, setRenderView, setFeeStructure, selectFeeStructure, setImage, selectImage} 
from "../../../features/property/propertySlice";
import ImageUpload from "./ImageUpload";

const DetailedView = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertySlug }: any = useParams(); // propertySlug path configuration
  const renderView = useSelector(selectRenderView);
  const created = useSelector(selectCreated);
  const units = useSelector(selectUnits);
  const currency = useSelector(selectCurrency);
  const name = useSelector(selectName);
  const street = useSelector(selectStreet);
  const city = useSelector(selectCity);
  const postcode = useSelector(selectPostcode);
  const price = useSelector(selectPrice);
  const areaNet = useSelector(selectAreaNet);
  const areaGross = useSelector(selectAreaGross);
  const siteArea = useSelector(selectSiteArea);
  const brokerFee = useSelector(selectBrokerFee);
  const feeStructure = useSelector(selectFeeStructure);
  const tenure = useSelector(selectTenure);
  const groundRent = useSelector(selectGroundRent);
  const leaseholdTerm = useSelector(selectUnexpiredLeasehold);
  const dealType = useSelector(selectDealType);
  const developmentStatus = useSelector(selectDevelopment);
  const assetClass = useSelector(selectAssetClass);
  const passingRent = useSelector(selectPassingRent);
  const passingNoi = useSelector(selectPassingNoi);
  const occupancy = useSelector(selectOccupancy);
  const leaseBreak = useSelector(selectLeaseBreak);
  const leaseExpiry = useSelector(selectLeaseExpiry);
  const futureAssetClass = useSelector(selectFutureAssetClass);
  const gdv = useSelector(selectGdv);
  const capex = useSelector(selectCapex);
  const futureAreaGross = useSelector(selectFutureAreaGross);
  const futureAreaNet = useSelector(selectFutureAreaNet);
  const futureRent = useSelector(selectFutureRent);
  const futureNoi = useSelector(selectFutureNoi);
  const opex = passingNoi - passingRent;
  const futureOpex = futureNoi - futureRent;
  const image = useSelector(selectImage);

  // Functions
  const addCurrency = (num: any) => `${currency} ` + num;
  const capval = addCurrency(addCommas(Math.round(price/areaNet)));
  const buildingEfficiency = addPercent(areaNet/areaGross);
  const brokerFeePercentage = addPercent(brokerFee/100);
  const brokerFeeAmount = addCurrency(addCommas(Math.round(price * (brokerFee/100))));
  const WALB = timeFromToday(leaseBreak);
  const WALT = timeFromToday(leaseExpiry);

  const getData = async () => { // Get only the data for the selected property ID
    const dataURL = `http://localhost:3001/user/property/${propertySlug}`;
    try {
    const {data} = await axios.get(
      dataURL, { headers : { token:localStorage.getItem("token") } 
    });
    if(data.status === 1) { // If token is valid
      dispatch(setCreated(data.results[0].created));
      dispatch(setUnits(data.results[0].units));
      dispatch(setCurrency(data.results[0].ccy));
      dispatch(setName(data.results[0].name));
      dispatch(setStreet(data.results[0].street));
      dispatch(setCity(data.results[0].city));
      dispatch(setPostcode(data.results[0].postcode));
      dispatch(setPrice(data.results[0].price));
      dispatch(setAreaNet(data.results[0].areaNet));
      dispatch(setAreaGross(data.results[0].areaGross));
      dispatch(setSiteArea(data.results[0].siteArea));
      dispatch(setBrokerFee(data.results[0].brokerFee));
      dispatch(setFeeStructure(data.results[0].feeStructure));
      dispatch(setTenure(data.results[0].tenure));
      dispatch(setGroundRent(data.results[0].groundRent));
      dispatch(setUnexpiredLeasehold(data.results[0].leaseholdTerm));
      dispatch(setDealType(data.results[0].dealType));
      dispatch(setDevelopment(data.results[0].development));
      dispatch(setAssetClass(data.results[0].assetClass));
      dispatch(setPassingRent(data.results[0].passingRent));
      dispatch(setOpex(data.results[0].opex));
      dispatch(setPassingNoi(data.results[0].passingNoi));
      dispatch(setOccupancy(data.results[0].occupancy));
      dispatch(setLeaseBreak(data.results[0].leaseBreak));
      dispatch(setLeaseExpiry(data.results[0].leaseExpiry));
      dispatch(setFutureAssetClass(data.results[0].futureAssetClass));
      dispatch(setGdv(data.results[0].gdv));
      dispatch(setCapex(data.results[0].capex));
      dispatch(setFutureAreaGross(data.results[0].futureAreaGross));
      dispatch(setFutureAreaNet(data.results[0].futureAreaNet));
      dispatch(setFutureRent(data.results[0].futureRent));
      dispatch(setFutureOpex(data.results[0].futureOpex));
      dispatch(setFutureNoi(data.results[0].futureNoi));
      dispatch(setImage(data.results[0].image));
    }
    } 
      catch (error) {console.log(error);}
    }
    useEffect(() => {
        getData();
    }, []);

    const backToDashboard = () => { 
      navigate('/user/property/mydeals');
    }

    const onEditClick = () => { // Remove readonly property
      dispatch(setRenderView(+1));
    }
    
    const onNameInput = (keystroke: any) => { // Save change into state
      dispatch(setName(keystroke.target.value))
    }
    const onStreetInput = (keystroke: any) => { // Save change into state
      dispatch(setStreet(keystroke.target.value))
    }
    const onCityInput = (keystroke: any) => { // Save change into state
      dispatch(setCity(keystroke.target.value))
    }
    const onPostcodeInput = (keystroke: any) => { // Save change into state
      dispatch(setPostcode(keystroke.target.value))
    }
    const onAreaGrossInput = (keystroke: any) => { // Save change into state
      dispatch(setAreaGross(keystroke.target.value))
    }
    const onAreaNetInput = (keystroke: any) => { // Save change into state
      dispatch(setAreaNet(keystroke.target.value))
    }
    const onSiteAreaInput = (keystroke: any) => { // Save change into state
      dispatch(setSiteArea(keystroke.target.value))
    }
    const onPriceInput = (keystroke: any) => { // Save change into state
      dispatch(setPrice(Number(keystroke.target.value)))
    }
    const onBrokerFeeInput = (keystroke: any) => { // Save change into state
      dispatch(setBrokerFee(Number(keystroke.target.value)))
    }
    const onFeeStructureInput = (keystroke: any) => {
      dispatch(setFeeStructure(keystroke.target.value))
    }
    const onTenureInput = (select:any) => {
      dispatch(setTenure(select.target.value)); 
    }
    const onGroundRentInput = (select:any) => {
      dispatch(setTenure(select.target.value)); 
    }
    const onLeaseholdTermInput = (select:any) => {
      dispatch(setTenure(select.target.value)); 
    }
    const onDealTypeInput = (select:any) => {
      dispatch(setDealType(select.target.value)); 
    }
    const onDevelopmentInput = (select:any) => {
      dispatch(setDevelopment(select.target.value)); 
    }
    const onAssetClassInput = (select:any) => {
      dispatch(setAssetClass(select.target.value)); 
    }
    const onPassingRentInput = (select:any) => {
      dispatch(setPassingRent(select.target.value)); 
    }
    const onPassingNoiInput = (select:any) => {
      dispatch(setPassingNoi(select.target.value)); 
    }
    const onOccupancyInput = (select:any) => {
      dispatch(setOccupancy(select.target.value)); 
    }
    const onLeaseExpiryInput = (date:any) => {
      const leaseExpiry = new Date(date.target.value);
      dispatch(setLeaseExpiry(leaseExpiry.toISOString()));
    }
    const onLeaseBreakInput = (date:any) => {
      const leaseBreak = new Date(date.target.value);
      dispatch(setLeaseBreak(leaseBreak.toISOString()));
    }
    const onFutureAssetClassInput = (select:any) => {
      dispatch(setFutureAssetClass(select.target.value)); 
    }
    const onFutureRentInput = (select:any) => {
      dispatch(setFutureRent(select.target.value)); 
    }
    const onFutureNoiInput = (select:any) => {
      dispatch(setFutureNoi(select.target.value)); 
    }
    const onGdvInput = (select:any) => {
      dispatch(setGdv(select.target.value)); 
    }
    const onCapexInput = (select:any) => {
      dispatch(setCapex(select.target.value)); 
    }
    const onFutureAreaGrossInput = (select:any) => {
      dispatch(setFutureAreaGross(select.target.value)); 
    }
    const onFutureAreaNetInput = (select:any) => {
      dispatch(setFutureAreaNet(select.target.value)); 
    }

    const onSaveClick = async () => { // Save changes in the database
      dispatch(setRenderView(-1));
      const dataURL = `http://localhost:3001/user/property/${propertySlug}`;
      try {
        const {data} = await axios.request({
          url: dataURL,
          method: "patch",
          headers: {
            "token": localStorage.getItem("token"),
          },
          data: {
            "id"   : `${propertySlug}`,
            "name" : `${name}`,
            "street" : `${street}`,
            "city" : `${city}`,
            "postcode" : `${postcode}`,
            "price" : `${price}`,
            "ccy" : `${currency}`,
            "tenure" : `${tenure}`,
            "groundRent" : `${groundRent}`,
            "leaseholdTerm" : `${leaseholdTerm}`,
            "dealType" : `${dealType}`,
            "development" : `${developmentStatus}`,
            "gdv" : `${gdv}`,
            "capex" : `${capex}`,
            "units" : `${units}`,
            "siteArea" : `${siteArea}`,
            "areaGross" : `${areaGross}`,
            "areaNet" : `${areaNet}`,
            "futureAreaGross" : `${futureAreaGross}`,
            "futureAreaNet" : `${futureAreaNet}`,
            "passingRent" : `${passingRent}`,
            "opex" : `${opex}`,
            "passingNoi" : `${passingNoi}`,
            "futureRent" : `${futureRent}`,
            "futureOpex" : `${futureOpex}`,
            "futureNoi" : `${futureNoi}`,
            "occupancy" : `${occupancy}`,
            "leaseBreak" : `${leaseBreak}`,
            "leaseExpiry" : `${leaseExpiry}`,
            "assetClass" : `${assetClass}`,
            "futureAssetClass" : `${futureAssetClass}`,
            "feeStructure" : `${feeStructure}`,
            "brokerFee" : `${brokerFee}`,
          }
          });
        if (data.status === 1) {
          console.log("Update successful")
        }
      } 
      catch (error) {console.log(error);}
    }

    const onDeleteClick = async () => {
      const dataURL = `http://localhost:3001/user/property/${propertySlug}`;
      try {
        const {data} = await axios.request({
          url: dataURL,
          method: "delete",
          headers: {
            "token": localStorage.getItem("token"),
          },
          data: {
            "id" : `${propertySlug}`
          }
          });
          console.log(data);
        if (data.status === 1) {
          console.log("Delete successful")
          backToDashboard(); 
        }
      } 
      catch (error) {console.log(error);}
    }

    return (
    <>
    <div className="user">   

      <div className="container text-center">  
      <h1 className="text-start">Detailed View</h1>
      <h2 className="text-start">{name? name+", " : ""}{street}, {city}</h2>
      <p className="mb-5 text-start"> Created on {formatDate(created)}</p>

        <div className="row text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Property address</h3>
            <div><input
              className={renderView==1 ? "uneditableStyle" : ""}
              readOnly={renderView==1 ? true : false}
              name="name"
              value={name}
              type="text"
              onChange={onNameInput}
              placeholder={name ? "Name" : ""}
            /></div>
            <div><input
              className={renderView==1 ? "uneditableStyle" : ""}
              readOnly={renderView==1 ? true : false}
              name="street"
              value={street}
              type="text"
              onChange={onStreetInput}
              placeholder="Street"
            /></div>
            <div><input
              className={renderView==1 ? "uneditableStyle" : ""}
              readOnly={renderView==1 ? true : false}
              name="city"
              value={city}
              type="text"
              onChange={onCityInput}
              placeholder="City"
            /></div>
            <div><input
              className={renderView==1 ? "uneditableStyle" : ""}
              readOnly={renderView==1 ? true : false}
              name="postcode"
              value={postcode}
              type="text"
              onChange={onPostcodeInput}
              placeholder="Postcode"
            /></div>
          </div>

          <div className="col mb-5">
            <h3 className="mb-3">Technical details</h3>
            {renderView==1 ? 
            <p className="mb-0">GIA {addCommas(areaGross)} {units}</p>
            :
            <div>GIA<input
              name="GIA"
              value={areaGross}
              type="text"
              onChange={onAreaGrossInput}
              placeholder="Gross internal area"
            />{units}</div> 
            }
            {renderView==1 ? 
            <p className="mb-0">NIA {addCommas(areaNet)} {units}</p>
            :
            <div>NIA<input
              name="NIA"
              value={areaNet}
              type="text"
              onChange={onAreaNetInput}
              placeholder="Net internal area"
            />{units}</div> 
            }
            <p className="mb-0">Building efficiency {buildingEfficiency}</p>
            {siteArea!=0 && renderView==1 &&
            <p className="mb-0">Site area {addCommas(siteArea)} {units}</p>
            }
            {renderView!=1 &&
            <div>Site area: <input
              name="NIA"
              value={siteArea}
              type="text"
              onChange={onSiteAreaInput}
              placeholder="Site area"
            />{units}</div> 
            }
          </div>
  
          <div className="col mb-5">
            <h3 className="mb-3">Price analysis</h3>
            {renderView==1 ? 
            <p className="mb-0">{addCurrency(addCommas(price))}</p>
            :
            <div>{currency}<input
              name="price"
              value={price}
              type="text"
              onChange={onPriceInput}
              placeholder="Price"
            /></div> 
            }
            <p className="mb-2">{capval} / {units}</p>
            {renderView==1 ? 
            <p className="mb-0">Agent fee: {brokerFeePercentage}</p>
            :
            <div>{currency}<input
              name="brokerFee"
              value={brokerFee}
              type="number"
              step="0.1"
              onChange={onBrokerFeeInput}
              placeholder="Broker fee"
            />%</div> 
            }
            <p className="mb-0">Agent fee: {brokerFeeAmount}</p>
            {renderView==1 ? 
            <p className="mb-0">Fee paid by: {feeStructure}</p>
            :
            <p>Fee paid by: <select onInput={onFeeStructureInput} value={feeStructure} aria-label="fee structure">
              <option value="buyer">buyer</option>
              <option value="seller">seller</option>
            </select></p>
            }
          </div>
        </div>

        <div className="row text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Legal structure</h3>
            {renderView==1 ? 
            <p className="mb-0">Tenure: {tenure}</p>
            :
            <p>Tenure: <select onInput={onTenureInput} value={tenure} aria-label="tenure">
              <option value="freehold">freehold</option>
              <option value="leasehold">leasehold</option>
            </select></p>
            }
            {tenure=="leasehold" && renderView==1 &&
            <>
            <p className="mb-0">Ground rent: {addCurrency(addCommas(groundRent))} p.a.</p>
            <p className="mb-0">Unexpired term: {leaseholdTerm} years</p>
            </>
            }
            {tenure=="leasehold" && renderView!=1 &&
            <>
            <div>Ground rent: {currency}<input
              name="groundRent"
              value={groundRent}
              type="text"
              onChange={onGroundRentInput}
              placeholder="Ground rent"
            />p.a.</div> 
            <div>Unexpired term:<input
              name="leaseholdTerm"
              value={leaseholdTerm}
              type="text"
              onChange={onLeaseholdTermInput}
              placeholder="Leasehold term"
            />years</div> 
            </>
            }
            {renderView==1 ? 
            <p className="mb-0">Deal structure: {dealType=="assetDeal" ? "asset deal" : "share deal"}</p>
            :
            <p>Deal structure: <select onInput={onDealTypeInput} value={dealType} aria-label="deal structure">
              <option value="assetDeal">Asset deal</option>
              <option value="shareDeal">Share deal</option>
            </select></p>
            }
            {renderView==1 ? 
            <p className="mb-0">Development potential: {developmentStatus=="development" ? "yes" : "no"}</p>
            :
            <p>Development potential: <select onInput={onDevelopmentInput} value={developmentStatus} aria-label="development potential">
              <option value="development">Yes</option>
              <option value="completed">No</option>
            </select></p>
            }
          </div>

          <div className="col mb-5">
            <h3 className="mb-3">Income profile</h3>
            {renderView==1 ? 
            <p className="mb-2">Asset class: {assetClass}</p>
            :
            <p>Asset class: <select onInput={onAssetClassInput} value={assetClass} aria-label="asset class">
              <option value="hotel">Hotel</option>
              <option value="land">Land plot</option>
              <option value="logistics">Logistics</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="residential">Residential</option>
              <option value="student">Student housing</option>
            </select></p>
            }
            {renderView==1 ? 
            <p className="mb-0">GRI: {addCurrency(addCommas(passingRent))} p.a.</p>
            :
            <div>GRI: {currency}<input
              name="passingRent"
              value={passingRent}
              type="text"
              onChange={onPassingRentInput}
              placeholder="Passing rent"
            />p.a.</div> 
            }
            <p className="mb-2">{addCurrency(addCommas(Math.round(passingRent/areaNet)))} / {units}</p>
            {renderView==1 ? 
            <p className="mb-0">NOI: {addCurrency(addCommas(passingNoi))} p.a.</p>
            :
            <div>NOI: {currency}<input
              name="passingNoi"
              value={passingNoi}
              type="text"
              onChange={onPassingNoiInput}
              placeholder="Passing NOI"
            />p.a.</div> 
            }
            <p className="mb-0">{addCurrency(addCommas(Math.round(passingNoi/areaNet)))} / {units}</p>
          </div>

          <div className="col mb-5">
            <h3 className="mb-3">Lease profile</h3>
            {renderView==1 ? 
            <p className="mb-0">Occupancy: {occupancy}%</p>
            :
            <div>Occupancy: <input
              name="occupancy"
              value={occupancy}
              type="text"
              onChange={onOccupancyInput}
              placeholder="Occupancy"
            />%</div> 
            }
            {renderView==1 ? 
            <>
            <p className="mb-0">Lease break: {leaseBreak ? formatDate(leaseBreak) : "n/a"}</p>
            <p className="mb-0">Lease expiry: {leaseExpiry ? formatDate(leaseExpiry) : "n/a"}</p>
            </>
            :
            <>
            <div>Lease break: <input
              name="leaseBreak"
              value={leaseBreak}
              type="date"
              onChange={onLeaseBreakInput}
            /></div> 
            <div>Lease expiry: <input
              name="leaseExpiry"
              value={leaseExpiry}
              type="date"
              onChange={onLeaseExpiryInput}
            /></div> 
            </>
            }
            {leaseBreak && <p className="mb-0">WALB: {WALB} years</p>}
            {leaseExpiry && <p className="mb-0">WALT: {WALT} years</p>}
          </div>
        </div>

        <div className="row text-start">
          {developmentStatus=="development" &&
          <div className="col mb-5">
            <h3 className="mb-3">Development potential</h3>
            {renderView==1 ? 
            <p className="mb-0">Asset class: {futureAssetClass} (after development)</p>
            :
            <p>Asset class: <select onInput={onFutureAssetClassInput} value={futureAssetClass} aria-label="future asset class">
              <option value="hotel">Hotel</option>
              <option value="logistics">Logistics</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="residential">Residential</option>
              <option value="student">Student housing</option>
            </select></p>
            }
            {renderView==1 ? 
            <p className="mb-0">Projected GRI: {addCurrency(addCommas(futureRent))}  p.a.</p>
            :
            <div>Projected GRI: {currency}<input
              name="futureRent"
              value={futureRent}
              type="text"
              onChange={onFutureRentInput}
              placeholder="Future GRI"
            />p.a.</div> 
            }
            <p className="mb-2">{addCurrency(Math.round(futureRent/futureAreaNet))} / {units}</p>
            {renderView==1 ? 
            <p className="mb-0">Projected NOI: {addCurrency(addCommas(futureNoi))} p.a.</p>
            :
            <div>Projected NOI: {currency}<input
              name="futureNoi"
              value={futureNoi}
              type="text"
              onChange={onFutureNoiInput}
              placeholder="Future NOI"
            />p.a.</div> 
            }
            <p className="mb-2">{addCurrency(Math.round(futureNoi/futureAreaNet))}  / {units}</p>
            {renderView==1 ? 
            <p className="mb-0">GDV: {addCurrency(addCommas(gdv))}</p>
            :
            <div>GDV: {currency}<input
              name="gdv"
              value={gdv}
              type="text"
              onChange={onGdvInput}
              placeholder="GDV"
            />p.a.</div> 
            }
            <p className="mb-2">{addCurrency(addCommas(Math.round(gdv/futureAreaNet)))} / {units}</p>
            {renderView==1 ? 
            <p className="mb-0">CAPEX: {addCurrency(addCommas(capex))}</p>
            :
            <div>CAPEX: {currency}<input
              name="capex"
              value={capex}
              type="text"
              onChange={onCapexInput}
              placeholder="CAPEX"
            />p.a.</div> 
            }
            <p className="mb-2">{addCurrency(addCommas(Math.round(capex/futureAreaNet)))} / {units}</p>
            {renderView==1 ? 
            <p className="mb-0">Projected GIA: {addCommas(futureAreaGross)} {units}</p>
            :
            <div>Projected GIA: <input
              name="futureAreaGross"
              value={futureAreaGross}
              type="text"
              onChange={onFutureAreaGrossInput}
              placeholder="Future GIA"
            />{units}</div> 
            }
            {renderView==1 ? 
            <p className="mb-0">Projected NIA: {addCommas(futureAreaNet)} {units}</p>
            :
            <div>Projected NIA: <input
              name="futureAreaNet"
              value={futureAreaNet}
              type="text"
              onChange={onFutureAreaNetInput}
              placeholder="Future NIA"
            />{units}</div> 
            }
          </div>}

          {image &&
          <div className="col-4 mb-5">
            <h3 className="mb-3">Asset image</h3>
            <img src={`http://localhost:3001/images/` + image} className="img-fluid img-thumbnail"/>
          </div>}
          <div className="col-4 mb-5">
          </div>

        </div>

        <div className="row align-items-center justify-content-around">
          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            <button className="btn btn-outline-primary" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>

          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            {renderView==1 ?
            <button className="btn btn-outline-warning" type="button" onClick={onEditClick}>Edit details</button> 
            :
            <button className="btn btn-outline-danger" type="button" onClick={onSaveClick}>Save details</button>             
            }
          </div>
          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            <button
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop" 
              type="button" 
              > Delete property
            </button>
          </div>
          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
          <ImageUpload getData={getData}/>
          </div>
          
        </div>
      </div>
    
    {/* Modal for property deletion */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-2" id="staticBackdropLabel">Delete property</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            This property and all its details will be irretrievably deleted. Do you wish to continue?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go back</button>
            <button 
              type="button" 
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onDeleteClick}
            > Delete property
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
    </>
    )
}

export default DetailedView;