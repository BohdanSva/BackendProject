import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { addCommas, addPercent, formatDate, timeFromToday } from "../../../utils/formatting";
import { selectAssetClass, selectContactId, selectCreated, selectCurrency, selectDevelopment, selectFutureAssetClass,
    selectTargetGeography, selectInvestorName, selectMaxSize, selectMaxWalb, selectMinSize, selectMinWalb, selectMinYield, selectRenderView, 
    selectStrategyName, selectTargetDescription,  setAssetClass, setContactId, setCreated, setCurrency, setDevelopment, 
    setFutureAssetClass, setInvestorName, setMaxSize, setMaxWalb, setMinSize, setMinWalb, setRenderView, setResetInvestorSlice,
    setStrategyName, setTargetDescription, setTargetGeography, setMinYield } 
from "../../../features/investors/investorSlice";
import { selectCity, selectCompany, selectContactDate, selectContactName, selectContactSurname, selectEmail, selectJob, 
    selectPhone, selectRole, setCity, setCompany, setContactDate, setContactName, setContactSurname, setEmail, setJob, setPhone,
    setResetContactSlice, setRole } 
from "../../../features/investors/contactSlice";
import ReplaceContact from "./ReplaceContact";

const DetailedView = () => {
  // Definitions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { investorSlug }: any = useParams(); // investorSlug path configuration
  const renderView = useSelector(selectRenderView);
  const created = useSelector(selectCreated);
  const investorName = useSelector(selectInvestorName);
  const strategyName = useSelector(selectStrategyName);
  const assetClass = useSelector(selectAssetClass);
  const developmentStatus = useSelector(selectDevelopment);
  const futureAssetClass = useSelector(selectFutureAssetClass);
  const targetDescription = useSelector(selectTargetDescription);
  const targetGeography = useSelector(selectTargetGeography);
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
  const job = useSelector(selectJob);
  const role = useSelector(selectRole);
  const city = useSelector(selectCity);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhone);
  const lastContact = useSelector(selectContactDate);

  // Functions
  const addCurrency = (num: any) => `${currency} ` + num;

  const getData = async () => { // Get only the data for the selected investor ID
    const dataURL = `http://localhost:3001/user/investors/${investorSlug}`;
    try {
    const {data} = await axios.get(
      dataURL, { headers : { token:localStorage.getItem("token") } 
    });
    if(data.status === 1) { // If token is valid
      // Investment strategy details  
      dispatch(setCreated(data.results[0].created));
      dispatch(setInvestorName(data.results[0].investorName));
      dispatch(setStrategyName(data.results[0].strategyName));
      dispatch(setAssetClass(data.results[0].assetClass));
      dispatch(setDevelopment(data.results[0].development));
      dispatch(setFutureAssetClass(data.results[0].futureAssetClass));
      dispatch(setTargetDescription(data.results[0].targetDescription));
      dispatch(setTargetGeography(data.results[0].targetGeography));
      dispatch(setMinSize(data.results[0].minSize));
      dispatch(setMaxSize(data.results[0].maxSize));
      dispatch(setCurrency(data.results[0].ccy));
      dispatch(setMinWalb(data.results[0].minWalb));
      dispatch(setMaxWalb(data.results[0].maxWalb));
      dispatch(setMinYield(data.results[0].minYield));
      dispatch(setContactId(data.results[0].contactId));

      // Contact details
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
      dispatch(setResetContactSlice());
      navigate('/user/investors/myinvestors');
    }

    const onEditClick = () => { // Remove readonly property
      dispatch(setRenderView(+1));
    }
    
    const onInvestorNameInput = (keystroke: any) => { // Save change into state
      dispatch(setInvestorName(keystroke.target.value))
    }
    const onStrategyNameInput = (keystroke: any) => { // Save change into state
      dispatch(setStrategyName(keystroke.target.value))
    }
    const onAssetClassInput = (select: any) => { // Save change into state
        dispatch(setAssetClass(select.target.value))
    }
    const onDevelopmentInput = (select: any) => { // Save change into state
        dispatch(setDevelopment(select.target.value))
    }
    const onFutureAssetClassInput = (keystroke: any) => { // Save change into state
        dispatch(setFutureAssetClass(keystroke.target.value))
    }
    const onGeographyInput = (keystroke: any) => { // Save change into state
        dispatch(setTargetGeography(keystroke.target.value))
    }
    const onTargetDescriptionInput = (keystroke: any) => { // Save change into state
        dispatch(setTargetDescription(keystroke.target.value))
    }
    const onMinSizeInput = (keystroke: any) => { // Save change into state
        dispatch(setMinSize(keystroke.target.value))
    }
    const onMaxSizeInput = (keystroke: any) => { // Save change into state
        dispatch(setMaxSize(keystroke.target.value))
    }
    const onMinWalbInput = (keystroke: any) => { // Save change into state
        dispatch(setMinWalb(Number(keystroke.target.value)))
    }
    const onMaxWalbInput = (keystroke: any) => { // Save change into state
        dispatch(setMaxWalb(Number(keystroke.target.value)))
    }
    const onMinYieldInput = (keystroke: any) => { // Save change into state
        dispatch(setMinYield(keystroke.target.value))
    }

    const onSaveClick = async () => { // Save changes in the database
      dispatch(setRenderView(-1));
      const dataURL = `http://localhost:3001/user/investors/${investorSlug}`;
      try {
        const {data} = await axios.request({
          url: dataURL,
          method: "patch",
          headers: {
            "token": localStorage.getItem("token"),
          },
          data: {
            "id"   : `${investorSlug}`,
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
          console.log("Update successful")
        }
      } 
      catch (error) {console.log(error);}
    }

    const onDeleteClick = async () => {
      const dataURL = `http://localhost:3001/user/investors/${investorSlug}`;
      try {
        const {data} = await axios.request({
          url: dataURL,
          method: "delete",
          headers: {
            "token": localStorage.getItem("token"),
          },
          data: {
            "id" : `${investorSlug}`
          }
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
        <h2 className="text-start">{investorName}</h2>
        <h3 className="text-start">{strategyName}</h3>
        <p className="mb-5 text-start"> Created on {formatDate(created)}</p>

        <div className="row text-start">
          <div className="col mb-2">
                <h3 className="mb-3">Details and contacts</h3>
                <div>Name: <input
                className={renderView==1 ? "uneditableStyle" : ""}
                readOnly={renderView==1 ? true : false}
                name="name"
                value={investorName}
                type="text"
                onChange={onInvestorNameInput}
                placeholder={investorName ? "Investor name" : ""}
                /></div>
                <div>Strategy name: <input
                className={renderView==1 ? "uneditableStyle" : ""}
                readOnly={renderView==1 ? true : false}
                name="street"
                value={strategyName}
                type="text"
                onChange={onStrategyNameInput}
                placeholder={strategyName ? "Strategy name" : ""}
                /></div>

                <div className="mt-3">Decision maker:</div>
                <div>{contactName} {contactSurname}, {role}</div>
                {company ? <div>{job}, {company}</div> : ""}
                <div>{city} time zone</div>
                <div>{email}, {phone}</div>
                <div className="col mb-5">
                    <div className="mt-3">Last contacted: {formatDate(lastContact)}</div>
                </div>
          </div>
          
          <div className="col mb-2">
                <h3 className="mb-3">Target use and area</h3>
                {renderView==1 ? 
                <p className="mb-0">Asset class: {assetClass}</p>
                :
                <p>Asset class: <select onInput={onAssetClassInput} value={assetClass} aria-label="asset class">
                <option value="hotel">Hotel</option>
                <option value="land">Land plot</option>
                <option value="logistics">Logistics</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="residential">Residential</option>
                <option value="student">Student housing</option>
                </select></p>
                }
                {renderView==1 ? 
                <p className="mb-0">Development potential: {developmentStatus=="development" ? "yes" : "no"}</p>
                :
                <p>Development potential: <select onInput={onDevelopmentInput} value={developmentStatus} aria-label="development potential">
                <option value="development">Yes</option>
                <option value="completed">No</option>
                </select></p>
                }
                {renderView==1 ? 
                <p className="mb-0">Future asset class: {futureAssetClass} (after development)</p>
                :
                <p>Asset class: <select onInput={onFutureAssetClassInput} value={futureAssetClass} aria-label="future asset class">
                <option value="hotel">Hotel</option>
                <option value="logistics">Logistics</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="residential">Residential</option>
                <option value="student">Student housing</option>
                </select></p>
                }
                {renderView==1 ? 
                <>
                <p className="d-grid mt-2 mb-0">Target areas: </p>
                <p className="d-grid mb-0">{targetGeography}</p>
                </>
                :
                <>
                <div className="d-grid">
                <textarea 
                value={targetGeography}
                className="form-control"
                onInput={onGeographyInput}
                rows={3}
                aria-label="investment-geography"
                ></textarea>
                </div>
                </>
                }
            </div>

            <div className="col mb-2">
                <h3 className="mb-3">Investment KPIs</h3>

                {renderView==1 ? 
                <p className="mb-0">Minimum deal size: {addCurrency(addCommas(minSize))}</p>
                :
                <div>Minimum deal size: {currency}<input
                className={renderView==1 ? "uneditableStyle" : ""}
                readOnly={renderView==1 ? true : false}
                name="minSize"
                value={minSize}
                type="text"
                onChange={onMinSizeInput}
                placeholder={minSize ? "Minimum ticket" : ""}
                /></div>
                }
                {renderView==1 ? 
                <p className="mb-0">Maximum deal size: {addCurrency(addCommas(maxSize))}</p>
                :
                <div>Maximum deal size: {currency}<input
                className={renderView==1 ? "uneditableStyle" : ""}
                readOnly={renderView==1 ? true : false}
                name="maxSize"
                value={maxSize}
                type="text"
                onChange={onMaxSizeInput}
                placeholder={maxSize ? "Maximum ticket" : ""}
                /></div>
                }
                <div>Term certain (min years): <input
                className={renderView==1 ? "uneditableStyle" : ""}
                readOnly={renderView==1 ? true : false}
                name="minWalb"
                value={minWalb}
                type="text"
                onChange={onMinWalbInput}
                placeholder={minWalb ? "Min WALB" : ""}
                /></div>
                <div>Term certain (max years): <input
                className={renderView==1 ? "uneditableStyle" : ""}
                readOnly={renderView==1 ? true : false}
                name="maxWalb"
                value={maxWalb}
                type="text"
                onChange={onMaxWalbInput}
                placeholder={maxWalb ? "Max WALB" : ""}
                /></div>
                {renderView==1 ? 
                <p className="mb-0">Yield target: {addPercent(minYield/100)}</p>
                :
                <div>Yield target: <input
                name="minYield"
                value={minYield}
                type="number"
                step="0.05"
                onChange={onMinYieldInput}
                placeholder="Target yield"
                />%</div> 
                }
            </div>

        </div>

        <div className="row text-start mb-5">
            <div className="col mb-5">
                <h3 className="mb-3">Fund strategy</h3>
                {renderView==1 ? 
                <>
                <p className="d-grid mb-0">{targetDescription}</p>
                </>
                :
                <>
                <div className="d-grid">
                <textarea 
                value={targetDescription}
                className="form-control"
                onInput={onTargetDescriptionInput}
                rows={3}
                aria-label="investment-description"
                ></textarea>
                </div>
                </>
                }
            </div>
        </div>

        <div className="row">
          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            <button className="btn btn-outline-primary" type="button" onClick={backToDashboard}>Back to dashboard</button>
          </div>

          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            {renderView==1 ?
            <button className="btn btn-outline-warning" type="button" onClick={onEditClick}>Edit details</button> 
            :
            <button className="btn btn-outline-danger" type="button" onClick={onSaveClick}>Save details</button>             
            }
          </div>

          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
          <ReplaceContact />
          </div>

          <div className="d-grid gap-2 col-md-2 col-sm-4 mx-auto">
            <button
              className="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal" 
              type="button" 
              > Delete investor
            </button>
          </div>
          
        </div>
      </div>
    
    {/* Modal for deletion */}
    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-2" id="deleteModalLabel">Delete investor</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            This investor will be irretrievably deleted. Only the contact person will remain saved in your contacts for future use. 
            Do you wish to continue?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go back</button>
            <button 
              type="button" 
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onDeleteClick}
            > Delete investor
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