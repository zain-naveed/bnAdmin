import initialState from '../initialState';
import * as OrderStoreAdminId from '../../action/storeAdminAction/orderDetailByStoreId';
export const orderDetailStoreAdminIdReducer = (state=initialState.OrderDetailStoreAdminId,action)=>{
    switch(action.type){
        case OrderStoreAdminId.ORDER_DETAIL_STORE_ADMIN_ID:
            state = action.payload;
            return state;
        default:
            return state;
    }
}