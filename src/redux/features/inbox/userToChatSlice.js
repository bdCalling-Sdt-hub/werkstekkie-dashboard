/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    chatUser: {},
    isOpen: false,
  };
const userToChatSlice = createSlice({
    name: "userToChat",
    initialState,
    reducers:{
        setUserToChat:(state,action)=>{
            state.chatUser = action.payload?.chat;
            state.isActive = action.payload?.isActive;
        },
        removeUserToChat:(state,action)=>{
            state.chatUser = {};
            state.isActive = false;
        },
        setIsOpen: (state,action)=>{
            state.isOpen = !state.isOpen;
        }
    }
})

export const {setUserToChat, removeUserToChat,setIsOpen} = userToChatSlice.actions;
export default userToChatSlice.reducer;