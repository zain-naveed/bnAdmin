import initialState from './initialState';
import * as CustomStore from '../action/customStoreAction';


export function customStoreReducer(state=initialState.addCustomStore,action){
    switch(action.type){
        case CustomStore.ADD_CUSTOM_STORE:
            state  = action.payload;
            return state;
        default:
            return state;
    }
}