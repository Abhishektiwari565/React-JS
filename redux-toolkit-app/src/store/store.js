import {configureStore} from '@reduxjs/toolkit'
import BookReducer from '../slices/Bookslice'

const store=configureStore({
  reducer:{
      Book:BookReducer,
  }
});

export default store;

