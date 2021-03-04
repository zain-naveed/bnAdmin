import initialState from './initialState';
import * as listSuperProduct from '../action/listSuperProductSuperAdminAction';

export const listSuperProductReducer = (state=initialState.listSuperProductSuperAdmin,action)=>{
    switch(action.type){
        case listSuperProduct.List_SUPER_PRODUCT_SUPER_ADMIN:
            state = action.payload;
            return state;
        default:
            return state;
    }
}