import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas } from "../../../utils/formatting";
import { selectCurrency, selectMaxSize, selectMaxWalb, selectMinSize, selectMinWalb, setCurrency, setMaxSize, setMaxWalb, 
  setMinSize, setMinWalb, setMinYield } 
from "../../../features/investors/investorSlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Strategy = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const minSize = useSelector(selectMinSize);
  const maxSize = useSelector(selectMaxSize);
  const minTerm = useSelector(selectMinWalb);
  const maxTerm = useSelector(selectMaxWalb);

  // Functions
  const onCurrencyInput = (keystroke:any) => {
    dispatch(setCurrency(keystroke.target.value)); 
  }
  const onYieldInput = (select:any) => {
    dispatch(setMinYield(Number(select.target.value))); // Yield requirement is inputted in %
  }
  const onMinSizeInput = (slider:any) => {
    dispatch(setMinSize(Number(slider.target.value))); 
  }
  const onMaxSizeInput = (slider:any) => {
    dispatch(setMaxSize(Number(slider.target.value))); 
  }
  const onMinWalbInput = (slider:any) => {
    dispatch(setMinWalb(Number(slider.target.value))); 
  }
  const onMaxWalbInput = (slider:any) => {
    dispatch(setMaxWalb(Number(slider.target.value))); 
  }

  return (
    <>
    <div className="user">
      <div className="container">
        <h2>What are the target KPIs?</h2>
      
        <div className="row align-items-start">
          <div className="d-grid gap-2 col-2 mb-4">
            <label className="form-label">Currency</label>
            <select onInput={onCurrencyInput} className="form-select" aria-label="currency">
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
              <div className="form-text">Investor currency</div>
          </div>

          <div className="d-grid gap-2 col-2 mb-4">
          <label className="form-label"> Yield requirement </label>
            <div className="input-group">
              <input
                onInput={onYieldInput}
                type="number" 
                className="form-control text-end"
                step="0.1"
                aria-label="min-yield-percentage"/>
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>

        </div>

        <div className="row align-items-start">
          <div className="d-grid gap-2 col-5 mb-4">
            <label htmlFor="customRange1" className="form-label">Deal size from: {currency} {addCommas(minSize)} </label>
            <input onChange={onMinSizeInput} type="range" className="form-range" id="customRange1" min="0" max="100000000" defaultValue="5000000" step="1000000"/>
          </div>
          <div className="d-grid gap-2 col-5 mb-4">
            <label htmlFor="customRange2" className="form-label">Deal size to: {currency} {addCommas(maxSize)} </label>
            <input onChange={onMaxSizeInput} type="range" className="form-range" id="customRange2" min="0" max="500000000" defaultValue="5000000" step="1000000"/>
          </div>
        </div>

        <div className="row align-items-start">
          <div className="d-grid gap-2 col-5 mb-4">
            <label htmlFor="customRange3" className="form-label">Term certain from: {minTerm} years</label>
            <input onChange={onMinWalbInput} type="range" className="form-range" id="customRange3" min="0" max="10" defaultValue="5" step="1"/>
            <div className="form-text">Minimum term certain of 0 will include vacant buildings</div>
          </div>
          <div className="d-grid gap-2 col-5 mb-4">
            <label htmlFor="customRange4" className="form-label">Term certain to: {maxTerm} years</label>
            <input onChange={onMaxWalbInput} type="range" className="form-range" id="customRange4" min="0" max="30" defaultValue="5" step="1"/>
            <div className="form-text">Maximum term certain of 0 means only vacant buildings are required</div>
          </div>
        </div>


      </div>
    </div>
    </>
  )
}

export default Strategy;