import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommas, removeNonNumeric } from "../../../utils/formatting";
import {
  selectCurrency, selectFutureNoi, selectFutureRent, setCapex, setFutureNoi, setFutureOpex, setFutureRent, setGdv } 
from "../../../features/property/propertySlice";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Development = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const futureRent = useSelector(selectFutureRent);
  const futureNoi = useSelector(selectFutureNoi);
  const futureOpex = futureNoi - futureRent;
  const [value, setValue] = useState(""); // Value shown to user is text formatted in '000
  const [valueNet, setValueNet] = useState(""); // Value shown to user is text formatted in '000
  const [valueGdv, setValueGdv] = useState(""); // Value shown to user is text formatted in '000
  const [valueCapex, setValueCapex] = useState(""); // Value shown to user is text formatted in '000

  // Functions
  const addCurrency = (num: any) => `${currency} ` + num;
  const onFutureRentInput = (keystroke:any) => {
    setValue(addCurrency(addCommas(removeNonNumeric(keystroke.target.value)))); // Show user text value in '000
    dispatch(setFutureRent(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onFutureNoiInput = (keystroke:any) => {
    setValueNet(addCurrency(addCommas(removeNonNumeric(keystroke.target.value)))); // Show user text value in '000
    dispatch(setFutureNoi(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  useEffect(() => {
    dispatch(setFutureOpex(futureOpex));
  }, [valueNet])
  const onGdvInput = (keystroke:any) => {
    setValueGdv(addCurrency(addCommas(removeNonNumeric(keystroke.target.value)))); // Show user text value in '000
    dispatch(setGdv(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }
  const onCapexInput = (keystroke:any) => {
    setValueCapex(addCurrency(addCommas(removeNonNumeric(keystroke.target.value)))); // Show user text value in '000
    dispatch(setCapex(Number(removeNonNumeric(keystroke.target.value)))); // Save to state as number
  }

  return (
    <>
    <div className="user">
      <div className="container">
        <h2>What is the development potential?</h2>
        <form>

          <div className="row align-items-start">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Projected rental income p.a. </label>
              <input
                onInput={onFutureRentInput}
                value={value}
                type="text" 
                className="form-control" 
                aria-describedby="passing-rent"/>
            </div>

            {!futureNoi &&
            <div style={{visibility: "hidden", marginLeft: "-10000px"}}></div>
            }
            {!futureRent &&
            <div style={{visibility: "hidden", marginLeft: "-10000px"}}></div>
            }
            {futureRent && futureNoi &&
            <div className="d-grid gap-2 col-4 mb-4">
              <label className="form-label"> Post-development operating expenses p.a. </label>
              <input
                readOnly
                value={addCurrency(addCommas(removeNonNumeric(futureOpex)))} 
                type="text" 
                className="form-control disabledStyle" 
                aria-describedby="net-area"/>
            </div>
            }
          </div>

          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Projected NOI p.a. </label>
              <input
                onInput={onFutureNoiInput}
                value={valueNet}
                type="text" 
                className="form-control" 
                aria-describedby="net-operating-income"/>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Gross development value (GDV) </label>
              <input
                onInput={onGdvInput}
                value={valueGdv}
                type="text" 
                className="form-control" 
                aria-describedby="net-operating-income"/>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="d-grid gap-2 col-3 mb-4">
              <label className="form-label"> Total CAPEX </label>
              <input
                onInput={onCapexInput}
                value={valueCapex}
                type="text" 
                className="form-control" 
                aria-describedby="net-operating-income"/>
              <div className="form-text">Total construction cost, excluding development finance</div>
            </div>
          </div>

        </form>
      </div>
    </div>
    </>
  )
}

export default Development;