import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, removeNonNumeric } from "../../../utils/formatting";
import { selectCurrency, selectPassingNoi, selectPassingRent, setLeaseBreak, setLeaseExpiry, setOccupancy, setOpex, 
  setPassingNoi, setPassingRent } 
from "../../../features/property/propertySlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Income = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const passingRent = useSelector(selectPassingRent);
  const passingNoi = useSelector(selectPassingNoi);
  const opex = passingNoi - passingRent;
  const [value, setValue] = useState(""); // Value shown to user is text formatted in '000
  const [valueNet, setValueNet] = useState(""); // Value shown to user is text formatted in '
  const today = new Date; // To calculate estimated lease expiry/break from WALT/WALB

  // Functions
  const addCurrency = (num: any) => `${currency} ` + num;
  const onPassingRentInput = (keystroke:any) => {
    setValue(addCurrency(addCommas(removeNonNumeric(keystroke.target.value)))); // Show user text value in '000
    dispatch(setPassingRent(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onPassingNoiInput = (keystroke:any) => {
    setValueNet(addCurrency(addCommas(removeNonNumeric(keystroke.target.value)))); // Show user text value in '000
    dispatch(setPassingNoi(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  useEffect(() => {
    dispatch(setOpex(opex));
  }, [valueNet])
  const onOccupancyInput = (select:any) => {
    dispatch(setOccupancy(select.target.value)); 
  }
  const onLeaseExpiryInput = (date:any) => {
    const leaseExpiry = new Date(date.target.value);
    dispatch(setLeaseExpiry(leaseExpiry.toISOString()));
  }
  const onWaltInput = (years:any) => {
    const estimatedExpiry = new Date;
    estimatedExpiry.setTime(today.getTime() + 86400*1000 * 365.25 * years.target.value); // 86,400,000 ms per day
    dispatch(setLeaseExpiry(estimatedExpiry.toISOString()));
  }
  const onLeaseBreakInput = (date:any) => {
    const leaseBreak = new Date(date.target.value);
    dispatch(setLeaseBreak(leaseBreak.toISOString()));
  }
  const onWalbInput = (years:any) => {
    const estimatedBreak = new Date;
    estimatedBreak.setTime(today.getTime() + 86400*1000 * 365.25 * years.target.value); // 86,400,000 ms per day
    dispatch(setLeaseBreak(estimatedBreak.toISOString()));
  }

  return (
    <>
    <div className="user">
      <div className="container">
        <h2>What is the current income?</h2>
        <form>

          <div className="row align-items-start">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Passing rent p.a. </label>
              <input
                onInput={onPassingRentInput}
                value={value}
                type="text" 
                className="form-control" 
                aria-describedby="passing-rent"/>
            </div>

            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Operating expenses p.a. </label>
              <input
                readOnly
                value={(passingRent==0 || passingNoi==0) ? "" : addCurrency(addCommas(removeNonNumeric(opex)))} 
                type="text" 
                className="form-control disabledStyle" 
                aria-describedby="net-area"/>
            </div>

          </div>
          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Net operating income (NOI) p.a. </label>
              <input
                onInput={onPassingNoiInput}
                value={valueNet}
                type="text" 
                className="form-control" 
                aria-describedby="net-operating-income"/>
            </div>
          </div>

          <div className="form-group col-3 mb-3">
            <label className="form-label"> Occupancy </label>
            <div className="input-group">
              <input
                onInput={onOccupancyInput}
                type="number" 
                className="form-control" 
                aria-label="occupancy"/>
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
            <div className="form-text">Current occupancy in % of net area</div>
          </div>

          <div className="row">

          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label"> Lease term </label>
            <div className="input-group">
              <div className="input-group-text gap-2">
                <input defaultChecked readOnly className="form-check-input mt-0" type="radio" name="leaseRadio" value="" aria-label="Radio button for following text input"/> No income or don't know &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              
            </div>
            <div className="input-group">
              <div className="input-group-text gap-2">
                <input className="form-check-input mt-0" type="radio" name="leaseRadio" value="" aria-label="Radio button for following text input"/>Lease expiry date
              </div>
              <input 
                onInput={onLeaseExpiryInput}
                type="date" 
                className="form-control"
                aria-label="unknown-lease-expiry-radio"/>
            </div>
            <div className="input-group">
              <div className="input-group-text gap-2">
                <input className="form-check-input mt-0" type="radio" name="leaseRadio" value="" aria-label="Radio button for following text input"/>WALT (in years) &nbsp;&nbsp;
              </div>
              <input 
                onInput={onWaltInput}
                type="number" 
                className="form-control" 
                aria-label="known-walt-radio"/>
            </div>
          </div>

          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label"> Lease break </label>
            <div className="input-group">
              <div className="input-group-text gap-2">
                <input defaultChecked readOnly className="form-check-input mt-0" type="radio" name="breakRadio" value="" aria-label="Radio button for following text input"/> No lease break or don't know &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
            <div className="input-group">
              <div className="input-group-text gap-2">
                <input className="form-check-input mt-0" type="radio" name="breakRadio" value="" aria-label="Radio button for following text input"/>Lease break date
              </div>
              <input
                onInput={onLeaseBreakInput}
                type="date" 
                className="form-control"
                aria-label="known-lease-term-radio"/>
            </div>
            <div className="input-group">
              <div className="input-group-text gap-2">
                <input className="form-check-input mt-0" type="radio" name="breakRadio" value="" aria-label="Radio button for following text input"/>WALB (in years) &nbsp;&nbsp;
              </div>
              <input
                onInput={onWalbInput}
                type="number"
                className="form-control"
                aria-label="known-walb-radio"/>
            </div>
          </div>

          </div>

        </form>
      </div>
    </div>
    </>
  )
}

export default Income;