import {createSlice} from '@reduxjs/toolkit'

const initialState={
    book:[
    { title: "Jungle Adventure" },
    { title: "Mountain Mystery" },
    { title: "Ocean Secrets" },

    ],
    visitors:450,
    total:120,
    fav:[]

}
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
    }
})

export const {addBook,removeBook,updateBook}=Book.actions;
export default Book.reducer;