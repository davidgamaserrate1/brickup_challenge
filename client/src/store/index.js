import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './slice/task'

export default configureStore({
    reducer:{
       task: taskReducer
    }
})