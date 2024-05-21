import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
    data: [{ [key: string]: any}] | null;
    users: [{ [key: string]: any}] | null;
    member_id: any | null;
    userinfo: {[key: string]: any} | null;
    isPrivate: any | null;
}

const initialState: ChatState = {
    data: null,
    users: null,
    member_id: null,
    userinfo: null,
    isPrivate: false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<[{[key: string]: any}]>) => {
            state.data = action.payload;
        },
        setUsers: (state, action: PayloadAction<[{[key: string]: any}]>) => {
            state.users = action.payload;
        },
        clearChat: (state) => {
            state.data = null;
        },
        setMember: (state, action: PayloadAction<{[key: string]: any}>) => {
            state.member_id = action.payload;
        },
        setPrivate: (state, action: PayloadAction<any>) => {
            state.isPrivate = action.payload;
        },
        setUser: (state, action: PayloadAction<{[key: string]: any}>) => {
            state.userinfo = action.payload;
        }
    }
})

export const {setChat, clearChat, setMember, setUsers, setUser, setPrivate} = chatSlice.actions;

export default chatSlice.reducer;
