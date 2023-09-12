import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface ContactState {
// Data rendering
  data: Array<any>;
  created: string;
  renderView: number;

// New contact onboarding
  name: string;
  surname: string;
  company: string;
  email: string;
  phone: number;
  contactDate: string;
  job: string;
  role: string;
  city: string;
}

const initialState: ContactState = {
// Data rendering
  data: [],
  created: "",
  renderView: 1,

// New contact onboarding
  name: "",
  surname: "",
  company: "",
  email: "",
  phone: 0,
  contactDate: "",
  job: "",
  role: "",
  city: "",
}

export const contactSlice = createSlice({
  name: "contact",
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
  setContactRenderView: (state, action) => {
    state.renderView += action.payload;
  },
  setResetContactSlice: () => initialState,

  // New contact onboarding
  setContactName: (state, action) => {
    state.name = action.payload;
  },
  setContactSurname: (state, action) => {
    state.surname = action.payload;
  },
  setCompany: (state, action) => {
    state.company = action.payload;
  },
  setEmail: (state, action) => {
    state.email = action.payload;
  },
  setPhone: (state, action) => {
    state.phone = action.payload;
  },
  setContactDate: (state, action) => {
    state.contactDate = action.payload;
  },
  setJob: (state, action) => {
    state.job = action.payload;
  },
  setRole: (state, action) => {
    state.role = action.payload;
  },
  setCity: (state, action) => {
    state.city = action.payload;
  },
  },
})

export const {
  setData, setCreated, setContactRenderView, setResetContactSlice, setContactName, setContactSurname, setCompany, setEmail, setPhone, 
  setContactDate, setJob, setRole, setCity
} = contactSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: RootState) => state.contact.data
export const selectCreated = (state: RootState) => state.contact.created
export const selectContactRenderView = (state: RootState) => state.contact.renderView

export const selectContactName = (state: RootState) => state.contact.name
export const selectContactSurname = (state: RootState) => state.contact.surname
export const selectCompany = (state: RootState) => state.contact.company
export const selectEmail = (state: RootState) => state.contact.email
export const selectPhone = (state: RootState) => state.contact.phone
export const selectContactDate = (state: RootState) => state.contact.contactDate
export const selectJob = (state: RootState) => state.contact.job
export const selectRole = (state: RootState) => state.contact.role
export const selectCity = (state: RootState) => state.contact.city

export default contactSlice.reducer
