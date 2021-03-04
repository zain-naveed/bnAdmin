import initialState from './initialState';
import * as OrderSuperAdmin from '../action/orderSuperAdminAction';

export const orderDetailSuperAdminReducer = (state=initialState.OrderDetailSuperAdmin,action)=>{
    switch(action.type){
        case OrderSuperAdmin.ORDER_DETAIL_SUPER_ADMIN:
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export const orderUpdateSuperAdminReducer = (state=initialState.updateOrder,action)=>{
    switch(action.type){
        case OrderSuperAdmin.UPDATE_ORDER_SUPER_ADMIN:
            state = action.payload;
            return state;
        default:
            return state;
    }
}