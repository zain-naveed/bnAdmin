import initialState from './initialState';
import * as AddProductSuperAdmin from "../action/addProductSuperAdminAction";

export const addProductSuperAdminReducer = (state=initialState.addProductSuperAdmin,action)=>{
    switch(action.type){
        case AddProductSuperAdmin.ADD_PRODUCT_SUPERADMIN:
            state = action.payload;
            return state;
        default:
            return state;
    }
}