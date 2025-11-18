import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, EmailAuthCredential} from 'firebase/auth'
import {auth} from '../firebase'

export const signIn=createAsyncThunk("user/signin",async({email,password})=>{
   const userCredential= await signInWithEmailAndPassword(auth,email,password)
   const user={
    name:userCredential.user.displayName,
    email:userCredential.user.email,
   }
   return user;
});
const initialState={
    user:[],
    isLoading:false,
}
const userSlice =createSlice({
    name:"user",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(signIn.pending,(state)=>{
            state.isLoading=true;
        }).addCase(signIn.fulfilled,(state)=>{
            state.isLoading=false;
        }).addCase(signIn.rejected,(state)=>{
            state.isLoading=false,
            state.error="signin failes !!"
        })
    },
});
export default userSlice.reducer;