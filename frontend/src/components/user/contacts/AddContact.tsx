import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setCity, setCompany, setContactDate, setEmail, setJob, setContactName, setPhone, setContactSurname, 
  setResetContactSlice, selectContactName, selectContactSurname, selectCompany, selectEmail, selectPhone,
  selectCity, selectContactDate, selectJob, selectRole, setRole} 
from "../../../features/investors/contactSlice";
import { removeNonNumeric } from "../../../utils/formatting";
import '../user.css';

const AddContact = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactName = useSelector(selectContactName);
  const contactSurname = useSelector(selectContactSurname);
  const company = useSelector(selectCompany);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhone);
  const job = useSelector(selectJob);
  const role = useSelector(selectRole);
  const contactDate = useSelector(selectContactDate);
  const city = useSelector(selectCity);

  // Functions
  const backToDashboard = () => { 
    dispatch(setResetContactSlice());
    navigate('/user/contacts/mycontacts');
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

  const addContact = async () => {
    const dataURL = `http://localhost:3001/user/contacts`;
    const token = localStorage.getItem("token");
    try {
      const {data} = await axios.request({
        url: dataURL,
        method: "post",
        headers: {
          "token": `${token}`,
        },
        data: {
          "name" : `${contactName}`,
          "surname" : `${contactSurname}`,
          "company" : `${company}`,
          "email" : `${email}`,
          "phone" : `${phone}`,
          "contactDate" : `${contactDate}`,
          "job" : `${job}`,
          "role" : `${role}`,
          "city" : `${city}`,
        }
        });
      if (data.status === 1) {
        console.log("New contact added");
        dispatch(setResetContactSlice());
        navigate('/user/contacts/mycontacts'); // Return back to contacts dashboard after new cotnact added
      }
    } 
    catch (error) {console.log(error);}
  }

  return (
    <>
    <div className="user">

      <div className="container">
        <h2 className="mb-5">Who is the contact person?</h2>
  
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
            <div className="form-text">Job title or role if any</div>
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

        <div className="row mt-5">
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={addContact}>Add contact</button>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default AddContact;