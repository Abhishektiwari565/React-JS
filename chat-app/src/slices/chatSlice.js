import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {db} from '../firebase';
import {addDoc,doc,setDoc,getDocs,collection} from 'firebase/firestore'


export const sendMessage=createAsyncThunk("chat/send",async(chat,sender,receiver)=>{
    const docId=sender+"_"+receiver;
    await setDoc(doc(db,"chatroom",docId),{
        message:"hello"
    })
    
})

const initialstate={
    chat:[],
    isLoading:false,
    error:null,
}
const chatSlice=createSlice({
    name:"chats",
    initialState:initialstate,
    extraReducers:(builder)=>{
        builder.addCase(sendMessage.pending,(state)=>{
            isLoading=true;
        }).addCase(sendMessage.fulfilled,(state,action)=>{
            isLoading=false;
            alert("send messages")

        }).addCase(sendMessage.rejected,(state)=>{
            isLoading=false;
            state.error="cant send messages"
            alert("cant send")
        })
    }
})

export default chatSlice.reducer;