import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"

export interface PropertyState {
// Data rendering
  data: Array<any>;
  created: string;

// New deal onboarding
  name: string;
  street: string;
  city: string;
  postcode: string;

  currency: string;
  price: number;

  tenure: string;
  dealType: string;
  development: string;
  assetClass: string;
  groundRent: number;
  unexpiredLeasehold: number;
  futureAssetClass: string;

  units: string;
  areaGross: number;
  areaNet: number;
  siteArea: number;
  futureAreaGross: number;
  futureAreaNet: number;

  passingRent: number;
  opex: number;
  passingNoi: number;
  occupancy: number;
  leaseBreak: string;
  leaseExpiry: string;

  gdv: number;
  capex: number;
  futureRent: number;
  futureOpex: number;
  futureNoi: number;

  feeStructure: string;
  brokerFee: number;

  image: string;

  renderView: number;
}

const initialState: PropertyState = {
  data: [],
  created: "",

  // New deal onboarding
  name: "",
  street: "",
  city: "",
  postcode: "",

  currency: "GBP",
  price: 0,

  tenure: "freehold",
  dealType: "assetDeal",
  development: "completed",
  assetClass: "",
  groundRent: 0,
  unexpiredLeasehold: 0,
  futureAssetClass: "",

  units: "sqft",
  areaGross: 0,
  areaNet: 0,
  siteArea: 0,
  futureAreaGross: 0,
  futureAreaNet: 0,

  passingRent: 0,
  opex: 0,
  passingNoi: 0,
  occupancy: 0,
  leaseBreak: "",
  leaseExpiry: "",

  gdv: 0,
  capex: 0,
  futureRent: 0,
  futureOpex: 0,
  futureNoi: 0,

  feeStructure: "",
  brokerFee: 0,

  image: "",

  renderView: 1,
}

export const propertySlice = createSlice({
  name: "property",
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
    setResetPropertySlice: () => initialState,

    // New deal onboarding
    setName: (state, action) => {
      state.name = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setPostcode: (state, action) => {
      state.postcode = action.payload;
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },

    setTenure: (state, action) => {
      state.tenure = action.payload;
    },
    setDealType: (state, action) => {
      state.dealType = action.payload;
    },
    setDevelopment: (state, action) => {
      state.development = action.payload;
    },
    setAssetClass: (state, action) => {
      state.assetClass = action.payload;
    },
    setGroundRent: (state, action) => {
      state.groundRent = action.payload;
    },
    setUnexpiredLeasehold: (state, action) => {
      state.unexpiredLeasehold = action.payload;
    },
    setFutureAssetClass: (state, action) => {
      state.futureAssetClass = action.payload;
    },

    setUnits: (state, action) => {
      state.units = action.payload;
    },
    setAreaGross: (state, action) => {
      state.areaGross = action.payload;
    },
    setAreaNet: (state, action) => {
      state.areaNet = action.payload;
    },
    setSiteArea: (state, action) => {
      state.siteArea = action.payload;
    },
    setFutureAreaGross: (state, action) => {
      state.futureAreaGross = action.payload;
    },
    setFutureAreaNet: (state, action) => {
      state.futureAreaNet = action.payload;
    },

    setPassingRent: (state, action) => {
      state.passingRent = action.payload;
    },
    setOpex: (state, action) => {
      state.opex = action.payload;
    },
    setPassingNoi: (state, action) => {
      state.passingNoi = action.payload;
    },
    setOccupancy: (state, action) => {
      state.occupancy = action.payload;
    },
    setLeaseBreak: (state, action) => {
      state.leaseBreak = action.payload;
    },
    setLeaseExpiry: (state, action) => {
      state.leaseExpiry = action.payload;
    },

    setGdv: (state, action) => {
      state.gdv = action.payload;
    },
    setCapex: (state, action) => {
      state.capex = action.payload;
    },
    setFutureRent: (state, action) => {
      state.futureRent = action.payload;
    },
    setFutureOpex: (state, action) => {
      state.futureOpex = action.payload;
    },
    setFutureNoi: (state, action) => {
      state.futureNoi = action.payload;
    },

    setFeeStructure: (state, action) => {
      state.feeStructure = action.payload;
    },
    setBrokerFee: (state, action) => {
      state.brokerFee = action.payload;
    },

    setImage: (state, action) => {
      state.image = action.payload;
    },

    setRenderView: (state, action) => {
      state.renderView += action.payload;
    },

  },
})

export const {
  setData, setName, setStreet, setCity, setPostcode, setCurrency, setPrice, setTenure, setDealType, setDevelopment, setAssetClass, 
  setGroundRent, setUnexpiredLeasehold, setFutureAssetClass, setUnits, setAreaGross, setAreaNet, setSiteArea, setFutureAreaGross,
  setFutureAreaNet, setPassingRent, setOpex, setPassingNoi, setOccupancy, setLeaseExpiry, setLeaseBreak, setGdv, setCapex, 
  setFutureRent, setFutureOpex, setFutureNoi, setFeeStructure, setBrokerFee, setRenderView, setResetPropertySlice, setCreated,
  setImage
} = propertySlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => state.property.data
export const selectCreated = (state: RootState) => state.property.created

export const selectName = (state: RootState) => state.property.name
export const selectStreet = (state: RootState) => state.property.street
export const selectCity = (state: RootState) => state.property.city
export const selectPostcode = (state: RootState) => state.property.postcode

export const selectCurrency = (state: RootState) => state.property.currency
export const selectPrice = (state: RootState) => state.property.price

export const selectTenure = (state: RootState) => state.property.tenure
export const selectDealType = (state: RootState) => state.property.dealType
export const selectDevelopment = (state: RootState) => state.property.development
export const selectAssetClass = (state: RootState) => state.property.assetClass
export const selectGroundRent = (state: RootState) => state.property.groundRent
export const selectUnexpiredLeasehold = (state: RootState) => state.property.unexpiredLeasehold
export const selectFutureAssetClass = (state: RootState) => state.property.futureAssetClass

export const selectUnits = (state: RootState) => state.property.units
export const selectAreaGross = (state: RootState) => state.property.areaGross
export const selectAreaNet = (state: RootState) => state.property.areaNet
export const selectSiteArea = (state: RootState) => state.property.siteArea
export const selectFutureAreaGross = (state: RootState) => state.property.futureAreaGross
export const selectFutureAreaNet = (state: RootState) => state.property.futureAreaNet

export const selectPassingRent = (state: RootState) => state.property.passingRent
export const selectOpex = (state: RootState) => state.property.opex
export const selectPassingNoi = (state: RootState) => state.property.passingNoi
export const selectOccupancy = (state: RootState) => state.property.occupancy
export const selectLeaseBreak = (state: RootState) => state.property.leaseBreak
export const selectLeaseExpiry = (state: RootState) => state.property.leaseExpiry

export const selectGdv = (state: RootState) => state.property.gdv
export const selectCapex = (state: RootState) => state.property.capex
export const selectFutureRent = (state: RootState) => state.property.futureRent
export const selectFutureOpex = (state: RootState) => state.property.futureOpex
export const selectFutureNoi = (state: RootState) => state.property.futureNoi

export const selectFeeStructure = (state: RootState) => state.property.feeStructure
export const selectBrokerFee = (state: RootState) => state.property.brokerFee

export const selectImage = (state: RootState) => state.property.image

export const selectRenderView = (state: RootState) => state.property.renderView

export default propertySlice.reducer
