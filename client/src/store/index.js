import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './slice/task'
import taskModalReducer from './slice/modal'

export default configureStore({
    reducer:{ 
        task: taskReducer ,
        taskModal: taskModalReducer
    }
})