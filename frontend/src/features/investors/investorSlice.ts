import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface InvestorState {
// Data rendering
  data: Array<any>;
  created: string;
  renderView: number;

// New investor strategy onboarding
  investorName: string;  
  strategyName: string;
  assetClass: string;
  development: string;
  futureAssetClass: string;
  targetDescription: string;
  targetGeography: Array<any>;
  minSize: number;
  maxSize: number;
  currency: string;
  minWalb: number;
  maxWalb: number;
  minYield: number;
  contactId: number;
}

const initialState: InvestorState = {
// Data rendering
  data: [],
  created: "",
  renderView: 1,

// New investor strategy onboarding
  investorName: "", 
  strategyName: "",
  assetClass: "",
  development: "completed",
  futureAssetClass: "",
  targetDescription: "",
  targetGeography: [],
  minSize: 5000000,
  maxSize: 50000000,
  currency: "GBP",
  minWalb: 0,
  maxWalb: 30,
  minYield: 0,
  contactId: 0,
}

export const investorSlice = createSlice({
  name: "investor",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  // Data rendering
  setData: (state, action) => {
    state.data = action.payload;
  },
  setCreated: (state, action) => {
    state.created = action.payload;
  },
  setRenderView: (state, action) => {
    state.renderView += action.payload;
  },
  setResetInvestorSlice: () => initialState,

  // New investor onboarding
  setInvestorName: (state, action) => {
    state.investorName = action.payload;
  },
  setStrategyName: (state, action) => {
    state.strategyName = action.payload;
  },
  setAssetClass: (state, action) => {
    state.assetClass = action.payload;
  },
  setDevelopment: (state, action) => {
    state.development = action.payload;
  },
  setFutureAssetClass: (state, action) => {
    state.futureAssetClass = action.payload;
  },
  setTargetDescription: (state, action) => {
    state.targetDescription = action.payload;
  },
  addToGeography: (state, action) => { // add to array
    state.targetGeography = [...state.targetGeography, action.payload];
  },
  removeFromGeography: (state, action) => { // remove from array
    state.targetGeography = [...state.targetGeography.filter(item => item !== action.payload)];
  },
  setTargetGeography: (state, action) => { // set state, e.g. on download from SQL (to avoid adding multiple times to array)
    state.targetGeography = action.payload;
  },
  setMinSize: (state, action) => {
    state.minSize = action.payload;
  },
  setMaxSize: (state, action) => {
    state.maxSize = action.payload;
  },
  setCurrency: (state, action) => {
    state.currency = action.payload;
  },
  setMinWalb: (state, action) => {
    state.minWalb = action.payload;
  },
  setMaxWalb: (state, action) => {
    state.maxWalb = action.payload;
  },
  setMinYield: (state, action) => {
    state.minYield = action.payload;
  },
  setContactId: (state, action) => {
    state.contactId = action.payload;
  },
  },
})

export const {
  setData, setCreated, setRenderView, setResetInvestorSlice, setInvestorName, setStrategyName, setAssetClass, setDevelopment,
  setFutureAssetClass, setTargetDescription, addToGeography, removeFromGeography, setMinSize, setMaxSize, setCurrency,
  setMinWalb, setMaxWalb, setMinYield, setContactId, setTargetGeography
} = investorSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => state.investor.data
export const selectCreated = (state: RootState) => state.investor.created
export const selectRenderView = (state: RootState) => state.investor.renderView

export const selectInvestorName = (state: RootState) => state.investor.investorName
export const selectStrategyName = (state: RootState) => state.investor.strategyName
export const selectAssetClass = (state: RootState) => state.investor.assetClass
export const selectDevelopment = (state: RootState) => state.investor.development
export const selectFutureAssetClass = (state: RootState) => state.investor.futureAssetClass
export const selectTargetDescription = (state: RootState) => state.investor.targetDescription
export const selectTargetGeography = (state: RootState) => state.investor.targetGeography
export const selectMinSize = (state: RootState) => state.investor.minSize
export const selectMaxSize = (state: RootState) => state.investor.maxSize
export const selectCurrency = (state: RootState) => state.investor.currency
export const selectMinWalb = (state: RootState) => state.investor.minWalb
export const selectMaxWalb = (state: RootState) => state.investor.maxWalb
export const selectMinYield = (state: RootState) => state.investor.minYield
export const selectContactId = (state: RootState) => state.investor.contactId

export default investorSlice.reducer
