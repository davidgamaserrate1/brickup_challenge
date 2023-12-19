
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    typeModal:undefined,
    titleModal:undefined,
    taskId:undefined,
    name: undefined,
    description :    undefined,
    status: undefined,
    photo : undefined,

}
const slice = createSlice({
    name: 'taskModal',
    initialState: initialState,
    reducers:{
        openTaskModal(state){
            return {
                ...state,
                isOpen:true
            }
        },
        saveTaskModal(_,{payload}){
            return payload
        },
        removeTaskModal(state){
            return {
                ...state,
                isOpen: false, 
                typeModal: undefined,
                titleModal:undefined,
                taskId: undefined,
                name: undefined,
                description: undefined,
                status: undefined,
                photo: undefined,
            };
        },
    }

})    

export const selectTaskModal = (state) =>state.taskModal;


export const { saveTaskModal, removeTaskModal , openTaskModal} = slice.actions;


export default slice.reducer;