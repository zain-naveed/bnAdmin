import initialState from './initialState';
import * as EditCustomStore from '../action/editCustomStoreAction';

export const editCustomStoreReducer = (state=initialState.editCustomStore,action)=>{
    switch(action.type){
        case EditCustomStore.EDIT_CUSTOM_STORE:
            state = action.payload;
            return state;
        default:
            return state;
    }
}