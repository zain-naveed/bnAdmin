import initialState from './initialState';
import * as EditStore from '../action/editStoreAction';

export const editStoreReducer = (state=initialState.editStore,action)=>{
    switch(action.type){
        case EditStore.EDIT_STORE:
            state = action.payload;
            return state;
        default:
            return state;
    }
}