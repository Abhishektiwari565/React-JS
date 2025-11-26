import {createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios, {Axios  } from "axios";

const initialState={
    products:[],
    isLoading:true,
    error:null
}

export const fetchProducts=createAsyncThunk("products/get",async()=>{
    const res=await fetch("http://localhost:5000/products")
    const data=await res.json();
    return data;
})

export const insertProducts=createAsyncThunk("products/post",async({title,price})=>{
    const res=await axios.post("http://localhost:5000/products",{
        title:title,
        price:price
    });
    console.log(res.data);
    return res.data;
})

const productSlice=createSlice({
    name:"products",
    initialState:initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.products.push(action.payload);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products=action.payload;
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.isLoading=false;
            state.error="cant fetch api..."
        }).addCase(insertProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(insertProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products.push(action.payload)
        }).addCase(insertProducts.rejected,(state)=>{
            state.isLoading=false;
            state.error="cant insert products....!"
        })
    }

})

export default productSlice.reducer;
export const {addProduct}=productSlice.actions;