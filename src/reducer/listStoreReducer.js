import * as ListStore from '../action/listStore';
import initialState from './initialState';
export const listStoreReducer = (state=initialState.listStore,action)=>{
    switch(action.type){
        case ListStore.LIST_STORE:
             state = action.payload;
             return state;
        default:
            return state;
    }
}