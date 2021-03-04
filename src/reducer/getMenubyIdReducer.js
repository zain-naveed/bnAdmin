import initialState from './initialState';
import * as getStoreMenuId from '../action/getMenuStorebyIdAction';

export const getStoreMenubyIdReducer  = (state=initialState.getMenuStoreById,action)=>{
    switch(action.type){
        case getStoreMenuId.GET_MENU_STORE_BY_ID:
            state = action.payload;
            return state;
        default:
            return state
    }
}