import * as Offers from '../../action/storeAdminAction/OfferAction';
import initialState from '../initialState';
export const listOfferReducer = (state=initialState.listOffer,action)=>{
    switch(action.type){
        case Offers.LIST_OFFER_ACTION:
            state = action.payload;
            return state;
        default:
            return state;
    }
}
export const getOfferidReducer = (state=initialState.getOfferid,action)=>{
    switch(action.type){
        case Offers.GET_OFFER_BY_ID:
            state = action.payload;
            return state;
        default:
            return state;
    }   
}
export const updateOfferReducer = (state=initialState.updateOffer,action)=>{
    switch(action.type){
        case Offers.UPDATE_OFFER:
            state = action.payload;
            return state;
        default:
            return state;
    }   
}