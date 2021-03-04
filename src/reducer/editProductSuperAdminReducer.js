import initialState from './initialState';
import * as EditSuperAdmin from '../action/editProductSuperAdminAction';

export const editProductSuperAdminReducer = (state=initialState.editProductbySuperAdmin,action)=>{
    switch(action.type){
        case EditSuperAdmin.EDIT_PRODUCT_SUPER_ADMIN:
            state = action.payload;
            return state;
        default:
            return state;
    }
}