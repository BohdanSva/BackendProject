import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import 
{ setUserType, selectUserType, setUserName, selectUserName, setUserSurname, selectUserSurname, setEmail, selectEmail, 
  setPassword, selectPassword, setData} 
from "../../features/account/accountSlice";
import './account.css';
import { useState } from 'react';

const Register = () => {
    // Hooks definitions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registrationComplete = () => navigate('/account/registered');
    const goBack = () => navigate('/account/login');
    const userType = useSelector(selectUserType);
    const userName = useSelector(selectUserName);
    const userSurname = useSelector(selectUserSurname);
    const userEmail = useSelector(selectEmail);
    const userPassword = useSelector(selectPassword);
    const [namePrompt, setNamePrompt] = useState("");
    const [surnamePrompt, setSurnamePrompt] = useState("");
    const [emailPrompt, setEmailPrompt] = useState("");
    const [passwordPrompt, setPasswordPrompt] = useState("");
    const [passwordConfirmPrompt, setPasswordConfirmPrompt] = useState("");

    // Validate and save every user search input into the store
    const onNameInput = (keystroke: any) => {
      if (keystroke === '') {
        setNamePrompt("");
      } else if (keystroke !== '' && keystroke.target.value.trim().length <= 1)  {
        keystroke.target.classList.add('is-invalid');
        setNamePrompt('Please enter a valid name'); // Create a message <div> for the user if validation fails
     } else {
        setNamePrompt("");
        keystroke.target.classList.add('is-valid');
        keystroke.target.classList.remove('is-invalid');
      }
    dispatch(setUserName(keystroke.target.value));
    }

    const onSurnameInput = (keystroke: any) => {
      if (keystroke === '') {
        setSurnamePrompt("");
      } else if (keystroke !== '' && keystroke.target.value.trim().length <= 1)  {
        keystroke.target.classList.add('is-invalid');
        setSurnamePrompt('Please enter a valid surname'); // Create a message <div> for the user if validation fails
     } else {
        setSurnamePrompt("");
        keystroke.target.classList.add('is-valid');
        keystroke.target.classList.remove('is-invalid');
      }
      dispatch(setUserSurname(keystroke.target.value)); 
    }

    const onEmailInput = (keystroke: any) => {
      if (keystroke === '') {
          setEmailPrompt("");
        } else if (!keystroke.target.checkValidity()) {
          keystroke.target.classList.add('is-invalid');
          setEmailPrompt('Please enter a valid email address'); // Create a message <div> for the user if validation fails
       } else {
          setEmailPrompt("");
          keystroke.target.classList.add('is-valid');
          keystroke.target.classList.remove('is-invalid');
        }
      dispatch(setEmail(keystroke.target.value));
    }

    const onPasswordInput = (keystroke: any) => {
      if (keystroke === '') {
          setPasswordPrompt("");
        } else if (keystroke !== '' && keystroke.target.value.trim().length <= 5) {
          keystroke.target.classList.add('is-invalid');
          setPasswordPrompt('Please enter a valid password with at least 6 characters'); // Create a message <div> for the user if validation fails
       } else {
          setPasswordPrompt("");
          keystroke.target.classList.add('is-valid');
          keystroke.target.classList.remove('is-invalid');
        }
        dispatch(setPassword(keystroke.target.value)); 
    }

    const onPasswordConfirm = (keystroke: any) => {
      if (keystroke === '') {
          setPasswordConfirmPrompt("");
        } else if (keystroke !== '' && keystroke.target.value!= userPassword) {
          keystroke.target.classList.add('is-invalid');
          setPasswordConfirmPrompt('Your password confirmation does not match.'); // Create a message <div> for the user if validation fails
       } else {
          setPasswordConfirmPrompt("");
          keystroke.target.classList.add('is-valid');
          keystroke.target.classList.remove('is-invalid');
        } 
    }

    // Functions
    const saveDetails = async () => {
      const registrationURL = `http://localhost:3001/account/register`;
      try {
          const {data} = await axios.request({
            url: registrationURL,
            method: "post",
            headers: {
              "content-type" : "application/x-www-form-urlencoded",
            },
            data: {
              "name" : `${userName}`,
              "surname" : `${userSurname}`,
              "email" : `${userEmail}`,
              "password" : `${userPassword}`,
              "userType" : `${userType}`,
            },
            });
            console.log(data);
            if (data.status === 0) {
              dispatch(setData(data)); // Save to state to show the error message in the "Registration successful/unsuccessful" page
            }
          } catch (error) {console.log(error);}
    }

    const registerDetails = async (e: any) => {
      e.preventDefault() 
      if (!emailPrompt) { // Execute if validation is passed
      await saveDetails();
      await registrationComplete();
      }
    };

    return ( 
    <>
    <div className="account">

    <div className="container-fluid text-center">
      <div className="row align-items-start">

        <div className="col left_box">
          <h1>Create your new account</h1>

          <div className="d-grid gap-2 col-md-5 mx-auto">
          <h2>New user registration</h2>

          <p>Please provide your new log-in details</p>

          <form className='needs-validation' noValidate>

            <div className='d-grid gap-2 col'>
              <input onInput={onNameInput} type="text" placeholder="First name" className='form-control' required/>
              <p className="invalid-feedback">{namePrompt}</p>
            </div>

            <div className='d-grid gap-2 col'>
              <input onInput={onSurnameInput} type="text" placeholder="Surname" className='form-control' required/>
              <p className="invalid-feedback">{surnamePrompt}</p>
            </div>

            <div className='d-grid gap-2 col'>
              <input onInput={onEmailInput} type="email" placeholder="Email" className='form-control' required/>
              <p className="invalid-feedback">{emailPrompt}</p>
            </div>

            <div className='d-grid gap-2 col'>
              <input onInput={onPasswordInput} type="password" placeholder="Password" className='form-control' required/>
              <p className="invalid-feedback">{passwordPrompt}</p>
            </div>

            <div className='d-grid gap-2 col'>
              <input onInput={onPasswordConfirm} type="password" placeholder="Confirm password" className='form-control' required/>
              <p className="invalid-feedback">{passwordConfirmPrompt}</p>
            </div>

            <div className='d-grid gap-2 col'>
            <button onClick={registerDetails} className="btn btn-outline-primary" type="submit">Register</button>
            </div>

          </form>

          <button onClick={goBack} className="btn btn-outline-primary" type="submit">Go back</button>

          </div>

        </div>

        <div className="col right_box"></div>

      </div>
    </div>

    </div>

    </>
    );
}
 
export default Register;

