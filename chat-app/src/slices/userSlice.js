import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'

export const signIn = createAsyncThunk("user/signin", async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
    }
    await addDoc(collection(db, "users"), user)
    return user;
});

export const signUp = createAsyncThunk("user/signup", async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
    }
     
    return user;
});

export const fetchUser = createAsyncThunk("user/fetch", async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    const users = querySnapshot.docs.map((doc) =>
        doc.data());
    return users;
});


const initialState = {
    users: [],
    isLoading: false,
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true;
        }).addCase(signIn.fulfilled, (state, action) => {
            state.users.push(action.payload)
            state.isLoading = false;
            alert("user signin successfully !!")
        }).addCase(signIn.rejected, (state) => {
            state.isLoading = false;
            state.error = "signin failes !!"
        }).addCase(signUp.pending, (state) => {
            state.isLoading = true;
        }).addCase(signUp.fulfilled, (state, action) => {
            state.users.push(action.payload)
            state.isLoading = false;
            alert("sign up successfully !")
        }).addCase(signUp.rejected, (state) => {
            state.isLoading = false;
            state.error = "sign up failed !!"
        }).addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload
        }).addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
            state.error = "Failed to fetch users!";
        })
    },
});
export default userSlice.reducer;