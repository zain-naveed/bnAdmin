import initialState from '../initialState';
import * as listMenus from '../../action/storeAdminAction/listStoreMenusAction';

export const listStoreMenusReducer = (state=initialState.listStoreMenus,action)=>{
    switch(action.type){
        case listMenus.LIST_STORE_MENUS:
            state = action.payload;
            return state;
        default:
            return state;
    }
}