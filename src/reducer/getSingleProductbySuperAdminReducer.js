import initialState from './initialState';
import * as GetProductId from '../action/getSingleProductbySuperAdmin';
export function getSingleProductbySuperAdminReducer(state=initialState.getSingleProductbySuperAdmin,action){
    switch(action.type){
        case GetProductId.GET_PRODUCT_SINGLE_SUPER_ADMIN :
            state = action.payload;
            return state;
        default:
         return   state;
    }
}