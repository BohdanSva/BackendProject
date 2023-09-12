import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import { selectData, setData } from "../../../features/investors/contactSlice";
import { selectAssetClass, selectContactId, selectCurrency, selectDevelopment, selectFutureAssetClass, selectInvestorName, 
    selectMaxSize, selectMaxWalb, selectMinSize, selectMinWalb, selectMinYield, selectStrategyName, selectTargetDescription, 
    selectTargetGeography, setContactId } 
from "../../../features/investors/investorSlice";

const ReplaceContact = () => {
    // Definitions
    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const { investorSlug }: any = useParams(); // investorSlug path configuration
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
        getData();
    }, []);

    const onSaveClick = async () => { // Save changes in the database
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

    const onContactInput = (select:any) => {
        dispatch(setContactId(select.value)); 
    }
    
return (
    <>
    <div className="user">
    
        <button
            className="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#replaceModal" 
            type="button" 
            > Replace contact person
        </button>

    {/* Modal to replace associated contact person */}
    <div className="modal fade" id="replaceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-2" id="replaceModalLabel">Replace contact</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Please select a contact person to be associated with this investor.</p>

            {/* Select from rolodex */}
            <Select options={selectOptions} onChange={onContactInput}/>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go back</button>
            <button 
              type="button" 
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onSaveClick}
            > Add this contact
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
    </>
);
};

export default ReplaceContact;
