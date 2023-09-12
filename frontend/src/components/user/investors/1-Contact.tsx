import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import axios from "axios";
import { setContactId } from "../../../features/investors/investorSlice";
import { setCity, setCompany, setContactDate, setEmail, setJob, setContactName, setPhone, setContactSurname, setRole, setData, 
  selectData, selectContactRenderView, setContactRenderView} 
from "../../../features/investors/contactSlice";
import { removeNonNumeric } from "../../../utils/formatting";
import '../user.css';

// Types
interface SwitchInterface {
  value: number,
}

const Contact = (props:SwitchInterface) => {
  // Definitions
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const contactRenderView = useSelector(selectContactRenderView) // Show/hide contact search panel or panel to add a new contact

  const selectOptions = data.map(item => { // Allow the user to select a contact person from the contacts database
    let options = {
      "value": `${item.id}`,
      "label": `${item.name} ${item.surname}`,
    };
    return options;
   });

  // Functions
  const getData = async () => {
    const dataURL = `http://localhost:3001/user/contacts`;
    try {
    const {data} = await axios.get(
      dataURL, { headers : { token:localStorage.getItem("token") } 
    });
    if(data.status === 1) { // If token is valid
      dispatch(setData(data.results)); // Data received from Axios is saved in the store and ready to be mapped over
    }
    } 
    catch (error) {console.log(error);}
  }
  useEffect(() => { 
      getData(); // Load all contacts at page load
  }, []);

  const onContactInput = (select:any) => {
    dispatch(setContactId(select.value)); 
  }
  const onNameInput = (keystroke:any) => {
    dispatch(setContactName(keystroke.target.value)); 
  }
  const onSurnameInput = (keystroke:any) => {
    dispatch(setContactSurname(keystroke.target.value)); 
  }
  const onCompanyInput = (keystroke:any) => {
    dispatch(setCompany(keystroke.target.value)); 
  }
  const onJobInput = (keystroke:any) => {
    dispatch(setJob(keystroke.target.value)); 
  }
  const onRoleInput = (select:any) => {
    dispatch(setRole(select.target.value)); 
  }
  const onEmailInput = (keystroke:any) => {
    dispatch(setEmail(keystroke.target.value)); 
  }
  const onPhoneInput = (keystroke:any) => {
    dispatch(setPhone(removeNonNumeric(keystroke.target.value))); 
  }
  const onCityInput = (keystroke:any) => {
    dispatch(setCity(keystroke.target.value)); 
  }
  const onLastContactInput = (keystroke:any) => {
    dispatch(setContactDate(keystroke.target.value)); 
  }

  return (
    <>
    <div className="user">

      <div className="container">
        <h2>Who is the contact person?</h2>
      
        {/* Select from rolodex */}
        <div className="d-grid gap-2 col-4 mb-4">
          <div className="form-check mb-3">
            <input 
              onChange={() => dispatch(setContactRenderView(-1))}
              className="form-check-input" 
              checked={contactRenderView == 1} type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            Search contacts
            </label>
          </div>
          { contactRenderView==1 &&
          <Select options={selectOptions} onChange={onContactInput}/>
          }
        </div>

        {/* Create a new contact person for the investment strategy*/}
        <div className="form-check mt-5">
          <input
            onChange={() => dispatch(setContactRenderView(+1))}
            className="form-check-input"
            checked={contactRenderView == 2} type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Create a new contact
          </label>
        </div>
        { contactRenderView==2 &&
        <>
        <div className="row align-items-start">
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Name</label>
            <input onInput={onNameInput} type="name" className="form-control" aria-describedby="name"/>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Surname</label>
            <input onInput={onSurnameInput} type="street" className="form-control" aria-describedby="surname"/>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Company</label>
            <input onInput={onCompanyInput} type="company" className="form-control" aria-describedby="company"/>
            <div className="form-text">Contact company name if any</div>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Job title</label>
            <input onInput={onJobInput} type="job" className="form-control" aria-describedby="job title"/>
            <div className="form-text">Job title if any</div>
          </div>
        </div>

        <div className="row align-items-start">
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Email</label>
            <input onInput={onEmailInput} type="email" className="form-control" aria-describedby="email"/>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Phone number</label>
            <input onInput={onPhoneInput} type="phone" className="form-control" aria-describedby="phone"/>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Role</label>
            <select onInput={onRoleInput} className="form-select" aria-label="role">
              <option value=""></option>
              <option value="advisor">Advisor</option>
              <option value="broker">Broker</option>
              <option value="investor">Investor</option>
            </select>
          </div>
        </div>

        <div className="row align-items-start">
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">City</label>
            <input onInput={onCityInput} type="city" className="form-control" aria-describedby="city"/>
            <div className="form-text">City of permanent residence if any</div>
          </div>
          <div className="d-grid gap-2 col-3 mb-4">
            <label className="form-label">Last contact date</label>
            <input onInput={onLastContactInput} type="date" className="form-control" aria-describedby="last contact"/>
          </div>
        </div>

        </>
        }

      </div>
    </div>
    </>
  )
}

export default Contact;