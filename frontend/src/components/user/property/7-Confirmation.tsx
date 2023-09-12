import { useSelector } from "react-redux";
import '../user.css';
import { selectName, selectStreet, selectCity, selectPostcode, selectUnits, selectPrice, selectAreaNet, selectCurrency,
  selectAreaGross, selectBrokerFee, selectTenure, selectGroundRent, selectUnexpiredLeasehold, selectDealType, selectDevelopment, 
  selectSiteArea, selectAssetClass, selectPassingRent, selectPassingNoi, selectOccupancy, selectLeaseBreak,
  selectLeaseExpiry, selectFutureAssetClass, selectGdv, selectCapex, selectFutureAreaGross, selectFutureAreaNet, selectFutureRent,
  selectFutureNoi} 
from "../../../features/property/propertySlice";
import { addCommas, addPercent, formatDate, timeFromToday } from "../../../utils/formatting";

// Types
interface SwitchInterface {
  value: number,
}

const Confirmation = (props:SwitchInterface) => {
  // Definitions
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

  // Functions
  const addCurrency = (num: any) => `${currency} ` + num;
  const capval = addCurrency(addCommas(Math.round(price/areaNet)));
  const buildingEfficiency = addPercent(areaNet/areaGross);
  const brokerFeePercentage = addPercent(brokerFee/100);
  const brokerFeeAmount = addCurrency(addCommas(Math.round(price * (brokerFee/100))));
  const WALB = timeFromToday(leaseBreak);
  const WALT = timeFromToday(leaseExpiry);

  return (
    <>
    <div className="user">
      <h2>Confirm asset details</h2>
      <div className="container text-center">
        
        <div className="row text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Property address</h3>
            <p className="mb-0">{name}</p>
            <p className="mb-0">{street}</p>
            <p className="mb-0">{city}</p>
            <p className="mb-0">{postcode}</p>   
          </div>

          <div className="col mb-5">
            <h3 className="mb-3">Technical details</h3>
            <p className="mb-0">GIA {addCommas(areaGross)} {units}</p>
            <p className="mb-0">NIA {addCommas(areaNet)} {units}</p>
            <p className="mb-0">Building efficiency {buildingEfficiency}</p>
            {siteArea!=0 && <p className="mb-0">Site area {addCommas(siteArea)} {units}</p>}
          </div>
  
          <div className="col mb-5">
            <h3 className="mb-3">Price analysis</h3>
            <p className="mb-0">{addCurrency(addCommas(price))}</p>
            <p className="mb-2">{capval} / {units}</p>
            <p className="mb-0">Agent fee: {brokerFeePercentage}</p>
            <p className="mb-0">Agent fee: {brokerFeeAmount}</p>
          </div>
        </div>

        <div className="row text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Legal structure</h3>
            <p className="mb-0">Tenure: {tenure}</p>
            {tenure=="leasehold" &&
            <>
            <p className="mb-0">Ground rent: {addCurrency(addCommas(groundRent))} p.a.</p>
            <p className="mb-0">Unexpired term: {leaseholdTerm} years</p>
            </>
            }
            <p className="mb-0">Deal structure: {dealType=="assetDeal" ? "asset deal" : "share deal"}</p>
            <p className="mb-0">Development potential: {developmentStatus=="development" ? "yes" : "no"}</p>
          </div>

          <div className="col mb-5">
            <h3 className="mb-3">Income profile</h3>
            <p className="mb-2">Asset class: {assetClass}</p>
            <p className="mb-0">GRI: {addCurrency(addCommas(passingRent))} p.a.</p>
            <p className="mb-2">{addCurrency(addCommas(Math.round(passingRent/areaNet)))} / {units}</p>
            <p className="mb-0">NOI: {addCurrency(addCommas(passingNoi))} p.a.</p>
            <p className="mb-0">{addCurrency(addCommas(Math.round(passingNoi/areaNet)))} / {units}</p>
          </div>

          <div className="col mb-5">
            <h3 className="mb-3">Lease profile</h3>
            <p className="mb-0">Occupancy: {occupancy}%</p>
            <p className="mb-0">Lease break: {leaseBreak ? formatDate(leaseBreak) : "n/a"}</p>
            <p className="mb-0">Lease expiry: {leaseExpiry ? formatDate(leaseExpiry) : "n/a"}</p>
            {leaseBreak && <p className="mb-0">WALB: {WALB} years</p>}
            {leaseExpiry && <p className="mb-0">WALT: {WALT} years</p>}
          </div>
        </div>

        <div className="row text-start">
          {developmentStatus=="development" &&
          <div className="col mb-5">
            <h3 className="mb-3">Development potential</h3>
            <p className="mb-0">Asset class: {futureAssetClass} (after development)</p>
            <p className="mb-0">Projected GRI: {addCurrency(addCommas(futureRent))}  p.a.</p>
            <p className="mb-2">{addCurrency(Math.round(futureRent/futureAreaNet))} / {units}</p>
            <p className="mb-0">Projected NOI: {addCurrency(addCommas(futureNoi))} p.a.</p>
            <p className="mb-2">{addCurrency(Math.round(futureNoi/futureAreaNet))}  / {units}</p>
            <p className="mb-0">GDV: {addCurrency(addCommas(gdv))}</p>
            <p className="mb-2">{addCurrency(addCommas(Math.round(gdv/futureAreaNet)))} / {units}</p>
            <p className="mb-0">CAPEX: {addCurrency(addCommas(capex))}</p>
            <p className="mb-2">{addCurrency(addCommas(Math.round(capex/futureAreaNet)))} / {units}</p>
            <p className="mb-0">Projected GIA: {addCommas(futureAreaGross)} {units}</p>
            <p className="mb-0">Projected NIA: {addCommas(futureAreaNet)} {units}</p>
          </div>}
        </div>

      </div>
    </div>
    </>
  )
}

export default Confirmation;