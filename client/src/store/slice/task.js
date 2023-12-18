import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'task',
    initialState: [],
    reducers:{
        saveTask(_, { payload })  {  
            return [...payload];
        },
        updateTaskDetails(state, action) {
            const { taskId, newName, newDescription, newPhoto } = action.payload;                       
            return state.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        name: newName !== task.name ? newName : task.name,
                        description: newDescription !== task.description ? newDescription : task.description,
                        photo : newPhoto !== task.photo ?  newPhoto : task.photo                  
                    };
                }
                return task;
            });
        } 
    }
})

export const { saveTask, updateTaskDetails } = slice.actions;
export const selectTasks = (state) => state.task
export const selectCountPendingTasks = (state) => state.task.filter((task)=> task.status ==='pendente').length
export const selectCountCompletedTasks = (state) => state.task.filter((task)=> task.status ==='concluido').length

export default slice.reducer;