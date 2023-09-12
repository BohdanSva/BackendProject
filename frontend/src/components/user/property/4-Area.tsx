import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, removeNonNumeric } from "../../../utils/formatting";
import { selectAssetClass, selectDevelopment, setAreaNet, setAreaGross, setUnits, setSiteArea, setFutureAreaNet, 
  setFutureAreaGross } 
from "../../../features/property/propertySlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Area = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const assetClass = useSelector(selectAssetClass);
  const [valueNet, setValueNet] = useState(""); // Net area value shown to user is text formatted in '000
  const [valueGross, setValueGross] = useState(""); // Gross area value shown to user is text formatted in '000
  const [valueSite, setValueSite] = useState(""); // ibid for development site
  const [valueNetFuture, setValueNetFuture] = useState(""); // ibid for post development
  const [valueGrossFuture, setValueGrossFuture] = useState(""); // ibid for post development
  const developmentStatus = useSelector(selectDevelopment);

  // Functions
  const onUnitsInput = (select:any) => {
    dispatch(setUnits(select.target.value)); 
  }
  const onNetAreaInput = (keystroke:any) => {
    setValueNet(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setAreaNet(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onGrossAreaInput = (keystroke:any) => {
    setValueGross(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setAreaGross(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onSiteAreaInput = (keystroke:any) => {
    setValueSite(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setSiteArea(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onNetFutureAreaInput = (keystroke:any) => {
    setValueNetFuture(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setFutureAreaNet(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onGrossFutureAreaInput = (keystroke:any) => {
    setValueGrossFuture(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setFutureAreaGross(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }

  return (
    <>
    <div className="user">
      <div className="container">
        <h2>How big is it?</h2>
        <form>

        {assetClass!="land" &&
        <>
          <div className="row">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Measurement units</label>
              <select onInput={onUnitsInput} className="form-select" aria-label="measurement-units">
                <option value="sqft">ft&sup2;, square feet </option>
                <option value="sqm">m&sup2;, square meters </option>
              </select>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Net internal area (NIA) </label>
              <input
                onInput={onNetAreaInput}
                value={valueNet}
                type="text" 
                className="form-control" 
                aria-describedby="net-area"/>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Gross internal area (GIA) </label>
              <input
                onInput={onGrossAreaInput}
                value={valueGross}
                type="text" 
                className="form-control" 
                aria-describedby="gross-area"/>
            </div>
          </div>
          </>
        }

        {developmentStatus=="development" &&
        <>
          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Site area (GEA) </label>
              <input
                onInput={onSiteAreaInput}
                value={valueSite}
                type="text" 
                className="form-control" 
                aria-describedby="site-area"/>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Net internal area (NIA) post development</label>
              <input
                onInput={onNetFutureAreaInput}
                value={valueNetFuture}
                type="text" 
                className="form-control" 
                aria-describedby="net-future-area"/>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Gross internal area (GIA) post development</label>
              <input
                onInput={onGrossFutureAreaInput}
                value={valueGrossFuture}
                type="text" 
                className="form-control" 
                aria-describedby="gross-future-area"/>
            </div>
          </div>
          </>
          }

        </form>
      </div>
    </div>
    </>
  )
}

export default Area;