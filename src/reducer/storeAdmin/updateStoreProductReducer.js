import initialState from '../initialState';
import * as updateProduct from '../../action/storeAdminAction/updateStoreAdminAction';

export const updateProductReducer = (state=initialState.updateProductStoreAdmin,action)=>{
    switch(action.type){
        case updateProduct.UPDATE_STORE_ADMIN_PRODUCT:
            state = action.payload;
            return state;
        default:
            return state;
    }
}