import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface BlogState {
  blogPosts: Array<any>
  headline: string
  topic: string
  text: string
  date: string
}

const initialState: BlogState = {
  blogPosts: [],
  headline: "",
  topic: "",
  text: "",
  date: "",
}

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setBlogPosts: (state, action) => {
      state.blogPosts = action.payload;
      },
    setHeadline: (state, action) => {
      state.headline = action.payload;
      },
    setTopic: (state, action) => {
      state.topic = action.payload;
      },
    setText: (state, action) => {
      state.text = action.payload;
      },
    setDate: (state, action) => {
      state.date = action.payload;
      },
  },
})

export const { setBlogPosts, setHeadline, setTopic, setText, setDate } = blogSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBlogPosts = (state: RootState) => state.blog.blogPosts
export const selectHeadline = (state: RootState) => state.blog.headline
export const selectTopic = (state: RootState) => state.blog.topic
export const selectText = (state: RootState) => state.blog.text
export const selectDate = (state: RootState) => state.blog.date

export default blogSlice.reducer
