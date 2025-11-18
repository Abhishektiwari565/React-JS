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

export const signUp = createAsyncThunk("user/signup",async({email,password})=>{
    const userCredential= await createUserWithEmailAndPassword(auth,email,password)
    const user={
        name:userCredential.user.displayName,
        email:userCredential.user.email,
    }
    return user;
})
const initialState={
    users:[],
    isLoading:false,
}
const userSlice =createSlice({
    name:"user",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(signIn.pending,(state)=>{
            state.isLoading=true;
        }).addCase(signIn.fulfilled,(state,action)=>{
            state.users.push(action.payload)
            state.isLoading=false;
            alert("user signin successfully !!")
        }).addCase(signIn.rejected,(state)=>{
            state.isLoading=false
            state.error="signin failes !!"
        }).addCase(signUp.pending,(state)=>{
            state.isLoading=true;
        }).addCase(signUp.fulfilled,(state,action)=>{
            state.users.push(action.payload)
            state.isLoading=false;
            alert("sign up successfully !")
        }).addCase(signUp.rejected,(state)=>{
            state.isLoading=false;
            state.error="sign up failed !!"
        })
    },
});
export default userSlice.reducer;