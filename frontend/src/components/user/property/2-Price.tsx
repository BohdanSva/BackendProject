import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, removeNonNumeric } from "../../../utils/formatting";
import { selectBrokerFee, selectCurrency, selectPrice, setBrokerFee, setCurrency, setFeeStructure, setPrice } 
from "../../../features/property/propertySlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Price = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const [value, setValue] = useState(""); // Value shown to user is text formatted in '000
  const currency = useSelector(selectCurrency);
  const percentageFee = useSelector(selectBrokerFee);
  const price = useSelector(selectPrice);
  const feeAmount = price * (percentageFee/100);

  // Functions
  const addCurrency = (num: any) => `${currency} ` + num;
  const onCurrencyInput = (select:any) => {
    dispatch(setCurrency(select.target.value)); 
  }
  const onPriceInput = (keystroke:any) => {
    setValue(addCommas(removeNonNumeric(keystroke.target.value))); // Show user text value in '000
    dispatch(setPrice(Number(removeNonNumeric(keystroke.target.value)))); // Save to store as number
  }
  const onFeeTypeInput = (select:any) => {
    dispatch(setFeeStructure(select.target.value)); 
  }
  const onFeeInput = (select:any) => {
    dispatch(setBrokerFee(Number(select.target.value))); // Fee is inputted in %
  }

  return (
    <>
    <div className="user">

      <div className="container">
        <h2>What is the price?</h2>
  
        <form>
          <div className="row mb-5">
            <div className="d-grid gap-2 col-2">
              <label className="form-label">Currency</label>
              <select onInput={onCurrencyInput} className="form-select" aria-label="currency">
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
              <div className="form-text">Currency of the purchase price and income </div>
            </div>
            <div className="d-grid gap-2 col-3">
              <label className="form-label">Price</label>
              <input
                onInput={onPriceInput}
                value={value}
                type="text" 
                className="form-control" 
                aria-describedby="property price"/>
              <div className="form-text">Price required or agreed to sell the property, without fees or tax</div>
            </div>
          </div>

          <div className="row">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label">Fee structure</label>
              <select onInput={onFeeTypeInput} className="form-select" aria-label="fee-structure">
                <option value="seller">Seller pays fee</option>
                <option value="buyer">Buyer pays fee</option>
              </select>
            </div>
          </div>

          <div className="form-group col-3 mb-3">
            <label className="form-label"> Agent fee </label>
            <div className="input-group">
              <input
                onInput={onFeeInput}
                type="number" 
                className="form-control" 
                step="0.1"
                aria-label="agent-fee-percentage"/>
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
            <div className="form-text mb-3">Fee in % of purchase price</div>

            <div className="input-group">
              <input
                readOnly
                value={feeAmount==0 ? "" : addCurrency(addCommas(removeNonNumeric(Math.round(feeAmount))))} 
                type="text" 
                className="form-control disabledStyle" 
                aria-label="agent-fee-amount"/>
              <div className="input-group-append"> 
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
    </>
  )
}

export default Price;