import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'task',
    initialState: [],
    reducers:{
        saveTask(_, { payload })  {  
            return [...payload].reverse();
        }
    }
})

export const {
    saveTask
} = slice.actions;

export const selectTasks = (state) => state.task

export default slice.reducer;