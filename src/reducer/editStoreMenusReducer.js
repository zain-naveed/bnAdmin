import initialState from './initialState';
import * as EditStoreMenus from '../action/editStoreMenusAction';

export const editStoreMenusReducer = (state=initialState.editStoreMenus,action)=>{
        switch(action.type){
            case EditStoreMenus.EDIT_STORE_MENUS:
                state = action.payload;
                return state;
            default:
                return state;
        }
}