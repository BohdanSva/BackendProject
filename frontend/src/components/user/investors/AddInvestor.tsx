import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { selectInvestorName, selectStrategyName, selectAssetClass, selectContactId, selectCurrency, selectDevelopment, 
  selectFutureAssetClass, selectMaxSize, selectMaxWalb, selectMinSize, selectMinWalb, selectMinYield, selectRenderView, 
  selectTargetDescription, selectTargetGeography, setContactId, setRenderView, setResetInvestorSlice } 
from "../../../features/investors/investorSlice";
import { setResetContactSlice, selectContactName, selectContactSurname, selectCompany, selectEmail, selectPhone, selectCity, 
  selectContactDate, selectContactRenderView, selectJob, selectRole, setData, setContactRenderView} from "../../../features/investors/contactSlice";
import Contact from "./1-Contact";
import Location from "./2-Location";
import Strategy from "./3-Strategy";
import Description from "./4-Description";
import '../user.css';

// Create a switch component to govern rendering of child components based on renderView value
interface SwitchInterface {
  test: any,
  children: any
}
const Switch = (props: SwitchInterface) => {
  const { test, children } = props
  // filter out only children with a matching prop (renderView value)
  return children.find((child: any) => {
    return child.props.value === test;
  })      
}

const AddInvestor = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderView = useSelector(selectRenderView);
  const contactRenderView = useSelector(selectContactRenderView);

  const investorName = useSelector(selectInvestorName);
  const strategyName = useSelector(selectStrategyName);
  const assetClass = useSelector(selectAssetClass);
  const developmentStatus = useSelector(selectDevelopment);
  const futureAssetClass = useSelector(selectFutureAssetClass);
  const targetGeography = useSelector(selectTargetGeography);
  const targetDescription = useSelector(selectTargetDescription);
  const minSize = useSelector(selectMinSize);
  const maxSize = useSelector(selectMaxSize);
  const currency = useSelector(selectCurrency);
  const minWalb = useSelector(selectMinWalb);
  const maxWalb = useSelector(selectMaxWalb);
  const minYield = useSelector(selectMinYield);
  const contactId = useSelector(selectContactId);

  const contactName = useSelector(selectContactName);
  const contactSurname = useSelector(selectContactSurname);
  const company = useSelector(selectCompany);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhone);
  const contactDate = useSelector(selectContactDate);
  const job = useSelector(selectJob);
  const role = useSelector(selectRole);
  const city = useSelector(selectCity);

  // Functions
  const backToDashboard = () => { 
    navigate('/user/investors/myinvestors');
  }
  const clickBack = () => {
    dispatch(setRenderView(-1))
  }
  const clickNext = () => {
    dispatch(setRenderView(+1))
  }
  const addInvestor = async () => {
    const dataURL = `http://localhost:3001/user/investors`;
    const token = localStorage.getItem("token");
    try {
      const {data} = await axios.request({
        url: dataURL,
        method: "post",
        headers: {
          "token": `${token}`,
        },
        data: {
          "investorName" : `${investorName}`,
          "strategyName" : `${strategyName}`,
          "assetClass" : `${assetClass}`,
          "development" : `${developmentStatus}`,
          "futureAssetClass" : `${futureAssetClass}`,
          "targetDescription" : `${targetDescription}`,
          "targetGeography" : `${targetGeography}`,
          "minSize" : `${minSize}`,
          "maxSize" : `${maxSize}`,
          "ccy" : `${currency}`,
          "minWalb" : `${minWalb}`,
          "maxWalb" : `${maxWalb}`,
          "minYield" : `${minYield}`,
          "contactId" : `${contactId}`,
        }
        });
      if (data.status === 1) {
        console.log("New investor added");
        dispatch(setResetInvestorSlice());
        dispatch(setResetContactSlice());
        navigate('/user/investors/myinvestors'); // Return back to user dashboard after new investor added to database
      }
    } 
    catch (error) {console.log(error);}
  }

  // Only used if a new contact is created to be associated with the investor
  const getContacts = async () => { // Get contacts and select the latest addition to save as contactId in investor slice
    const dataURL = `http://localhost:3001/user/contacts`;
    try {
    const {data} = await axios.get(
      dataURL, { headers : { token:localStorage.getItem("token") } 
    });
    if(data.status === 1) { // If token is valid
      // The last item in the array is the latest added contact, the ID of which we save into the investor slice
      dispatch(setContactId(data.results[data.results.length-1].id));
    }
    } 
    catch (error) {console.log(error);}
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
        getContacts(); // To get the auto-increment ID of the new contact from the SQL database
        dispatch(setRenderView(+1)); // Continue with onboarding the new investment once a new contact is created
        dispatch(setContactRenderView(-1));
      }
    } 
    catch (error) {console.log(error);}
  }

  return (
    <>
    <div className="user">
      <div className="container">

        <h1> Add new investor </h1>
        <p> Investor requirement, fund allocation or a single-focus investment strategy </p>

        <Switch test={renderView}>
          <Contact value={1}/>
          <Location value={2}/>
          <Strategy value={3}/>
          <Description value={4}/>
        </Switch>

        <div className="row">
          {renderView==1 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>
          }
          {renderView>1 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={clickBack}>Back</button>
          </div>
          }
          {renderView==1 && contactRenderView==2 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={addContact}>Add contact</button>
          </div>
          }
          {contactRenderView!=2 && renderView<4 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={clickNext}>Next</button>
          </div>
          }
          {renderView==4 &&
          <div className="d-grid gap-2 col-2 mx-auto">
            <button className="btn btn-outline-primary btn-lg" type="button" onClick={addInvestor}>Add investor</button>
          </div>
          }
        </div>

      </div>
    </div>
    </>
  )
}

export default AddInvestor;