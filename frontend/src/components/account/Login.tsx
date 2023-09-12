import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setEmail, selectEmail, setPassword, selectPassword} from "../../features/account/accountSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './account.css';

const Login = () => {
    // Hooks definitions
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userEmail = useSelector(selectEmail);
    const userPassword = useSelector(selectPassword);
    const [showPassword, setShowPassword] = useState(false);

    // Validation
    const [emailPrompt, setEmailPrompt] = useState("");
    const [passwordPrompt, setPasswordPrompt] = useState("");

    // Clean state on navigating to login
    useEffect(() => {
      dispatch(setEmail(""));
      dispatch(setPassword(""));
    }, []);

    // Validate and save every user search input into the store
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
        } else if (keystroke !== '' && keystroke.target.value.trim().length <= 3) {
          setPasswordPrompt('Please enter a valid password'); // Create a message <div> for the user if validation fails
          keystroke.target.classList.add('is-invalid');
       } else {
          setPasswordPrompt("");
          keystroke.target.classList.add('is-valid');
          keystroke.target.classList.remove('is-invalid');
        }
        dispatch(setPassword(keystroke.target.value)); 
      }

    // Functions
    const attemptLogin = async () => {
      if (!emailPrompt && !passwordPrompt) { // Execute if validation is passed
        const loginURL = `http://localhost:3001/account/login`;
        try {
            const {data} = await axios.request({ // data = res.send that the backend sends to frontend
            url: loginURL,
            method: "post",
            headers: {
                "content-type" : "application/x-www-form-urlencoded",
            },
            data: {
                "email" : `${userEmail}`,
                "password" : `${userPassword}`,
            },
        });
        if (data.status === 1) { // If log-in details correct
          localStorage.setItem("token",data.token) // Store the token in local storage
          localStorage.setItem("type",data.userType) // Store user type in local storage
          
          switch (data.userType) { // Send the user to the correct landing page
            case ("user"):
              navigate('/user/menu');
              break;
            case ("admin"):
              navigate('/admin/menu');
              break;
            }
        } else {
          console.log("Incorrect login");
        }
        } catch (error) {console.log(error);}
      }
    }

    const clickRegister = () => navigate('/account/register');

    return ( 
    <>
    <div className="account">

    <div className="container-fluid text-center">
      <div className="row align-items-start">

        <div className="col left_box">
          <h1>Welcome</h1>

          <div className="d-grid gap-2 col-md-5 mx-auto">
            <h2>Secured Login</h2>

            <p>Login with your current username and password</p>

            <input
              className="form-control"
              onInput={onEmailInput}
              type="email"
              placeholder="Email" 
              required/>
            <div className="invalid-feedback">{emailPrompt}</div>

            <div className="input-group">
              <input
                className="form-control"
                id="password_input"
                onInput={onPasswordInput}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <div className="input-group-append">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setShowPassword(!showPassword)}
                > {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
              <div className="invalid-feedback">{passwordPrompt}</div>
            </div>

            <div className='d-grid gap-2 col'>
              <button id="login" onClick={attemptLogin} className="btn btn-outline-primary" type="submit">Log in</button>
            </div>
            
            <div className='d-grid gap-2 col'>
              <button onClick={clickRegister} className="btn btn-outline-primary" type="submit"> Register </button>
            </div>

            <p style={{marginTop: "20px"}}>By logging in, you accept the Terms of Use</p>
          </div>

        </div>

        <div className="col right_box"></div>

      </div>
    </div>

    </div>

    </>
    );
}
 
export default Login;
