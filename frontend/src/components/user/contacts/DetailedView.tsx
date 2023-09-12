import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { addCommas, addPercent, formatDate, timeFromToday } from "../../../utils/formatting";
import { setCity, setCompany, setContactDate, setContactName, setContactSurname, setEmail, setJob, setPhone, setRole, 
  setResetContactSlice, selectContactName, selectContactSurname, selectCompany, selectJob, selectRole, selectCity,
  selectEmail, selectPhone, selectContactDate, setCreated, selectCreated} 
from "../../../features/investors/contactSlice";

const DetailedView = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactSlug }: any = useParams(); // investorSlug path configuration
  const [editable,setEditable] = useState(1);
  const created = useSelector(selectCreated);
  const name = useSelector(selectContactName);
  const surname = useSelector(selectContactSurname);
  const company = useSelector(selectCompany);
  const job = useSelector(selectJob);
  const role = useSelector(selectRole); 
  const city = useSelector(selectCity);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhone);
  const contactDate = useSelector(selectContactDate);

  // Functions
  const getData = async () => { // Get only the data for the selected investor ID
    const dataURL = `http://localhost:3001/user/contacts/${contactSlug}`;
    try {
    const {data} = await axios.get(
      dataURL, { headers : { token:localStorage.getItem("token") } 
    });
    if(data.status === 1) { // If token is valid
      dispatch(setCreated(data.results[0].created));
      dispatch(setContactName(data.results[0].name));
      dispatch(setContactSurname(data.results[0].surname));
      dispatch(setCompany(data.results[0].company));
      dispatch(setJob(data.results[0].job));
      dispatch(setRole(data.results[0].role));
      dispatch(setCity(data.results[0].city));
      dispatch(setEmail(data.results[0].email));
      dispatch(setPhone(data.results[0].phone));
      dispatch(setContactDate(data.results[0].contactDate));
    }
    } 
      catch (error) {console.log(error);}
    }
    useEffect(() => {
        getData();
    }, []);

    const backToDashboard = () => { 
      setResetContactSlice();
      navigate('/user/contacts/mycontacts');
    }

    const onEditClick = () => { // Remove readonly property
      setEditable(-1);
    }
    const onNameInput = (keystroke: any) => {
      dispatch(setContactName(keystroke.target.value))
    }
    const onSurnameInput = (keystroke: any) => {
      dispatch(setContactSurname(keystroke.target.value))
    }
    const onCompanyInput = (keystroke: any) => {
      dispatch(setCompany(keystroke.target.value))
    }
    const onEmailInput = (keystroke: any) => {
      dispatch(setEmail(keystroke.target.value))
    }
    const onPhoneInput = (keystroke: any) => {
      dispatch(setPhone(keystroke.target.value))
    }
    const onContactDateInput = (keystroke: any) => {
      dispatch(setContactDate(keystroke.target.value))
    }
    const onJobInput = (keystroke: any) => {
      dispatch(setJob(keystroke.target.value))
    }
    const onRoleInput = (keystroke: any) => {
      dispatch(setRole(keystroke.target.value))
    }
    const onCityInput = (keystroke: any) => {
      dispatch(setCity(keystroke.target.value))
    }

    const onSaveClick = async () => { // Save changes in the database
      setEditable(+1);
      const dataURL = `http://localhost:3001/user/contacts/${contactSlug}`;
      try {
        const {data} = await axios.request({
          url: dataURL,
          method: "patch",
          headers: {
            "token": localStorage.getItem("token"),
          },
          data: {
            "name" : `${name}`,
            "surname" : `${surname}`,
            "company" : `${company}`,
            "email" : `${email}`,
            "phone" : `${phone}`,
            "contactDate" : `${contactDate}`,
            "job" : `${job}`,
            "role" : `${role}`,
            "city" : `${city}`
          }
          });
        if (data.status === 1) {
          console.log("Update successful")
        }
      } 
      catch (error) {console.log(error);}
    }

    const onDeleteClick = async () => {
      const dataURL = `http://localhost:3001/user/contacts/${contactSlug}`;
      try {
        const {data} = await axios.request({
          url: dataURL,
          method: "delete",
          headers: {
            "token": localStorage.getItem("token"),
          },
          });
          console.log(data);
        if (data.status === 1) {
          console.log("Delete successful")
          backToDashboard(); 
        }
      } 
      catch (error) {console.log(error);}
    }
    
    return (
    <>
    <div className="user">   

      <div className="container text-center">  
        <h1 className="text-start">Detailed View</h1>
        <h2 className="text-start">{name? name+" " : ""}{surname}</h2>
        <p className="mb-5 text-start"> Created on {formatDate(created)}</p>

        <div className="row text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Basic details</h3>
              <div>Name: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="name"
                  value={name}
                  type="text"
                  onChange={onNameInput}
                  placeholder={name ? "Contact name" : ""}
                />
              </div>
              <div>Surname: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="surname"
                  value={surname}
                  type="text"
                  onChange={onSurnameInput}
                  placeholder={surname ? "Contact surname" : ""}
                />
              </div>
              <div>Role: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="role"
                  value={role}
                  type="text"
                  onChange={onRoleInput}
                  placeholder={role ? "Business role" : ""}
                />
              </div>
          </div>
          <div className="col mb-2">
            <h3 className="mb-3">Contact</h3>
              <div>Email: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="email"
                  value={email}
                  type="text"
                  onChange={onEmailInput}
                  placeholder={email ? "Email" : ""}
                />
              </div>
              <div>Telephone number: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="phone"
                  value={phone}
                  type="text"
                  onChange={onPhoneInput}
                  placeholder={phone ? "Tel. number" : ""}
                />
              </div>
              <div>Location: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="city"
                  value={city}
                  type="text"
                  onChange={onCityInput}
                  placeholder={city ? "City of residence" : ""}
                />
              </div>
          </div>
          <div className="col mb-2">
            <h3 className="mb-3">Company</h3>
              <div>Company: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="company"
                  value={company}
                  type="text"
                  onChange={onCompanyInput}
                  placeholder={company ? "Company name" : ""}
                />
              </div>
              <div>Job title: 
                <input
                  className={editable==1 ? "uneditableStyle" : ""}
                  readOnly={editable==1 ? true : false}
                  name="job"
                  value={job}
                  type="text"
                  onChange={onJobInput}
                  placeholder={job ? "Job title" : ""}
                />
              </div>
          </div>
        </div>

        <div className="row mt-3 text-start">
          <div className="col mb-5">
            <h3 className="mb-3">Contact log</h3>
            {editable==1 ? 
            <p className="mb-0">Last contact: {contactDate ? formatDate(contactDate) : "n/a"}</p>
            :
            <div>Last contact: <input
              name="contactDate"
              value={contactDate}
              type="date"
              onChange={onContactDateInput}
            /></div> 
            }
          </div>
        </div>    

        <div className="row mt-5">
          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            <button className="btn btn-outline-primary" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>

          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            {editable==1 ?
            <button className="btn btn-outline-warning" type="button" onClick={onEditClick}>Edit details</button> 
            :
            <button className="btn btn-outline-danger" type="button" onClick={onSaveClick}>Save details</button>             
            }
          </div>

          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            <button
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal" 
              type="button" 
              > Delete contact
            </button>
          </div>
          
        </div>
      </div>
    
    {/* Modal for deletion */}
    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-2" id="deleteModalLabel">Delete contact</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            This contact will be irretrievably deleted. Do you wish to continue?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go back</button>
            <button 
              type="button" 
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onDeleteClick}
            > Delete contact
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
    </>
    )
}

export default DetailedView;