import initialState from '../initialState';
import * as listProductAdmin from '../../action/storeAdminAction/listStoreAdminAction';
export const listProductAdminReducer = (state=initialState.listStoreAdmin,action)=>{
    switch(action.type){
        case listProductAdmin.STORE_ADMIN_LIST:
            state = action.payload;
            return state;
        default:
            return state;
    }
}