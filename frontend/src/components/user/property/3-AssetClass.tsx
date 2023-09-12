import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, removeNonNumeric } from "../../../utils/formatting";
import { selectAssetClass, selectCurrency, selectTenure, setAssetClass, setDealType, setDevelopment, 
  setGroundRent, setUnexpiredLeasehold, setTenure, selectDevelopment, setFutureAssetClass } 
from "../../../features/property/propertySlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const AssetClass = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const tenure = useSelector(selectTenure);
  const [value, setValue] = useState(""); // Ground rent value shown to user is text formatted in '000
  const currency = useSelector(selectCurrency);
  const assetClass = useSelector(selectAssetClass);
  const developmentStatus = useSelector(selectDevelopment);

  // Functions
  const onTenureInput = (select:any) => {
    dispatch(setTenure(select.target.value)); 
  }
  const onGroundRentInput = (keystroke:any) => {
    setValue(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setGroundRent(Number(removeNonNumeric(keystroke.target.value)))); // Save to store as number
  }
  const onUnexpiredLeaseholdInput = (date:any) => {
    dispatch(setUnexpiredLeasehold(Number(date.target.value)));
  }
  const onAssetClassInput = async (select:any) => {
    dispatch(setAssetClass(select.target.value)); 
    // Selecting land disables the select option, so we must ensure the value is saved in state as it can't be selected anymore
    if(select.target.value=="land") { 
      dispatch(setDevelopment("development")); 
    }
  }
  const onDevelopmentInput = (select:any) => {
    dispatch(setDevelopment(select.target.value)); 
  }
  const onFutureAssetClassInput = (select:any) => {
    dispatch(setFutureAssetClass(select.target.value)); 
  }
  const onDealTypeInput = (select:any) => {
    dispatch(setDealType(select.target.value)); 
  }

  return (
    <>
    <div className="user">

      <div className="container">
        <h2>What is it?</h2>
      
        <form>

          <div className="row">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Deal structure</label>
              <select onInput={onDealTypeInput} className="form-select" aria-label="deal-type">
                <option value="assetDeal">Asset deal</option>
                <option value="shareDeal">Share deal</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Tenure</label>
              <select onInput={onTenureInput} className="form-select" aria-label="tenure">
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
              </select>
            </div>
          </div>

          {tenure=="leasehold" &&
            <>
            <div className="row">
              <div className="d-grid gap-2 col-3">
                <label className="form-label">Ground rent</label>
                <input
                  onInput={onGroundRentInput}
                  value={value}
                  type="text" 
                  className="form-control" 
                  aria-describedby="ground rent"/>
              </div>
              <div className="form-text mb-4">Annual ground rent paid to freeholder in {currency} p.a.</div>
            </div>
            
            <div className="row align-items-center">
              <div className="d-grid gap-2 col-3">
                <label className="form-label"> Leasehold term </label>
                <input
                  onInput={onUnexpiredLeaseholdInput}
                  type="number" 
                  className="form-control" 
                  aria-describedby="unexpired-leasehold-term"/>
              </div>
              <div className="form-text mb-4">Unexpired years on the long lease</div>
            </div>

            </>
          }

          <div className="row">
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

          <div className="row">
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
          </div>

          {developmentStatus=="development" &&

          <div className="row">
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
          </div>
          }

        </form>
      </div>
    </div>
    </>
  )
}

export default AssetClass;