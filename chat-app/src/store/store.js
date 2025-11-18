import {userReducer} from './slices'
import {configureStore} from '@reduxjs/toolkit';
import {store} from './../store'

export const store=configureStore({
    reducer:{
        user:userReducer,
    }
})