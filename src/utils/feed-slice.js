import { createSlice } from "@reduxjs/toolkit";

const feedReducer = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state , action)=> action.payload,
        removeFeed: (state, action) => null ,
        removeUserFromFeed:(state , action)=> {
            const newFeed = state.filter((user)=> user._id !== action.payload);
            return newFeed;
        }
    }
})
export const {addFeed , removeFeed , removeUserFromFeed} = feedReducer.actions
export default feedReducer.reducer;