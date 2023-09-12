import { useDispatch, useSelector } from "react-redux";
import '../user.css';
import { 
  setName, setStreet, setCity, setPostcode } 
from "../../../features/property/propertySlice";

// Types
interface SwitchInterface {
  value: number,
}

const Location = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();

  // Functions
  const onNameInput = (keystroke:any) => {
    dispatch(setName(keystroke.target.value)); 
  }
  const onStreetInput = (keystroke:any) => {
    dispatch(setStreet(keystroke.target.value)); 
  }
  const onCityInput = (keystroke:any) => {
    dispatch(setCity(keystroke.target.value)); 
  }
  const onPostcodeInput = (keystroke:any) => {
    dispatch(setPostcode(keystroke.target.value)); 
  }

  return (
    <>
    <div className="user">

      <div className="container">
        <h2>Where is it located?</h2>
      
        <form>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Name</label>
            <input onInput={onNameInput} type="name" className="form-control" aria-describedby="propertyName"/>
            <div className="form-text">Name of the property or project</div>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Street</label>
            <input onInput={onStreetInput} type="street" className="form-control" aria-describedby="propertyStreet"/>
            <div className="form-text">Street number and street name</div>
          </div>
          <div className="d-grid gap-2 col-3 mb-3">
            <label className="form-label">City</label>
            <input onInput={onCityInput} type="city" className="form-control" aria-describedby="propertyCity"/>
          </div>
          <div className="d-grid gap-2 col-3 mb-3">
            <label className="form-label">Postcode</label>
            <input onInput={onPostcodeInput} type="postcode" className="form-control" aria-describedby="propertyPostcode"/>
          </div>
        </form>

      </div>

    </div>
    </>
  )
}

export default Location;