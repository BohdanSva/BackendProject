import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { selectAreaGross, selectAreaNet, selectAssetClass, selectBrokerFee, selectCapex, selectCity, selectCurrency, 
  selectDealType, selectDevelopment, selectFeeStructure, selectFutureAreaGross, selectFutureAreaNet, selectFutureAssetClass, 
  selectFutureNoi, selectFutureOpex, selectFutureRent, selectGdv, selectGroundRent, selectLeaseBreak, selectLeaseExpiry, 
  selectName, selectOccupancy, selectOpex, selectPassingNoi, selectPassingRent, selectPostcode, selectPrice, selectRenderView, 
  selectSiteArea, selectStreet, selectTenure, selectUnexpiredLeasehold, selectUnits, setRenderView, setResetPropertySlice } 
from "../../../features/property/propertySlice";
import Location from "./1-Location";
import Price from "./2-Price";
import AssetClass from "./3-AssetClass";
import Area from "./4-Area";
import Income from "./5-Income";
import Development from "./6-Development";
import Confirmation from "./7-Confirmation";
import '../user.css';

// Create a switch component to govern rendering of child components based on renderView value
interface SwitchInterface {
  test: any,
  children: any
}
const Switch = (props: SwitchInterface) => {
  const { test, children } = props
  // filter out only children with a matching prop
  return children.find((child: any) => {
    return child.props.value === test;
  })      
}

const AddProperty = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderView = useSelector(selectRenderView);
  const developmentStatus = useSelector(selectDevelopment);

  const name = useSelector(selectName);
  const street = useSelector(selectStreet);
  const city = useSelector(selectCity);
  const postcode = useSelector(selectPostcode);
  // const latitude
  // const longitude
  const price = useSelector(selectPrice);
  const currency = useSelector(selectCurrency);
  const tenure = useSelector(selectTenure);
  const groundRent = useSelector(selectGroundRent);
  const leaseholdTerm = useSelector(selectUnexpiredLeasehold);
  const dealType = useSelector(selectDealType);
  const gdv = useSelector(selectGdv);
  const capex = useSelector(selectCapex);
  const units = useSelector(selectUnits);
  const siteArea = useSelector(selectSiteArea);
  const areaGross = useSelector(selectAreaGross);
  const areaNet = useSelector(selectAreaNet);
  const futureAreaGross = useSelector(selectFutureAreaGross);
  const futureAreaNet = useSelector(selectFutureAreaNet);
  const passingRent = useSelector(selectPassingRent);
  const opex = useSelector(selectOpex);
  const passingNoi = useSelector(selectPassingNoi);
  const futureRent = useSelector(selectFutureRent);
  const futureOpex = useSelector(selectFutureOpex);
  const futureNoi = useSelector(selectFutureNoi);
  const occupancy = useSelector(selectOccupancy);
  const leaseBreak = useSelector(selectLeaseBreak);
  const leaseExpiry = useSelector(selectLeaseExpiry);
  const assetClass = useSelector(selectAssetClass);
  const futureAssetClass = useSelector(selectFutureAssetClass);
  const feeStructure = useSelector(selectFeeStructure);
  const brokerFee = useSelector(selectBrokerFee);

  // Functions
  const backToDashboard = () => { 
    navigate('/user/property/mydeals');
  }

  const clickBack = () => {
    // Skip the Development component if not applicable based on prior selection
    if (developmentStatus!="development" && renderView==7) { 
      dispatch(setRenderView(-2));
    } else
    dispatch(setRenderView(-1))
  }
  const clickNext = () => {
    // Skip the Development component if not applicable based on prior selection
    if (developmentStatus!="development" && renderView==5) { 
      dispatch(setRenderView(+2));
    } else
    dispatch(setRenderView(+1))
  }
  const addProperty = async () => {
    const dataURL = `http://localhost:3001/user/property`;
    const token = localStorage.getItem("token");
    try {
      const {data} = await axios.request({
        url: dataURL,
        method: "post",
        headers: {
          "token": `${token}`,
        },
        data: {
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
        console.log("New property added");
        dispatch(setResetPropertySlice());
        navigate('/user/property/mydeals'); // Return back to user dashboard after new property added to database
      }
    } 
    catch (error) {console.log(error);}
  }
  
  return (
    <>
    <div className="user">
      <div className="container">

        <h1> Add new property </h1>
        <p> Property for sale, representing the vendor </p>

        <Switch test={renderView}>
          <Location value={1}/>
          <Price value={2}/>
          <AssetClass value={3}/>
          <Area value={4}/>
          <Income value={5}/>
          <Development value={6}/>
          <Confirmation value={7}/>
        </Switch>

        <div className="row">
          {renderView==1 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>
          }
          {renderView>1 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={clickBack}>Back</button>
          </div>
          }
          {renderView<7 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={clickNext}>Next</button>
          </div>
          }
          {renderView==7 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={addProperty}>Add property</button>
          </div>
          }
        </div>

      </div>
    </div>
    </>
  )
}

export default AddProperty;