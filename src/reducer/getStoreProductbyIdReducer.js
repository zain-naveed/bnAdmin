import initialState from './initialState';
import * as getStoreProduct from '../action/getStoreProductbyIdAction';

export const getStoreProductbyIdReducer = (state=initialState.getStoreProductbyId,action)=>{
    switch(action.type){
        case getStoreProduct.GET_STORE_PRODUCT_ID:
            state = action.payload;
            return state;
        default:
            return state;
    }
}