import initialState from '../initialState';
import * as GetProductId from '../../action/storeAdminAction/getProductbyidStoreAdmin';
export function getProductStoreAdminbyIdReducer(state=initialState.getProductidbyStoreAdmin,action){
    switch(action.type){
        case GetProductId.GET_PRODUCT_SINGLE :
            state = action.payload;
            return state;
        default:
         return   state;
    }
}