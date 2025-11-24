import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {db} from '../firebase';
import {addDoc,doc,setDoc,getDocs,collection} from 'firebase/firestore'

export const readMessages=createAsyncThunk("chat/read",async({sender,receiver})=>{
     const user=[sender,receiver];
    user.sort();
    const docId=user[0]+"_"+user[1];
   try{
     const snapshots=await getDocs(collection(db,"chatroom",docId,"chats"))
    const chatList=snapshots.docs.map((snap)=>snap.data())
    return chatList;
   }catch(e){
    console.log(e)
   }

})


export const sendMessage=createAsyncThunk("chat/send",async({message,sender,receiver})=>{
    const user=[sender,receiver];
    user.sort();
    const docId=user[0]+"_"+user[1];
   const chatId = Date.now().toString();
    try {
      await setDoc(doc(db, "chatroom", docId, "chats", chatId), {
        message: message,
      });
      return { message };
    }catch(e){
        console.log(e);
    }
});

const initialstate={
    chats:[],
    isLoading:false,
    error:null,
}

const chatSlice=createSlice({
    name:"chats",
    initialState:initialstate,
    extraReducers:(builder)=>{
        builder.addCase(sendMessage.pending,(state)=>{
            state.isLoading=true;
        }).addCase(sendMessage.fulfilled,(state)=>{
            state.isLoading=false;
            //  state.chats.push({ message: message });
            alert("send messages")
        }).addCase(sendMessage.rejected,(state)=>{
            state.isLoading=false;
            state.error="cant send messages"
            alert("cant send")
        }).addCase(readMessages.pending,(state)=>{
            state.isLoading=true;
        }).addCase(readMessages.fulfilled,(state,action)=>{
            state.chats=action.payload
            state.isLoading=false;
            console.log("chat fetched successfully")
        }).addCase(readMessages.rejected,(state)=>{
            state.isLoading=false;
            state.error="chat cant fetched !!"
            console.log(state.error)
        })
    }
})

export default chatSlice.reducer;