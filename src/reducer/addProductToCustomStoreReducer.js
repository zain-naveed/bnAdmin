import initialState from './initialState';
import * as ProductCustomStore from '../action/addProductToCustomStoreAction';

export const addProductToCustomStoreReducer = (state=initialState.addProdcutToCustomStore,action)=>{
    switch(action.type){
        case ProductCustomStore.ADD_PRODUCT_TO_CUSTOM_STORE:
            state = action.payload;
            return state;
        default:
            return state
    }
}