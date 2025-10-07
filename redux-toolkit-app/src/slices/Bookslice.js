import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState={
    book:[
    { title: "Jungle Adventure" },
    { title: "Mountain Mystery" },
    { title: "Ocean Secrets" },

    ],
    visitors:450,
    total:120,
    fav:[],
    isLoading:true,
    error:null,
    products:[]

}

export const fetchProducts=createAsyncThunk("products/get",async()=>{
    const res=await fetch("https://fakestoreapi.com/products")
    const data=await res.json();
    return data;
})

const Book=createSlice({
    name:"Adventure",
    initialState: initialState,
    reducers:{
        addBook:(state,action)=>{
             state.book.push(action.payload);
        },
         removeBook:(state,action)=>{
             state.book.splice(action.payload,1);
        },
         updateBook:(state,action)=>{
            const [index,value]=action.payload;
            state.book[index]=value;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload
            state.isLoading=false;
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.error="cant detect api..."
        })
    }
})

export const {addBook,removeBook,updateBook}=Book.actions;
export default Book.reducer;