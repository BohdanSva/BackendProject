import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../user.css';
import { setInvestorName, setStrategyName, setAssetClass, setDevelopment, setFutureAssetClass, 
  selectDevelopment, selectAssetClass, removeFromGeography, addToGeography
} from "../../../features/investors/investorSlice";

// Types
interface SwitchInterface {
  value: number,
}

const Location = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const developmentStatus = useSelector(selectDevelopment);
  const assetClass = useSelector(selectAssetClass);
  const regions = [
    { id: "1", regionName: "Central London" },
    { id: "2", regionName: "Greater London" },
    { id: "3", regionName: "South East England" },
    { id: "4", regionName: "South West England" },
    { id: "5", regionName: "Midlands" },
    { id: "6", regionName: "Northern England" },
    { id: "7", regionName: "Wales, Scotland, Northern Ireland" },
  ];
  
  // Functions
  const onInvestorNameInput = (keystroke:any) => {
    dispatch(setInvestorName(keystroke.target.value)); 
  }
  const onStrategyNameInput = (keystroke:any) => {
    dispatch(setStrategyName(keystroke.target.value)); 
  }
  const onDevelopmentInput = (select:any) => {
      dispatch(setDevelopment(select.target.value)); 
  }
  const onAssetClassInput = (select: any) => {
    dispatch(setAssetClass(select.target.value)); 
    // Selecting land disables the select option, so we must ensure the value is saved in state as it can't be selected anymore
    if(select.target.value=="land") { 
      dispatch(setDevelopment("development")); 
    }
  }
  const onFutureAssetClassInput = (keystroke:any) => {
    dispatch(setFutureAssetClass(keystroke.target.value)); 
  }
  const onSwitchChange = (e: any, c: any) => {
    e.target.checked ? dispatch(addToGeography(c.regionName)) : dispatch(removeFromGeography(c.regionName));
  };

  return (
    <>
    <div className="user">
      <div className="container">
        <h2>What are the investment targets?</h2>
        <form>

          <div className="row align-items-start">
            
            <div className="d-grid gap-2 col-3 mb-3">
              <label className="form-label">Company</label>
              <input onInput={onInvestorNameInput} type="company" className="form-control" aria-describedby="investment-strategy-name"/>
              <div className="form-text">Name of the investor or investment manager</div>
            </div>
            <div className="d-grid gap-2 col-3 mb-3">
              <label className="form-label">Fund / strategy name</label>
              <input onInput={onStrategyNameInput} type="name" className="form-control" aria-describedby="investment-strategy-name"/>
              <div className="form-text">Name of the investment strategy or specific fund or sub-fund</div>
            </div>

            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Asset class</label>
              <select onInput={onAssetClassInput} className="form-select" aria-label="asset-class">
                <option value=""></option>
                <option value="hotel">Hotel</option>
                <option value="land">Land plot</option>
                <option value="logistics">Logistics</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="residential">Residential</option>
                <option value="student">Student housing</option>
              </select>
              <div className="form-text">Predominant current use of the property as is</div>
            </div>
          </div>

          <div className="row align-items-start mb-4">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Development</label>
              <select 
                onInput={onDevelopmentInput} 
                value={(assetClass == "land") ? "development" : undefined } 
                className={`form-select ${(assetClass == "land") ? "disabledStyle" : "" }`} 
                aria-label="development"
              >
                <option value="completed" disabled={(assetClass == "land") ? true : false}>Completed property</option>
                <option value="development">Development property</option>
              </select>
            </div>

            {developmentStatus=="development" &&
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Asset class post development</label>
              <select onInput={onFutureAssetClassInput} className="form-select" aria-label="future-asset-class">
                <option value=""></option>
                <option value="hotel">Hotel</option>
                <option value="logistics">Logistics</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="residential">Residential</option>
                <option value="student">Student housing</option>
              </select>
              <div className="form-text">Predominant future use of the property</div>
            </div>
            }
          </div>
          
          <div className="row align-items-start">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label mb-3">Geographical scope</label>

              {regions.map((c) => (
              <div className="form-check form-switch" key={c.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={c.id}
                  onChange={(e) => onSwitchChange(e, c)}
                />
                <label className="form-check-label" htmlFor={c.id}>{c.regionName}</label>
              </div>
              ))}
            </div>
          </div>

        </form>
      </div>
    </div>
    </>
  )
}

export default Location;